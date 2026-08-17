/**
 * Datos de SEO en un solo lugar.
 *
 * Se consumen en tiempo de compilación desde `vite.config.js`, que los
 * inyecta como etiquetas meta y JSON-LD dentro de `index.html`. Al quedar en
 * el HTML estático, los ven todos los rastreadores — incluidos los de redes
 * sociales y buscadores que no ejecutan JavaScript.
 */

/**
 * Dominio definitivo. Debe coincidir exactamente con el de producción,
 * incluido el prefijo `www` o su ausencia: una URL canónica que no coincida
 * divide la autoridad entre dos direcciones.
 * Se puede sobrescribir con VITE_SITE_URL al compilar.
 */
export const siteUrl = (process.env.VITE_SITE_URL || 'https://kibocode.lat').replace(
  /\/+$/,
  '',
);

export const seo = {
  siteName: 'KiboCode',
  locale: 'es_CO',
  lang: 'es-CO',

  /* El título es lo que más pesa: qué somos + qué hacemos + dónde. */
  title: 'KiboCode | Desarrollo de software a medida para empresas en Colombia',

  /* ~155 caracteres: lo que Google muestra sin recortar. */
  description:
    'Agencia de software a medida en Colombia. Desarrollamos plataformas web, automatizamos procesos y construimos sistemas de gestión que reducen el trabajo manual.',

  /* Frase corta para redes sociales, donde el espacio es menor. */
  socialDescription:
    'Software a medida que convierte horas de trabajo manual en rentabilidad. Desarrollo web, automatización de procesos y sistemas de gestión.',

  image: '/logo.png',
  imageAlt: 'KiboCode — software a medida',

  /* Zona de servicio: refuerza la búsqueda local. */
  areaServed: ['Colombia', 'Medellín', 'Antioquia'],

  /* Qué hacemos, en el vocabulario con el que la gente busca. */
  services: [
    {
      name: 'Desarrollo de software a medida',
      description:
        'Plataformas web, PWAs y aplicaciones empresariales construidas según los requerimientos exactos del cliente.',
    },
    {
      name: 'Automatización de procesos',
      description:
        'Integración de APIs, sincronización entre sistemas y eliminación de tareas manuales repetitivas.',
    },
    {
      name: 'Sistemas de gestión (SGI / CRM)',
      description:
        'Software interno para control de inventarios, clientes y operación en tiempo real.',
    },
  ],

  /**
   * Páginas indexables. Cada una lleva su propio título y descripción: si
   * comparten los de la portada, los buscadores las tratan como duplicados
   * y solo indexan una.
   */
  pages: [
    {
      path: '/',
      priority: '1.0',
      changefreq: 'monthly',
      title: 'KiboCode | Desarrollo de software a medida para empresas en Colombia',
      description:
        'Agencia de software a medida en Colombia. Desarrollamos plataformas web, automatizamos procesos y construimos sistemas de gestión que reducen el trabajo manual.',
      structuredData: true,
    },
    {
      path: '/privacidad',
      priority: '0.3',
      changefreq: 'yearly',
      title: 'Aviso de Privacidad | KiboCode',
      description:
        'Cómo trata KiboCode tus datos personales conforme a la Ley 1581 de 2012: qué recolectamos, para qué, cuánto tiempo y cómo ejercer tus derechos.',
      structuredData: false,
    },
  ],

  /* La plataforma interna no debe indexarse. */
  disallow: ['/plataforma', '/api/', '/admin/'],
};
