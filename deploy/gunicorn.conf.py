"""
Configuración de gunicorn para el EC2.

    gunicorn -c deploy/gunicorn.conf.py kibocode.wsgi:application
"""

import multiprocessing
import os

# Solo escucha en loopback: nginx es quien recibe el tráfico público.
bind = os.environ.get('GUNICORN_BIND', '127.0.0.1:8000')

# Regla habitual: 2×CPU+1, acotado para no agotar la RAM de una t3.small.
# Si se genera PDF con Playwright, cada worker puede levantar un Chromium,
# así que conviene mantener el número bajo.
workers = int(os.environ.get('GUNICORN_WORKERS', min(multiprocessing.cpu_count() * 2 + 1, 4)))

worker_class = 'sync'

# La generación de PDF puede tardar unos segundos: margen suficiente.
timeout = int(os.environ.get('GUNICORN_TIMEOUT', 120))
graceful_timeout = 30
keepalive = 5

# Recicla workers para acotar fugas de memoria (Chromium deja residuos).
max_requests = 500
max_requests_jitter = 50

# A stdout/stderr → systemd los recoge en journalctl.
accesslog = '-'
errorlog = '-'
loglevel = os.environ.get('GUNICORN_LOG_LEVEL', 'info')

# Confía en las cabeceras del proxy local.
forwarded_allow_ips = '127.0.0.1'

proc_name = 'kibocode'
