"""
Recursos de marca para los documentos generados.

El logo se embebe como data URI en vez de referenciarse por ruta: así el HTML
es autocontenido y se renderiza igual con WeasyPrint que con Chromium, sin
depender del `base_url` ni de que el motor tenga acceso al sistema de archivos.
"""

import base64
from functools import lru_cache
from pathlib import Path

from django.conf import settings

LOGO_PATH = Path(settings.BASE_DIR) / 'assets' / 'logo.png'


@lru_cache(maxsize=1)
def logo_data_uri():
    """Logo en base64. Devuelve cadena vacía si el archivo no está."""
    path = Path(settings.KIBOCODE_LEGAL.get('logo_path') or LOGO_PATH)
    if not path.is_file():
        return ''
    encoded = base64.b64encode(path.read_bytes()).decode('ascii')
    return f'data:image/png;base64,{encoded}'
