#!/usr/bin/env bash
#
# Despliegue de KiboCode en el EC2. Idempotente: se puede correr en cada
# actualización.
#
#   cd /srv/kibocode && ./deploy/deploy.sh
#
# GitHub Actions llama a este mismo script con SKIP_GIT=1 y SKIP_FRONTEND=1,
# porque el runner ya dejó el repositorio en el commit desplegado y subió el
# `dist/` compilado. Así hay un solo camino de despliegue, no dos.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if [ "${SKIP_GIT:-0}" = "1" ]; then
    echo "==> Código: ya sincronizado por CI"
else
    echo "==> Actualizando código"
    git pull --ff-only
fi

if [ "${SKIP_FRONTEND:-0}" = "1" ]; then
    echo "==> Frontend: build recibido de CI"
else
    echo "==> Frontend"
    cd frontend
    npm ci
    # El servidor comparte memoria con otros servicios: sin este límite, el
    # build se queda sin RAM y muere a mitad.
    NODE_OPTIONS=--max-old-space-size=1024 npm run build   # genera frontend/dist/
    cd "$ROOT"
fi

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
