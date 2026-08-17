/**
 * Analítica y medición de campañas.
 *
 * El identificador se define en tiempo de compilación con VITE_TIKTOK_PIXEL_ID.
 * Si está vacío no se carga nada: así el sitio funciona igual en desarrollo y
 * no se envían datos a terceros mientras se prueba.
 */

export const analytics = {
  tiktok: {
    /**
     * PENDIENTE: pegar aquí el ID del píxel, o definir VITE_TIKTOK_PIXEL_ID
     * al compilar. Se saca de TikTok Ads Manager →
     * Herramientas → Eventos → Eventos del sitio web.
     */
    pixelId: import.meta.env?.VITE_TIKTOK_PIXEL_ID || '',

    /**
     * Evento que se dispara cuando alguien envía el formulario de contacto.
     * Es la conversión que el optimizador de TikTok usa para aprender a quién
     * mostrarle los anuncios, así que sin esto la campaña optimiza a ciegas.
     */
    leadEvent: 'SubmitForm',
  },
};

/** Solo se mide el sitio público: la plataforma interna nunca se rastrea. */
export const analyticsEnabled = () => Boolean(analytics.tiktok.pixelId);
