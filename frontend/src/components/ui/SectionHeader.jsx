import { Reveal } from '../motion/Reveal.jsx';
import { gsap } from '../../lib/gsap.js';
import { useGsapContext } from '../../hooks/useGsap.js';

/**
 * Cabecera de sección.
 *
 * El cuadrado violeta y el guion que sale de él son el marcador de posición
 * de la ruta: los mismos que aparecen sobre la traza de la metodología. El
 * guion se dibuja al entrar la sección, así que cada cabecera repite en
 * pequeño el gesto del elemento firma en vez de estrenar un adorno propio.
 */
export function SectionHeader({ eyebrow, title, subtitle, align = 'left' }) {
  const centered = align === 'center';

  const scope = useGsapContext(() => {
    const guion = scope.current?.querySelector('[data-guion]');
    if (!guion) return;

    gsap.from(guion, {
      scaleX: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: scope.current, start: 'top 88%', once: true },
    });
  }, [eyebrow]);

  return (
    <Reveal
      as="header"
      stagger={0.1}
      className={`mb-12 md:mb-16 ${centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}`}
    >
      {eyebrow && (
        <p
          ref={scope}
          className={`label mb-6 flex items-center gap-3 text-silver-400 ${centered ? 'justify-center' : ''}`}
        >
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 shrink-0 bg-accent-500"
          />
          <span
            data-guion
            aria-hidden="true"
            className="h-px w-5 shrink-0 origin-left bg-accent-500/60"
          />
          {eyebrow}
        </p>
      )}

      {/* Los titulares de sección son frases largas: por encima de 2,4rem
          se comen cinco líneas y aplastan el contenido que viene detrás.
          El tamaño grande se reserva para la portada. */}
      <h2 className="display text-[1.6rem] font-semibold leading-[1.12] text-silver-50 sm:text-[1.9rem] md:text-[2.2rem] lg:text-[2.4rem]">
        {title}
      </h2>

      {subtitle && (
        <p
          className={`mt-6 text-base leading-relaxed text-silver-400 md:text-lg ${centered ? 'mx-auto max-w-2xl' : 'max-w-2xl'}`}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
