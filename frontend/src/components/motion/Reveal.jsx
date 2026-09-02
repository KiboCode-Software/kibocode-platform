import { useRef } from 'react';

import { gsap } from '../../lib/gsap.js';
import { useGsapContext } from '../../hooks/useGsap.js';

/**
 * Revela su contenido al entrar en pantalla.
 *
 * `stagger` escalona los hijos directos en lugar de mover el bloque entero:
 * la entrada se lee como una secuencia, no como un salto.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  stagger = 0,
  className = '',
  as: Tag = 'div',
  ...rest
}) {
  const scope = useGsapContext(() => {
    const root = scope.current;
    const targets = stagger ? Array.from(root.children) : root;

    gsap.from(targets, {
      opacity: 0,
      y,
      duration: 0.9,
      delay,
      ease: 'power3.out',
      stagger: stagger || 0,
      scrollTrigger: {
        trigger: root,
        start: 'top 88%',
        once: true,
      },
    });
  }, [delay, y, stagger]);

  // El resto de props viaja al elemento: así `Reveal` puede ser el propio
  // `<form onSubmit>` o un `<li>` sin necesitar un envoltorio extra que
  // rompa la semántica de la lista.
  return (
    <Tag ref={scope} className={className} {...rest}>
      {children}
    </Tag>
  );
}

/**
 * Titular que entra palabra por palabra, cada una subiendo desde su propia
 * máscara.
 *
 * Se anima por palabra y no por línea a propósito: las líneas dependen del
 * ancho de pantalla, así que partirlas a mano produce cortes arbitrarios que
 * además se rompen al envolverse. Por palabra el efecto funciona igual en
 * cualquier viewport.
 */
export function RevealWords({ text, className = '', delay = 0, accentLast = false }) {
  const ref = useRef(null);
  const words = text.split(' ');

  useGsapContext(() => {
    const targets = ref.current.querySelectorAll('[data-word]');
    // `gsap.set` en el efecto de layout coloca el estado inicial antes del
    // primer pintado. Así no hace falta un estilo inline en el marcado, que
    // rompería la hidratación y dejaría el texto oculto si GSAP no cargara.
    gsap.set(targets, { yPercent: 110 });
    gsap.to(targets, {
      yPercent: 0,
      duration: 0.95,
      delay,
      ease: 'power4.out',
      stagger: 0.045,
      scrollTrigger: { trigger: ref.current, start: 'top 92%', once: true },
    });
  }, [delay, text]);

  return (
    <span ref={ref} className={className}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="inline-flex overflow-hidden align-bottom"
        >
          {/* La última palabra es el remate de la frase — "rentabilidad",
              "profit" — y va en violeta en los dos idiomas sin tener que
              marcarla en la capa de contenido. */}
          <span
            data-word
            className={`inline-block ${
              accentLast && index === words.length - 1 ? 'text-accent-300' : ''
            }`}
          >
            {word}
          </span>
          {index < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}
