import { Section } from '../components/layout/Section.jsx';
import { SectionHeader } from '../components/ui/SectionHeader.jsx';
import { Reveal } from '../components/motion/Reveal.jsx';
import { Parallax } from '../components/motion/Parallax.jsx';
import { useContent } from '../i18n/LanguageContext.jsx';

export function MethodologySection() {
  const { methodologyContent } = useContent();
  const { id, eyebrow, title, steps } = methodologyContent;

  return (
    <Section id={id} className="relative overflow-hidden">
      {/* Número gigante de fondo, con parallax: da escala y profundidad. */}
      <Parallax
        speed={0.15}
        className="pointer-events-none absolute -right-10 top-10 select-none"
      >
        <span
          aria-hidden="true"
          className="font-mono text-[10rem] font-bold leading-none text-ink-850 md:text-[16rem]"
        >
          03
        </span>
      </Parallax>

      <div className="relative">
        <SectionHeader eyebrow={eyebrow} title={title} />

        <ol className="grid gap-10 sm:gap-12 lg:grid-cols-3 lg:gap-10">
          {steps.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.12}>
              <li className="group flex h-full flex-col border-t border-ink-600 pt-8">
                <span
                  aria-hidden="true"
                  className="mb-6 block h-px w-0 bg-silver-300 transition-all duration-700 group-hover:w-16"
                />
                <span className="font-mono text-sm tracking-widest text-silver-500 transition-colors duration-500 group-hover:text-silver-200">
                  {step.number}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-silver-100">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-silver-400">
                  {step.description}
                </p>
                <p className="mt-6 border-l-2 border-ink-500 pl-4 text-sm font-medium leading-relaxed text-silver-200 transition-colors duration-500 group-hover:border-silver-500">
                  {step.deliverable}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
