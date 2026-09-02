import { Section } from '../components/layout/Section.jsx';
import { SectionHeader } from '../components/ui/SectionHeader.jsx';
import { Reveal } from '../components/motion/Reveal.jsx';
import { useContent } from '../i18n/LanguageContext.jsx';

/**
 * Los tres servicios.
 *
 * Cada tarjeta está partida en dos niveles porque eso es literalmente lo
 * que vende KiboCode: arriba, hundido y en gris, el problema; abajo,
 * encendido en violeta, el resultado. La transformación se ve en la
 * estructura de la tarjeta antes de leer una sola palabra.
 */
export function ServicesSection() {
  const { servicesContent } = useContent();
  const { id, eyebrow, title, items } = servicesContent;

  return (
    <Section id={id} tone="ground">
      <SectionHeader eyebrow={eyebrow} title={title} />

      <Reveal stagger={0.1} className="grid gap-6 lg:grid-cols-3 lg:gap-7">
        {items.map((service) => (
          <article
            key={service.title}
            className="group flex h-full flex-col border border-ink-700 bg-ink-900 transition-colors duration-500 hover:border-ink-600"
          >
            <h3 className="display-tight px-7 pt-8 text-xl font-semibold text-silver-50 md:px-8 md:pt-9">
              {service.title}
            </h3>

            {/* Nivel hundido: el problema. */}
            <p className="mx-7 mt-6 border-l border-ink-600 bg-ink-1000 px-5 py-4 text-[13px] leading-relaxed text-silver-400 md:mx-8">
              {service.problem}
            </p>

            <p className="px-7 py-6 text-sm leading-relaxed text-silver-300 md:px-8 md:py-7">
              {service.description}
            </p>

            {/* Nivel encendido: el resultado. */}
            <p className="mt-auto flex items-start gap-3 border-t border-accent-500/25 bg-accent-500/[0.07] px-7 py-6 text-sm font-medium leading-snug text-accent-300 transition-colors duration-500 group-hover:bg-accent-500/[0.12] md:px-8">
              <span
                aria-hidden="true"
                className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent-500"
              />
              {service.result}
            </p>
          </article>
        ))}
      </Reveal>
    </Section>
  );
}
