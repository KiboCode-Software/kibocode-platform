# Despliegue en EC2

Frontend y backend en la misma instancia, bajo un solo dominio: nginx sirve el
build de React y enruta `/api` a gunicorn. Al ser el mismo origen **no hay CORS
en producción**, y el build no lleva ninguna URL dentro, así que sirve para
cualquier dominio sin recompilar.

```
Internet → nginx :443 ─┬─ /        → /srv/kibocode/frontend/dist  (React compilado)
                       ├─ /api/    → gunicorn :8000              (Django)
                       ├─ /admin/  → gunicorn :8000
                       └─ /static/ → gunicorn :8000              (WhiteNoise)
```

Estructura del repositorio:

```
/srv/kibocode/
├── frontend/     React + Vite (landing pública + plataforma)
├── backend/      Django + DRF (API, documentos, portal)
└── deploy/       nginx, systemd, gunicorn, este script
```

## 1. Preparar la instancia

Ubuntu 22.04/24.04, puertos 80 y 443 abiertos en el security group.

```bash
sudo apt update
sudo apt install -y python3-venv python3-pip nginx git curl

# Node 20 para compilar el frontend
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Librerías de WeasyPrint (motor de PDF recomendado en el servidor)
sudo apt install -y libpango-1.0-0 libpangoft2-1.0-0 libharfbuzz0b libffi-dev
```

> Si prefieres Playwright en vez de WeasyPrint:
> `.venv/bin/python -m playwright install --with-deps chromium`.
> Pesa más y consume más RAM por render; en una instancia pequeña conviene
> WeasyPrint. `PDF_ENGINE=auto` elige el que esté disponible.

## 2. Traer el código

```bash
sudo mkdir -p /srv/kibocode && sudo chown $USER:$USER /srv/kibocode
git clone TU_REPO /srv/kibocode
cd /srv/kibocode
```

## 3. Configurar el backend

```bash
cd backend
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
cp .env.example .env
nano .env
```

Valores mínimos para producción:

```ini
SECRET_KEY=<genera una nueva>
DEBUG=False
ALLOWED_HOSTS=kibocode.lat,www.kibocode.lat
CSRF_TRUSTED_ORIGINS=https://kibocode.lat,https://www.kibocode.lat
DATABASE_URL=<connection string de Supabase, modo Session pooler>
KIBO_DOCUMENTO=<cédula del prestador>
KIBO_CIUDAD=<ciudad de firma habitual>
# CORS_ALLOWED_ORIGINS puede quedar vacío: mismo origen, no hace falta.
```

Genera la clave con:

```bash
.venv/bin/python -c "from django.core.management.utils import get_random_secret_key as k; print(k())"
```

Protege el archivo, que lleva credenciales:

```bash
chmod 600 .env
```

Luego:

```bash
.venv/bin/python manage.py migrate
.venv/bin/python manage.py collectstatic --noinput
.venv/bin/python manage.py seed_templates
.venv/bin/python manage.py create_vendor --username juan   # pide la clave por consola
.venv/bin/python manage.py check --deploy
```

## 4. Compilar el frontend

```bash
cd /srv/kibocode/frontend
npm ci
npm run build     # genera frontend/dist/
```

No hace falta definir `VITE_API_URL`: el build usa rutas relativas.

## 5. Servicio systemd

```bash
sudo cp deploy/kibocode.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now kibocode
sudo systemctl status kibocode
```

## 6. nginx + HTTPS

```bash
sudo cp deploy/nginx.conf /etc/nginx/sites-available/kibocode
sudo ln -sf /etc/nginx/sites-available/kibocode /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx

sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d kibocode.lat -d www.kibocode.lat
```

El certificado cubre las dos direcciones, aunque `www` solo redirige: sin él,
quien entre por `www.kibocode.lat` vería un aviso de certificado inválido antes
de que la redirección llegue a ocurrir.

Certbot añade el bloque TLS y la redirección de HTTP a HTTPS. Una vez con el
certificado en marcha, puedes activar HSTS en `.env`:

```ini
SECURE_HSTS_SECONDS=31536000
```

## 7. Comprobar

```bash
curl -fsS https://kibocode.lat/api/auth/health/    # {"status":"ok","database":"ok"}
```

Y en el navegador: la landing en `/`, el aviso en `/privacidad`, la plataforma
en `/plataforma` (que sigue sin estar enlazada desde ningún lado).

## Actualizaciones

```bash
cd /srv/kibocode && ./deploy/deploy.sh
```

Compila, migra, recolecta estáticos, reinicia el servicio y verifica la salud.

## Diagnóstico

| Síntoma | Dónde mirar |
|---|---|
| 502 Bad Gateway | `sudo systemctl status kibocode`, `journalctl -u kibocode -n 50` |
| 404 al entrar directo a `/plataforma` | Falta `try_files ... /index.html` en nginx |
| 400 Bad Request | El dominio no está en `ALLOWED_HOSTS` |
| CSRF al entrar al admin | Falta el dominio en `CSRF_TRUSTED_ORIGINS` |
| PDF responde 503 | No hay motor: instala las librerías de WeasyPrint o Chromium |
| El navegador sirve una versión vieja | `index.html` no debe cachearse (ya está en la config) |

## Nota sobre Supabase

`DATABASE_URL` en modo **Session pooler** admite conexiones persistentes
(`CONN_MAX_AGE=600`, el valor por defecto). Si algún día usas el **Transaction
pooler**, hay que poner `CONN_MAX_AGE=0` en `.env`: pgbouncer en modo
transacción no soporta conexiones reutilizadas y las peticiones fallarían de
forma intermitente.
