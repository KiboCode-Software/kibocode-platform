/**
 * Configuración global del sitio.
 * Único punto de cambio para datos de contacto, enlaces externos
 * y la información legal que aparece en el Aviso de Privacidad.
 */
export const siteConfig = {
  name: 'KiboCode',
  whatsapp: {
    number: '573023328465', // +57 302 332 8465 — WhatsApp Business
    display: '+57 302 332 8465',
    message: 'Hola, me interesa iniciar un proyecto con KiboCode.',
  },
  contactEmail: 'contacto@kibocode.lat',

  /**
   * Datos del responsable del tratamiento (Ley 1581 de 2012).
   * PENDIENTE: reemplazar los dos valores entre corchetes antes de publicar.
   */
  legal: {
    ownerName: 'Juan Manuel Colorado Duque',
    country: 'Colombia',
    lastUpdated: '15 de agosto de 2026',
  },
};

export const routes = {
  home: '/',
  privacy: '/privacidad',
  // Plataforma interna: intencionalmente NO enlazada desde la landing pública.
  // Solo se llega escribiendo la URL directamente.
  platform: '/plataforma',
};

/**
 * URL base del backend de la plataforma.
 *
 * Vacía a propósito: las peticiones van al mismo origen (`/api/...`). En el
 * EC2 nginx enruta `/api` a gunicorn, y en desarrollo lo hace el proxy de
 * Vite, así que ambos entornos recorren el mismo camino y el build sirve para
 * cualquier dominio sin recompilar.
 *
 * `VITE_API_URL` solo hace falta si algún día la API vive en otro dominio.
 */
// `import.meta.env?` porque este módulo también se importa desde
// `vite.config.js` (Node puro), donde `import.meta.env` no existe.
export const apiBaseUrl = (import.meta.env?.VITE_API_URL || '').replace(/\/+$/, '');

export const whatsappUrl = (text = siteConfig.whatsapp.message) =>
  `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(text)}`;
