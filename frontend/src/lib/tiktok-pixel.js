import { analytics, analyticsEnabled } from '../config/analytics.config.js';

/**
 * Píxel de TikTok.
 *
 * Se carga de forma diferida y solo en el navegador: durante el
 * pre-renderizado no existe `window`, y cargarlo antes de que la página se
 * haya pintado retrasaría el contenido que ve el visitante.
 */

let cargado = false;

export function cargarPixel() {
  if (cargado || !analyticsEnabled() || typeof window === 'undefined') return;
  cargado = true;

  const id = analytics.tiktok.pixelId;

  /* Cola de eventos oficial de TikTok: acepta llamadas antes de que el
     script termine de cargar y las reproduce después. */
  window.TiktokAnalyticsObject = 'ttq';
  const ttq = (window.ttq = window.ttq || []);
  ttq.methods = [
    'page', 'track', 'identify', 'instances', 'debug', 'on', 'off',
    'once', 'ready', 'alias', 'group', 'enableCookie', 'disableCookie',
  ];
  ttq.setAndDefer = (objeto, metodo) => {
    objeto[metodo] = (...args) => objeto.push([metodo, ...args]);
  };
  ttq.methods.forEach((metodo) => ttq.setAndDefer(ttq, metodo));
  ttq.instance = (clave) => {
    const instancia = ttq._i[clave] || [];
    ttq.methods.forEach((metodo) => ttq.setAndDefer(instancia, metodo));
    return instancia;
  };
  ttq.load = (clave, opciones) => {
    const url = 'https://analytics.tiktok.com/i18n/pixel/events.js';
    ttq._i = ttq._i || {};
    ttq._i[clave] = [];
    ttq._i[clave]._u = url;
    ttq._t = ttq._t || {};
    ttq._t[clave] = +new Date();
    ttq._o = ttq._o || {};
    ttq._o[clave] = opciones || {};

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = `${url}?sdkid=${clave}&lib=ttq`;
    document.head.appendChild(script);
  };

  ttq.load(id);
  ttq.page();
}

/** Registra una conversión. Silencioso si el píxel no está configurado. */
export function registrarEvento(nombre, datos = {}) {
  if (!analyticsEnabled() || typeof window === 'undefined' || !window.ttq) return;
  window.ttq.track(nombre, datos);
}

export function registrarContacto() {
  registrarEvento(analytics.tiktok.leadEvent, { content_type: 'lead' });
}
