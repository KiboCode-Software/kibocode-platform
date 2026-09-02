import { Reveal } from '../motion/Reveal.jsx';

/**
 * Cabecera de sección.
 *
 * El cuadrado violeta del antetítulo es el marcador de posición de la ruta:
 * el mismo que aparece sobre la traza de la metodología. Es lo que enlaza
 * visualmente todas las secciones sin repetir un adorno distinto en cada una.
 */
export function SectionHeader({ eyebrow, title, subtitle, align = 'left' }) {
  const centered = align === 'center';

  return (
    <Reveal
      as="header"
      stagger={0.1}
      className={`mb-12 md:mb-16 ${centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}`}
    >
      {eyebrow && (
        <p
          className={`label mb-6 flex items-center gap-3 text-silver-400 ${centered ? 'justify-center' : ''}`}
        >
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 shrink-0 bg-accent-500"
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
