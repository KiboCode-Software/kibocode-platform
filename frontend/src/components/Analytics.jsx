import { useEffect } from 'react';

import { cargarPixel } from '../lib/tiktok-pixel.js';

/**
 * Carga la medición del sitio público.
 *
 * Va en un efecto para que no se ejecute durante el pre-renderizado y para
 * que el píxel no compita con el primer pintado de la página.
 */
export function Analytics() {
  useEffect(() => {
    cargarPixel();
  }, []);

  return null;
}
