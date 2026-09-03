import { Section } from '../components/layout/Section.jsx';
import { SectionHeader } from '../components/ui/SectionHeader.jsx';
import { Reveal } from '../components/motion/Reveal.jsx';
import { useContent } from '../i18n/LanguageContext.jsx';

/**
 * Preguntas frecuentes.
 *
 * `<details>` nativo: funciona sin JavaScript, se puede abrir con teclado y
 * el buscador lee la respuesta aunque esté plegada. Al abrirse, el filete
 * izquierdo se pone violeta — señala dónde está el lector, igual que el
 * marcador de cada sección.
 */
export function FaqSection() {
  const { faqContent } = useContent();
  const { id, eyebrow, title, items } = faqContent;

  return (
    <Section id={id} tone="ground" texture="topo">
      <SectionHeader eyebrow={eyebrow} title={title} />

      <Reveal stagger={0.06} className="max-w-4xl">
        {items.map((item) => (
          <details
            key={item.question}
            className="group border-t border-ink-700 last:border-b"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-7 text-base font-medium text-silver-200 transition-colors duration-300 hover:text-silver-50 sm:text-lg md:py-8">
              <span className="display-tight border-l-2 border-transparent pl-5 transition-colors duration-300 group-open:border-accent-500">
                {item.question}
              </span>
              <span
                aria-hidden="true"
                className="shrink-0 text-3xl font-light leading-none text-silver-600 transition-all duration-300 group-open:rotate-45 group-open:text-accent-300"
              >
                +
              </span>
            </summary>

            <p className="max-w-3xl pb-8 pl-5 pr-4 text-sm leading-relaxed text-silver-400 sm:pr-10 sm:text-[15px]">
              {item.answer}
            </p>
          </details>
        ))}
      </Reveal>
    </Section>
  );
}
