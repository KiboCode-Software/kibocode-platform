import { useRef } from 'react';

import { gsap } from '../../lib/gsap.js';
import { useGsapContext } from '../../hooks/useGsap.js';

/**
 * Cuenta hasta el valor al entrar en pantalla.
 *
 * El marcado contiene siempre la cifra final: es lo que ven los rastreadores
 * y quien tenga el movimiento reducido, y evita que el HTML pre-renderizado
 * difiera del que produce el navegador al hidratar. El "0" inicial lo pone
 * la animación, ya en el cliente.
 *
 * Acepta cifras con formato ("−70%", "< 24 h"): separa prefijo y sufijo y
 * solo anima la parte numérica.
 */
export function Counter({ value, className = '' }) {
  const ref = useRef(null);
  const { prefix, number, suffix } = parseValue(value);

  useGsapContext(() => {
    if (number === null) return;

    const counter = { current: 0 };
    ref.current.textContent = `${prefix}0${suffix}`;

    gsap.to(counter, {
      current: number,
      duration: 1.6,
      ease: 'power2.out',
      onUpdate: () => {
        ref.current.textContent = `${prefix}${Math.round(counter.current)}${suffix}`;
      },
      scrollTrigger: { trigger: ref.current, start: 'top 92%', once: true },
    });
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}

/** Extrae el número de una cifra con formato; devuelve null si no hay ninguno. */
function parseValue(value) {
  const match = String(value).match(/^(\D*?)(\d+)(.*)$/);
  if (!match) return { prefix: '', number: null, suffix: '' };
  return { prefix: match[1], number: Number(match[2]), suffix: match[3] };
}
