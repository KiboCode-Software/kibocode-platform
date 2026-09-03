import { gsap, prefersReducedMotion } from './gsap.js';

/**
 * Efectos puntuales, disparados por una acción y no por el scroll.
 *
 * Viven fuera de React a propósito: son elementos que nacen, se animan y se
 * borran en menos de un segundo. Meterlos en el estado obligaría a repintar
 * el formulario entero por cada chispa.
 */

const CHISPAS = 26;

/**
 * Estallido de chispas violetas desde el centro de un elemento.
 *
 * Se dispara al abrir WhatsApp: es el acuse de recibo de que el mensaje se
 * fue. Sin él, el formulario se queda mudo justo en el momento en que el
 * visitante hace lo único que le pedimos en toda la página.
 */
export function lanzarChispas(origen) {
  if (!origen || prefersReducedMotion()) return;

  const caja = origen.getBoundingClientRect();
  const capa = document.createElement('div');
  capa.setAttribute('aria-hidden', 'true');
  capa.style.cssText = `position:fixed;left:0;top:0;width:100%;height:100%;
    pointer-events:none;z-index:60;`;
  document.body.appendChild(capa);

  const centroX = caja.left + caja.width / 2;
  const centroY = caja.top + caja.height / 2;

  const chispas = Array.from({ length: CHISPAS }, () => {
    const chispa = document.createElement('span');
    const claro = Math.random() > 0.55;
    const lado = 3 + Math.random() * 4;
    chispa.style.cssText = `position:absolute;left:${centroX}px;top:${centroY}px;
      width:${lado}px;height:${lado}px;border-radius:1px;
      background:${claro ? '#d9bbff' : '#a855f7'};
      box-shadow:0 0 12px ${claro ? '#d9bbff' : '#a855f7'};`;
    capa.appendChild(chispa);
    return chispa;
  });

  gsap.to(chispas, {
    // Sesgado hacia arriba: el mensaje sale, no se derrama.
    x: () => gsap.utils.random(-190, 190),
    y: () => gsap.utils.random(-170, 90),
    scale: 0,
    rotation: () => gsap.utils.random(-180, 180),
    opacity: 0,
    duration: () => gsap.utils.random(0.7, 1.3),
    ease: 'power3.out',
    stagger: 0.012,
    onComplete: () => capa.remove(),
  });
}

/**
 * Onda expansiva desde el botón, contenida en el panel del formulario.
 * La clase `.onda` lleva la animación; aquí solo se coloca y se limpia.
 */
export function lanzarOnda(panel, origen) {
  if (!panel || !origen || prefersReducedMotion()) return;

  const cajaPanel = panel.getBoundingClientRect();
  const cajaOrigen = origen.getBoundingClientRect();
  const diametro = Math.max(cajaPanel.width, cajaPanel.height) * 2.2;

  const onda = document.createElement('span');
  onda.setAttribute('aria-hidden', 'true');
  onda.className = 'onda';
  onda.style.cssText = `position:absolute;pointer-events:none;border-radius:9999px;
    width:${diametro}px;height:${diametro}px;
    left:${cajaOrigen.left - cajaPanel.left + cajaOrigen.width / 2 - diametro / 2}px;
    top:${cajaOrigen.top - cajaPanel.top + cajaOrigen.height / 2 - diametro / 2}px;
    background:radial-gradient(circle, rgb(168 85 247 / 0.35), transparent 62%);`;

  panel.appendChild(onda);
  window.setTimeout(() => onda.remove(), 1000);
}
