"""
Composición y renderizado de documentos.

Separación intencional:
  - El CUERPO del documento (con placeholders) vive en la base de datos.
  - El DISEÑO (membrete, tipografía, pie) vive en las plantillas de estilo
    en disco. El vendedor solo llena campos; nunca toca maquetación.
"""

from django.conf import settings
from django.template import Context, Engine
from django.template.loader import render_to_string
from django.utils.safestring import mark_safe

from .renderers import PDFEngineUnavailable, available_engine, resolve_engine

__all__ = [
    'PDFEngineUnavailable',
    'build_context',
    'render_html',
    'render_pdf',
    'pdf_engine_available',
    'pdf_engine_name',
]


def brand_context():
    """Datos fijos de KiboCode más el logo embebido, listos para la plantilla."""
    from apps.core.branding import logo_data_uri

    return {**settings.KIBOCODE_LEGAL, 'logo': logo_data_uri()}


def build_context(template, field_values):
    """Contexto de render: valores del documento + datos fijos de KiboCode."""
    context = dict(template.default_values())
    context.update(field_values or {})
    context['kibo'] = brand_context()
    return context


def render_html(template, field_values):
    """Devuelve el HTML completo del documento, ya con el diseño aplicado."""
    body_engine = Engine.get_default()
    body = body_engine.from_string(template.html_template)
    context = build_context(template, field_values)
    body_html = body.render(Context(context))

    return render_to_string(
        f'documents/base_{template.style}.html',
        {
            'content': mark_safe(body_html),
            'document_title': template.header_title or template.name,
            'kibo': brand_context(),
        },
    )


def pdf_options(style):
    """
    Márgenes y pie de página por estilo, para los motores que no leen
    las cajas `@page` del CSS (Chromium). WeasyPrint los ignora porque
    ya los toma de la plantilla.
    """
    if style != 'legal':
        # El estilo comercial lleva fondo oscuro a sangre y su pie va en el
        # cuerpo del documento: sin márgenes de página.
        return {}

    kibo = settings.KIBOCODE_LEGAL
    footer = (
        '<div style="width:100%;font-family:Helvetica,Arial,sans-serif;font-size:7.5pt;'
        'color:#8a8a8a;padding:0 16mm;display:flex;justify-content:space-between;">'
        '<span>KiboCode — Software a medida</span>'
        f'<span>wa.me/{kibo["whatsapp_plain"]} · {kibo["email"]}</span>'
        '</div>'
    )
    return {
        'margin': {'top': '18mm', 'right': '16mm', 'bottom': '20mm', 'left': '16mm'},
        'footer_html': footer,
    }


def render_pdf(template, field_values, base_url=None):
    """Genera el PDF con el motor disponible (ver `renderers.py`)."""
    _, render = resolve_engine()
    html = render_html(template, field_values)
    return render(html, base_url, pdf_options(template.style))


def pdf_engine_name():
    return available_engine()


def pdf_engine_available():
    return available_engine() is not None
