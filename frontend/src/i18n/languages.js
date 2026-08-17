/**
 * Idiomas del sitio público.
 *
 * El español vive en la raíz (`/`) y los demás bajo su prefijo (`/en`). Cada
 * idioma tiene URL propia a propósito: es lo que permite que los buscadores
 * indexen ambas versiones y las ofrezcan a quien corresponda. Un sitio que
 * cambia de idioma sin cambiar de dirección solo puede indexarse una vez.
 */

export const DEFAULT_LANGUAGE = 'es';

export const LANGUAGES = {
  es: {
    code: 'es',
    label: 'Español',
    short: 'ES',
    htmlLang: 'es',
    ogLocale: 'es_LA',
    prefix: '',
    routes: { home: '/', privacy: '/privacidad' },
  },
  en: {
    code: 'en',
    label: 'English',
    short: 'EN',
    htmlLang: 'en',
    ogLocale: 'en_US',
    prefix: '/en',
    routes: { home: '/en', privacy: '/en/privacy' },
  },
};

export const LANGUAGE_CODES = Object.keys(LANGUAGES);

/** Idioma al que pertenece una ruta. El más largo gana: `/en` antes que `/`. */
export function languageFromPath(pathname = '/') {
  const match = LANGUAGE_CODES.filter((code) => LANGUAGES[code].prefix)
    .sort((a, b) => LANGUAGES[b].prefix.length - LANGUAGES[a].prefix.length)
    .find(
      (code) =>
        pathname === LANGUAGES[code].prefix ||
        pathname.startsWith(`${LANGUAGES[code].prefix}/`),
    );
  return match || DEFAULT_LANGUAGE;
}

/** Quita el prefijo de idioma, para saber qué página es con independencia del idioma. */
export function stripPrefix(pathname = '/') {
  const { prefix } = LANGUAGES[languageFromPath(pathname)];
  if (!prefix) return pathname;
  const rest = pathname.slice(prefix.length);
  return rest || '/';
}

/**
 * Idioma preferido del navegador, si lo tenemos traducido.
 * Devuelve null cuando no hay coincidencia, para no forzar un cambio.
 */
export function detectBrowserLanguage() {
  if (typeof navigator === 'undefined') return null;
  const preferidos = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];

  for (const etiqueta of preferidos) {
    // "en-GB" y "en" son el mismo idioma para nosotros.
    const base = String(etiqueta).toLowerCase().split('-')[0];
    if (LANGUAGE_CODES.includes(base)) return base;
  }
  return null;
}
