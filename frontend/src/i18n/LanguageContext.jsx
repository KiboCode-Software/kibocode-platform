import { createContext, useContext, useMemo } from 'react';

import { getContent } from '../content/index.js';
import { DEFAULT_LANGUAGE, LANGUAGES } from './languages.js';

const LanguageContext = createContext(null);

/**
 * Pone a disposición el idioma activo y su contenido.
 *
 * El idioma se deriva de la URL, no de un estado interno: así el
 * pre-renderizado puede generar cada versión y los buscadores indexar ambas.
 */
export function LanguageProvider({ language = DEFAULT_LANGUAGE, children }) {
  const value = useMemo(() => {
    const config = LANGUAGES[language] || LANGUAGES[DEFAULT_LANGUAGE];
    return { language: config.code, config, content: getContent(config.code) };
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

function useLanguageContext() {
  const value = useContext(LanguageContext);
  if (!value) {
    throw new Error('useContent debe usarse dentro de <LanguageProvider>');
  }
  return value;
}

/** Contenido del idioma activo. */
export const useContent = () => useLanguageContext().content;

/** Código y configuración del idioma activo (rutas, etiquetas, locale). */
export function useLanguage() {
  const { language, config } = useLanguageContext();
  return { language, config };
}
