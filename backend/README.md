# Plataforma interna de KiboCode — backend

Django + DRF. Sirve el dashboard del vendedor y el portal del cliente
(`/plataforma` en el frontend). La landing pública no depende de este backend.

## Puesta en marcha local

```bash
cd backend
python -m venv .venv
.venv/Scripts/activate        # Windows;  source .venv/bin/activate en Linux
pip install -r requirements.txt
cp .env.example .env          # y completa los valores
python manage.py migrate
python manage.py seed_templates
python manage.py create_vendor --username juan
python manage.py runserver 8000
```

El frontend (en `../frontend`) llega a la API por el proxy de Vite, que apunta
a `http://localhost:8000`. Si levantas el backend en otro puerto, define
`VITE_PROXY_TARGET` en el entorno del frontend.

## Variables de entorno

Ver `.env.example`. Las que importan:

| Variable | Para qué |
|---|---|
| `SECRET_KEY` | Obligatoria en producción. El arranque falla si queda la de desarrollo con `DEBUG=False`. |
| `DEBUG` | `False` en producción. |
| `ALLOWED_HOSTS` | Dominios que sirve el backend. |
| `DATABASE_URL` | Postgres de Supabase. Vacía → SQLite local (solo desarrollo). |
| `CORS_ALLOWED_ORIGINS` | Orígenes del frontend, separados por coma. |
| `KIBO_DOCUMENTO` | Cédula del prestador. **Sin esto los contratos salen incompletos.** |

Una variable presente pero vacía cuenta como no definida.

## Supabase

`DATABASE_URL` es el connection string de Supabase. Si el backend corre con
varios workers de gunicorn, usa el del modo **Session pooler**. Django habla
con Postgres por su ORM normal: no se usa el SDK de Supabase.

## PDFs — dos motores

`PDF_ENGINE` (`auto` por defecto) elige el motor: usa WeasyPrint si está
disponible y, si no, Playwright. También se puede fijar a `weasyprint` o
`playwright`. `GET /api/documents/templates/engine/` informa cuál está activo.

**WeasyPrint** — Python puro, ligero para un servidor persistente. Necesita
librerías del sistema; en el EC2 (Ubuntu/Debian):

```bash
sudo apt-get install -y libpango-1.0-0 libpangoft2-1.0-0 libharfbuzz0b libffi-dev
```

**Playwright/Chromium** — trae su propio navegador, sin dependencias del
sistema, y funciona en Windows (donde WeasyPrint no carga por falta de GTK):

```bash
python -m playwright install chromium
```

Consume más RAM por render, así que en el EC2 conviene WeasyPrint. Ambos
producen el mismo documento: los márgenes y el pie de página del estilo legal
se definen en el CSS `@page` (que WeasyPrint lee) y se le pasan a Chromium
como opciones desde `services.pdf_options()`, porque Chromium no soporta las
cajas `@bottom-left` / `@bottom-right`.

Si no hay ningún motor disponible, la generación responde `503` con el código
`pdf_engine_unavailable` y el frontend lo indica en pantalla. La **vista previa**
funciona siempre, en cualquier entorno.

> Playwright usa su API síncrona, compatible con WSGI/gunicorn. Si algún día
> se migra el backend a ASGI/async, habría que envolver el render en un hilo.

## Despliegue en EC2

```bash
python manage.py collectstatic --noinput
python manage.py migrate
gunicorn kibocode.wsgi:application --bind 127.0.0.1:8000 --workers 3
```

Detrás de nginx, con el frontend compilado (`npm run build` → `dist/`) servido
como estático. **nginx debe devolver `index.html` para rutas desconocidas**, o
entrar directo a `/plataforma` y `/privacidad` dará 404:

```nginx
location / {
    try_files $uri $uri/ /index.html;
}

location /api/ {
    proxy_pass http://127.0.0.1:8000;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

## API

Autenticación JWT con dos flujos separados. El claim `role` del token decide
qué puede tocar cada quien.

| Método | Ruta | Quién |
|---|---|---|
| POST | `/api/auth/vendor/login/` | público |
| POST | `/api/auth/client/login/` | público |
| POST | `/api/auth/refresh/` | público |
| GET | `/api/auth/session/` | autenticado |
| GET/POST | `/api/clients/` | vendedor |
| GET | `/api/documents/templates/` | vendedor |
| GET | `/api/documents/templates/engine/` | vendedor |
| GET/POST/PUT | `/api/documents/generated/` | vendedor |
| GET | `/api/documents/generated/{id}/pdf/` | vendedor |
| GET | `/api/documents/generated/{id}/preview/` | vendedor |
| GET/POST/PATCH | `/api/projects/` | vendedor |
| POST | `/api/projects/updates/` | vendedor |
| GET | `/api/projects/mine/` | **cliente** |

`/api/projects/mine/` toma el cliente del token firmado, nunca de un parámetro
del frontend. Un cliente recibe `403` en cualquier endpoint de vendedor.

## Marca en los documentos

El logo del membrete se lee de `backend/assets/logo.png` y se embebe en el HTML
como data URI (base64). Va embebido a propósito: así el documento es
autocontenido y se renderiza igual con WeasyPrint que con Chromium, sin
depender del `base_url` ni de rutas del sistema de archivos.

`KIBO_LOGO_PATH` permite apuntar a otro archivo sin tocar código.

## Plantillas de documento

Las 4 plantillas se cargan con `seed_templates` (idempotente: se puede volver
a correr para actualizar el texto). Cada una guarda en base de datos el
**cuerpo** del documento con placeholders `{{ campo }}`; el **diseño** vive en
`templates/documents/base_legal.html` y `base_comercial.html`. El vendedor solo
llena campos: nunca toca maquetación.

Los datos fijos de KiboCode (razón social, cédula, WhatsApp, correo) llegan a
todas las plantillas como `{{ kibo.* }}` desde `settings.KIBOCODE_LEGAL`.
