"""
Configuración de Django para la plataforma interna de KiboCode.

Todo lo sensible o dependiente del entorno se lee de variables de entorno
para poder apuntar a localhost en desarrollo y al dominio real en producción
sin tocar código.
"""

import os
from datetime import timedelta
from pathlib import Path

import dj_database_url
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent

load_dotenv(BASE_DIR / '.env')


def env_bool(name, default=False):
    return os.environ.get(name, str(default)).strip().lower() in {'1', 'true', 'yes', 'on'}


def env_list(name, default=''):
    raw = os.environ.get(name, default)
    return [item.strip() for item in raw.split(',') if item.strip()]


# --- Seguridad -------------------------------------------------------------

# En producción SECRET_KEY debe venir del entorno. El valor por defecto
# solo sirve para desarrollo local y nunca debe usarse en el EC2.
def env_str(name, default=''):
    """Una variable presente pero vacía cuenta como no definida."""
    return (os.environ.get(name) or '').strip() or default


SECRET_KEY = env_str('SECRET_KEY', 'dev-only-inseguro-cambiar-en-produccion')

DEBUG = env_bool('DEBUG', True)

ALLOWED_HOSTS = env_list('ALLOWED_HOSTS', 'localhost,127.0.0.1')

# Detrás de nginx, quien termina el TLS: sin esto Django cree que toda
# petición es HTTP y genera redirecciones y URLs absolutas equivocadas.
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
USE_X_FORWARDED_HOST = True

# Necesario en Django 4+ para el admin servido por HTTPS.
# Ej.: CSRF_TRUSTED_ORIGINS=https://kibocode.lat,https://www.kibocode.lat
CSRF_TRUSTED_ORIGINS = env_list('CSRF_TRUSTED_ORIGINS')

if not DEBUG:
    if SECRET_KEY.startswith('dev-only'):
        raise RuntimeError(
            'SECRET_KEY de desarrollo detectada con DEBUG=False. '
            'Define SECRET_KEY en el entorno antes de desplegar.'
        )
    SECURE_CONTENT_TYPE_NOSNIFF = True
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SESSION_COOKIE_HTTPONLY = True
    X_FRAME_OPTIONS = 'DENY'
    # nginx ya redirige a HTTPS; se deja activable por si se sirve directo.
    SECURE_SSL_REDIRECT = env_bool('SECURE_SSL_REDIRECT', False)
    SECURE_HSTS_SECONDS = int(env_str('SECURE_HSTS_SECONDS', '0') or 0)
    if SECURE_HSTS_SECONDS:
        SECURE_HSTS_INCLUDE_SUBDOMAINS = True
        SECURE_HSTS_PRELOAD = True


# --- Aplicaciones ----------------------------------------------------------

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'apps.core',
    'apps.clients',
    'apps.documents',
    'apps.projects',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    # Sirve los estáticos del admin sin depender de nginx.
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'kibocode.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'kibocode.wsgi.application'


# --- Base de datos ---------------------------------------------------------

# En producción: DATABASE_URL apunta al Postgres de Supabase
# (modo Session pooler si el backend corre con varios workers).
# El fallback a SQLite existe solo para poder levantar el proyecto en local
# sin credenciales de Supabase.
# `parse` en vez de `config`: este último toma la variable de entorno aunque
# esté vacía, lo que dejaba la base de datos sin configurar.
#
# CONN_MAX_AGE: con el *Session pooler* de Supabase, mantener conexiones vivas
# (600s) es lo recomendado. Si algún día se usa el *Transaction pooler*, hay
# que ponerlo en 0 — pgbouncer en modo transaction no admite conexiones
# persistentes.
DATABASES = {
    'default': dj_database_url.parse(
        env_str('DATABASE_URL', f'sqlite:///{(BASE_DIR / "db.sqlite3").as_posix()}'),
        conn_max_age=int(env_str('CONN_MAX_AGE', '600')),
        conn_health_checks=True,
    )
}


AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]


# --- Internacionalización --------------------------------------------------

LANGUAGE_CODE = 'es-co'
TIME_ZONE = 'America/Bogota'
USE_I18N = True
USE_TZ = True


# --- Archivos estáticos y media -------------------------------------------

STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
MEDIA_URL = 'media/'
MEDIA_ROOT = BASE_DIR / 'media'

STORAGES = {
    'default': {'BACKEND': 'django.core.files.storage.FileSystemStorage'},
    'staticfiles': {
        'BACKEND': 'whitenoise.storage.CompressedManifestStaticFilesStorage'
        if not DEBUG
        else 'django.contrib.staticfiles.storage.StaticFilesStorage'
    },
}

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# --- Logging ---------------------------------------------------------------

# A stdout: systemd lo recoge en journalctl. Sin archivos que rotar a mano.
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'simple': {'format': '[{levelname}] {asctime} {name}: {message}', 'style': '{'},
    },
    'handlers': {
        'console': {'class': 'logging.StreamHandler', 'formatter': 'simple'},
    },
    'root': {'handlers': ['console'], 'level': env_str('LOG_LEVEL', 'INFO')},
    'loggers': {
        'django.request': {'handlers': ['console'], 'level': 'ERROR', 'propagate': False},
    },
}


# --- Django REST Framework -------------------------------------------------

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'apps.core.authentication.PlatformJWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',
    ),
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(hours=8),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'AUTH_HEADER_TYPES': ('Bearer',),
    'SIGNING_KEY': SECRET_KEY,
}


# --- CORS ------------------------------------------------------------------

# Nunca hardcodear orígenes: se leen del entorno.
CORS_ALLOWED_ORIGINS = env_list(
    'CORS_ALLOWED_ORIGINS',
    'http://localhost:5173,http://127.0.0.1:5173',
)
CORS_ALLOW_CREDENTIALS = True


# --- Datos legales fijos de KiboCode --------------------------------------

# Viven en un solo lugar y se inyectan en todas las plantillas de documento,
# en vez de repetirse hardcodeados en cada una.
KIBOCODE_LEGAL = {
    'razon_social': os.environ.get('KIBO_RAZON_SOCIAL', 'Juan Manuel Colorado Duque'),
    'nombre_comercial': os.environ.get('KIBO_NOMBRE_COMERCIAL', 'KiboCode'),
    # Cédula del prestador: dato personal, se define por variable de entorno
    # (ver .env.example) y nunca se escribe en el código fuente.
    'documento': os.environ.get('KIBO_DOCUMENTO', ''),
    'whatsapp': os.environ.get('KIBO_WHATSAPP', '+57 312 688 6357'),
    'whatsapp_plain': os.environ.get('KIBO_WHATSAPP_PLAIN', '573126886357'),
    'email': os.environ.get('KIBO_EMAIL', 'contacto@kibocode.lat'),
    'ciudad': os.environ.get('KIBO_CIUDAD', 'Colombia'),
    # Vacío = usa backend/assets/logo.png
    'logo_path': env_str('KIBO_LOGO_PATH'),
}
