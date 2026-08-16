# KiboCode

Landing pública y plataforma interna, en un repositorio con las
responsabilidades separadas por carpeta.

```
.
├── frontend/   React + Vite + Tailwind
│               ├── landing pública      (/)
│               ├── aviso de privacidad  (/privacidad)
│               └── plataforma interna   (/plataforma)
├── backend/    Django + DRF
│               ├── API de la plataforma (/api/...)
│               ├── generación de PDF de documentos
│               └── admin de Django      (/admin/)
└── deploy/     nginx, systemd, gunicorn y guía de despliegue en EC2
```

Cada carpeta tiene su propio README con el detalle:
[frontend](frontend/README.md) · [backend](backend/README.md) · [deploy](deploy/README.md)

## Arrancar en local

Hacen falta dos procesos. En una terminal, el backend:

```bash
cd backend && .venv/Scripts/python manage.py runserver 8000
```

En otra, el frontend:

```bash
cd frontend && npm run dev
```

Luego http://localhost:5173 para la landing y http://localhost:5173/plataforma
para el panel interno.

El frontend habla con la API por rutas relativas (`/api/...`): en desarrollo las
enruta el proxy de Vite y en producción nginx. Así ambos entornos recorren el
mismo camino y no hay CORS de por medio.

## Desplegar

Todo el procedimiento, desde una instancia limpia hasta HTTPS, está en
[deploy/README.md](deploy/README.md). Para actualizar una instalación existente:

```bash
cd /srv/kibocode && ./deploy/deploy.sh
```

## Estado

La plataforma interna **no está enlazada** desde la landing pública: solo se
llega escribiendo `/plataforma`. Es intencional mientras se termina de
construir.
