import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

import { seoPlugin } from './vite-seo-plugin.js';

// En el EC2, nginx sirve el frontend y enruta `/api` a gunicorn en el mismo
// dominio. Este proxy reproduce ese montaje en local, de modo que desarrollo
// y producción usan exactamente el mismo camino (peticiones relativas, sin CORS).
const apiProxy = {
  '/api': {
    target: process.env.VITE_PROXY_TARGET || 'http://localhost:8000',
    changeOrigin: true,
  },
};

export default defineConfig({
  plugins: [react(), tailwindcss(), seoPlugin()],
  server: { proxy: apiProxy },
  preview: { proxy: apiProxy },
});
