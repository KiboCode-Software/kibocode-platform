import { Section } from '../components/layout/Section.jsx';
import { SectionHeader } from '../components/ui/SectionHeader.jsx';
import { Reveal } from '../components/motion/Reveal.jsx';
import { useContent } from '../i18n/LanguageContext.jsx';

/**
 * Los tres compromisos.
 *
 * Es la sección donde la página promete algo, así que se queda callada:
 * sin viñetas, sin iconos, sin tarjetas. Solo el compromiso en grande a la
 * izquierda y la explicación a la derecha, separados por filetes. La única
 * concesión es el filo violeta que se enciende al pasar por encima.
 */
export function ValuePropsSection() {
  const { valuePropsContent } = useContent();
  const { id, eyebrow, title, items } = valuePropsContent;

  return (
    <Section id={id} tone="panel">
      <SectionHeader eyebrow={eyebrow} title={title} />

      <Reveal stagger={0.1}>
        {items.map((item) => (
          <article
            key={item.title}
            className="group relative grid gap-4 border-t border-ink-600 py-9 md:py-12 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-16"
          >
            <span
              aria-hidden="true"
              className="route-fill absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
            />

            <h3 className="display text-xl font-semibold leading-tight text-silver-50 md:text-2xl">
              {item.title}
            </h3>

            <p className="max-w-2xl text-sm leading-relaxed text-silver-400 md:text-base">
              {item.description}
            </p>
          </article>
        ))}
      </Reveal>
    </Section>
  );
}
