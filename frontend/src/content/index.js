import * as esLanding from './landing.content.js';
import { privacyContent as esPrivacy } from './privacy.content.js';
import * as enLanding from './en/landing.content.js';
import { privacyContent as enPrivacy } from './en/privacy.content.js';

import { DEFAULT_LANGUAGE } from '../i18n/languages.js';

/**
 * Todo el copy, por idioma.
 *
 * Cada paquete expone exactamente la misma forma, de modo que los
 * componentes no saben en qué idioma están: piden su contenido y lo pintan.
 * Añadir un idioma nuevo es crear su carpeta y registrarlo aquí.
 */
const BUNDLES = {
  es: { ...esLanding, privacyContent: esPrivacy },
  en: { ...enLanding, privacyContent: enPrivacy },
};

export function getContent(language) {
  return BUNDLES[language] || BUNDLES[DEFAULT_LANGUAGE];
}
