"""
Motores de generación de PDF.

La especificación admite dos:
  - WeasyPrint: Python puro, ideal para un servidor persistente en Linux.
    Necesita las librerías de Pango/GTK del sistema.
  - Playwright/Chromium: más pesado, pero renderiza el HTML con el mismo
    motor del navegador (fue como se generaron los PDFs originales) y no
    depende de librerías del sistema, así que funciona también en Windows.

Se elige con `PDF_ENGINE` (`auto` por defecto): se usa WeasyPrint si está
disponible y, si no, Playwright.
"""

import os


class PDFEngineUnavailable(RuntimeError):
    """Ningún motor de PDF utilizable en este entorno."""


def _weasyprint_available():
    try:
        import weasyprint  # noqa: F401
    except (ImportError, OSError):
        return False
    return True


def _playwright_available():
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        return False
    # La librería puede estar instalada sin el navegador descargado.
    try:
        with sync_playwright() as p:
            return bool(p.chromium.executable_path)
    except Exception:
        return False


ZERO_MARGIN = {'top': '0', 'right': '0', 'bottom': '0', 'left': '0'}


def render_with_weasyprint(html, base_url=None, options=None):
    """WeasyPrint aplica los márgenes y el pie desde el CSS `@page` de la plantilla."""
    from weasyprint import HTML

    return HTML(string=html, base_url=base_url).write_pdf()


def render_with_playwright(html, base_url=None, options=None):
    """
    Chromium no entiende las cajas `@bottom-left`/`@bottom-right` de CSS paged
    media, así que el pie de página se le pasa como `footer_template` y los
    márgenes como opción, para que el resultado coincida con WeasyPrint.
    """
    from playwright.sync_api import sync_playwright

    options = options or {}
    kwargs = {
        'format': 'A4',
        'print_background': True,
        'margin': options.get('margin') or ZERO_MARGIN,
    }
    footer_html = options.get('footer_html')
    if footer_html:
        kwargs['display_header_footer'] = True
        kwargs['header_template'] = '<span></span>'
        kwargs['footer_template'] = footer_html

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch()
        try:
            page = browser.new_page()
            page.set_content(html, wait_until='networkidle')
            return page.pdf(**kwargs)
        finally:
            browser.close()


ENGINES = {
    'weasyprint': (_weasyprint_available, render_with_weasyprint),
    'playwright': (_playwright_available, render_with_playwright),
}


def resolve_engine():
    """Devuelve (nombre, función) del motor utilizable, o lanza si no hay ninguno."""
    configured = (os.environ.get('PDF_ENGINE') or 'auto').strip().lower()

    if configured in ENGINES:
        is_available, render = ENGINES[configured]
        if not is_available():
            raise PDFEngineUnavailable(
                f'El motor de PDF configurado ({configured}) no está disponible en este servidor.'
            )
        return configured, render

    for name in ('weasyprint', 'playwright'):
        is_available, render = ENGINES[name]
        if is_available():
            return name, render

    raise PDFEngineUnavailable(
        'No hay motor de PDF disponible. Instala WeasyPrint con sus librerías del '
        'sistema (en Linux: apt-get install libpango-1.0-0 libpangoft2-1.0-0 '
        'libharfbuzz0b) o Playwright (pip install playwright && playwright install chromium).'
    )


def available_engine():
    """Nombre del motor disponible, o None. Para informar al frontend."""
    try:
        name, _ = resolve_engine()
    except PDFEngineUnavailable:
        return None
    return name
