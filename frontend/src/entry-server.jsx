import React from 'react';
import { renderToString } from 'react-dom/server';

import App from './App.jsx';

/**
 * Punto de entrada del pre-renderizado.
 *
 * Genera el HTML de una ruta en tiempo de compilación para que los
 * rastreadores reciban el contenido ya escrito, sin depender de que ejecuten
 * JavaScript. El resultado se hidrata en el navegador.
 */
export function render(path) {
  return renderToString(<App initialPath={path} />);
}
