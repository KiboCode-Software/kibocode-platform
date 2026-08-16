import { Section } from '../components/layout/Section.jsx';
import { SectionHeader } from '../components/ui/SectionHeader.jsx';
import { Reveal } from '../components/motion/Reveal.jsx';
import { servicesContent } from '../content/landing.content.js';

export function ServicesSection() {
  const { id, eyebrow, title, items } = servicesContent;

  return (
    <Section id={id} className="relative bg-ink-800">
      <div
        aria-hidden="true"
        className="grid-backdrop pointer-events-none absolute inset-0 opacity-60"
      />
      <div className="relative">
        <SectionHeader eyebrow={eyebrow} title={title} />

        <div className="grid gap-px border border-ink-700 bg-ink-700 lg:grid-cols-3">
          {items.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.1} className="bg-ink-950">
              <article className="corner-marks group relative flex h-full flex-col p-7 transition-colors duration-500 hover:bg-ink-900 sm:p-9 lg:p-10">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-linear-to-r from-silver-300 to-transparent transition-transform duration-700 group-hover:scale-x-100"
                />
                <h3 className="text-lg font-semibold text-silver-100">{service.title}</h3>

                <p className="mt-5 border-l border-ink-600 pl-4 text-sm leading-relaxed text-silver-500">
                  {service.problem}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-silver-400">
                  {service.description}
                </p>

                <p className="mt-auto flex items-start gap-2.5 border-t border-ink-700 pt-5 text-sm font-medium text-silver-100">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1 w-1 shrink-0 rotate-45 bg-silver-400 transition-colors duration-500 group-hover:bg-silver-100"
                  />
                  {service.result}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
