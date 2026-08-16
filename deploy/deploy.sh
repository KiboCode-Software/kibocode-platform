#!/usr/bin/env bash
#
# Despliegue de KiboCode en el EC2. Idempotente: se puede correr en cada
# actualización.
#
#   cd /srv/kibocode && ./deploy/deploy.sh
#
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "==> Actualizando código"
git pull --ff-only

echo "==> Frontend"
cd frontend
npm ci
npm run build            # genera frontend/dist/
cd "$ROOT"

echo "==> Backend"
cd backend
if [ ! -d .venv ]; then
    python3 -m venv .venv
fi
.venv/bin/pip install --upgrade pip
.venv/bin/pip install -r requirements.txt

if [ ! -f .env ]; then
    echo "ERROR: falta backend/.env (cópialo de .env.example y complétalo)." >&2
    exit 1
fi

.venv/bin/python manage.py migrate --noinput
.venv/bin/python manage.py collectstatic --noinput
.venv/bin/python manage.py seed_templates
.venv/bin/python manage.py check --deploy

cd "$ROOT"

echo "==> Reiniciando servicios"
sudo systemctl restart kibocode
sudo systemctl reload nginx

echo "==> Comprobando salud"
sleep 3
curl -fsS http://127.0.0.1:8000/api/auth/health/ && echo

echo "==> Listo"
