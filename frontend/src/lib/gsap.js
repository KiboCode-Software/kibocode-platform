import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Punto único de acceso a GSAP.
 *
 * `prefersReducedMotion` se consulta antes de animar: quien lo tenga activado
 * ve el contenido en su posición final, sin movimiento.
 */
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export { gsap, ScrollTrigger };
