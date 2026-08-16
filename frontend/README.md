# KiboCode — frontend

React 18 + Vite 6 + Tailwind 4. Contiene la landing pública y la plataforma
interna; comparten componentes y paleta, pero no se enlazan entre sí.

## Arrancar

```bash
npm install
npm run dev        # http://localhost:5173
```

La plataforma necesita además el backend corriendo (ver `../backend/README.md`).

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo con recarga en caliente |
| `npm run build` | Compila a `dist/` |
| `npm run preview` | Sirve `dist/` como en producción |

## Estructura

```
src/
├── config/       site.config.js — datos de contacto, rutas, URL de la API
├── content/      todo el copy, separado de los componentes
├── components/   ui/ (primitivas) y layout/ (navbar, footer, section)
├── sections/     secciones de la landing
├── pages/        LandingPage, PrivacyPage, PlatformPage
├── hooks/        useRoute, useContactForm
├── platform/     plataforma interna
│   ├── api/      cliente HTTP con JWT y refresco de token
│   ├── auth/     sesión persistida
│   ├── views/    login, documentos, clientes, proyectos, portal
│   └── components/
└── styles/       index.css — tokens de la paleta
```

Dos reglas que sostienen la organización:

1. **El copy no vive en los componentes.** Está en `content/`, así que cambiar
   textos no implica tocar JSX.
2. **La configuración tiene un solo lugar.** WhatsApp, correo y rutas salen de
   `config/site.config.js`.

## SEO

Todo se configura en **`src/config/seo.config.js`**. `vite-seo-plugin.js` lo
inyecta en `index.html` durante la compilación (etiquetas meta, Open Graph y
JSON-LD) y genera `robots.txt` y `sitemap.xml`.

Los datos estructurados salen del mismo contenido que ve el visitante
(`src/config/structured-data.js` lee las FAQ de `content/`), así que no se
pueden desincronizar.

**`npm run build` pre-renderiza las páginas públicas a HTML estático**: el
contenido queda escrito en `dist/index.html` y `dist/privacidad/index.html`,
de modo que los rastreadores no dependen de ejecutar JavaScript. En el
navegador React hidrata ese mismo marcado.

> Al pre-renderizar, **nada que dependa del navegador puede decidir el marcado
> durante el render** (`window`, `localStorage`, `prefers-reduced-motion`…): el
> servidor produciría un HTML distinto y la hidratación fallaría. Ese estado va
> dentro de un efecto. `npm run build:client-only` compila sin pre-render si
> hiciera falta descartarlo al depurar.

El dominio de producción es **kibocode.lat**, definido en `seo.config.js`
(`siteUrl`). De ahí salen la URL canónica, las etiquetas Open Graph y el
sitemap, así que cambiarlo en ese único sitio actualiza todo.

## Marca

El logo vive en **`public/logo.png`** (192×192). Desde ahí lo usan el
componente `ui/Logo.jsx`, el favicon y la miniatura de Open Graph, siempre por
ruta absoluta `/logo.png`.

> No lo pongas en `dist/`: esa carpeta es la salida del build y Vite la vacía
> en cada compilación, además de estar en `.gitignore`, así que el archivo se
> perdería al desplegar. La versión a tamaño completo para los PDF está en
> `../backend/assets/logo.png`.

## Rutas

| Ruta | Vista |
|---|---|
| `/` | Landing pública |
| `/privacidad` | Aviso de privacidad |
| `/plataforma` | Plataforma interna (no enlazada desde la landing) |

El enrutado es propio y mínimo (`hooks/useRoute.js`, basado en `pathname`), sin
librería externa. **En producción el servidor debe devolver `index.html` para
rutas desconocidas**, o entrar directo a `/plataforma` dará 404. La config de
nginx en `../deploy/nginx.conf` ya lo contempla.

## API

Las peticiones van al mismo origen (`/api/...`). En desarrollo el proxy de
`vite.config.js` las manda a `http://localhost:8000`; en producción lo hace
nginx. Por eso el build no contiene ninguna URL y sirve para cualquier dominio
sin recompilar.

Variables opcionales (ver `.env.example`): `VITE_PROXY_TARGET` si el backend
local usa otro puerto, `VITE_API_URL` si algún día la API vive en otro dominio.
