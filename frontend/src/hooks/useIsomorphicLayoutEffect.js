import { useEffect, useLayoutEffect } from 'react';

/**
 * `useLayoutEffect` en el navegador, `useEffect` en el servidor.
 *
 * Evita el aviso de React al pre-renderizar: los efectos de layout no
 * existen en el servidor, donde no hay nada que medir ni pintar.
 */
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;
