import { useRef } from 'react';

import { gsap, prefersReducedMotion } from '../lib/gsap.js';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect.js';

/**
 * Ejecuta animaciones GSAP con limpieza automática.
 *
 * `gsap.context` recoge todo lo creado dentro del callback (tweens y
 * ScrollTriggers) y lo revierte al desmontar, que es lo que evita fugas y
 * triggers huérfanos al navegar entre vistas.
 *
 * Devuelve la ref que hay que poner en el contenedor: los selectores del
 * callback se resuelven dentro de ese ámbito, no en todo el documento.
 */
export function useGsapContext(setup, deps = []) {
  const scope = useRef(null);

  useIsomorphicLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined;

    const ctx = gsap.context((self) => setup(self, gsap), scope);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scope;
}
