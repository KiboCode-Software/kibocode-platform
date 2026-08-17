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
export function LanguageProvider({ language = DEFAULT_LANGUAGE, path = '/', children }) {
  const value = useMemo(() => {
    const config = LANGUAGES[language] || LANGUAGES[DEFAULT_LANGUAGE];
    // La ruta viaja por el contexto y no se lee de `window`: durante el
    // pre-renderizado no hay navegador, y leerlo allí generaba enlaces
    // equivocados en el HTML servido.
    return { language: config.code, config, path, content: getContent(config.code) };
  }, [language, path]);

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

/** Código, configuración y ruta actual del idioma activo. */
export function useLanguage() {
  const { language, config, path } = useLanguageContext();
  return { language, config, path };
}
