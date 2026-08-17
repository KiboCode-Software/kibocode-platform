import { useEffect } from 'react';

import {
  DEFAULT_LANGUAGE,
  LANGUAGES,
  detectBrowserLanguage,
} from './languages.js';

const STORAGE_KEY = 'kibocode.idioma';

/** Idioma elegido a mano por el visitante, si lo hubo. */
export function getPreferredLanguage() {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function setPreferredLanguage(language) {
  try {
    window.localStorage.setItem(STORAGE_KEY, language);
  } catch {
    /* Navegación privada: no poder recordarlo no debe romper nada. */
  }
}

/**
 * Lleva al visitante a su idioma la primera vez que entra.
 *
 * Solo actúa en la raíz del sitio y solo si no ha elegido idioma antes: si
 * alguien pidió `/en` expresamente, o ya pulsó el selector, se respeta su
 * decisión. Sin esa condición, el selector de idioma sería inútil — cada
 * recarga desharía la elección.
 */
export function useLanguageRedirect(currentLanguage, pathname) {
  useEffect(() => {
    const elegido = getPreferredLanguage();

    // Ya decidió: no lo movemos de sitio.
    if (elegido) return;

    // Solo desde la raíz; en cualquier otra URL el idioma es explícito.
    if (pathname !== '/') return;

    const delNavegador = detectBrowserLanguage();
    if (!delNavegador || delNavegador === currentLanguage) return;

    const destino = LANGUAGES[delNavegador]?.routes.home;
    if (destino) window.location.replace(destino);
  }, [currentLanguage, pathname]);
}

export { DEFAULT_LANGUAGE };
