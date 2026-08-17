import { Section } from '../components/layout/Section.jsx';
import { SectionHeader } from '../components/ui/SectionHeader.jsx';
import { Reveal } from '../components/motion/Reveal.jsx';
import { useContent } from '../i18n/LanguageContext.jsx';

export function ProblemsSection() {
  const { problemsContent } = useContent();
  const { id, eyebrow, title, items, closing } = problemsContent;

  return (
    <Section id={id} className="relative">
      <SectionHeader eyebrow={eyebrow} title={title} />

      <div className="grid gap-px border border-ink-700 bg-ink-700 sm:grid-cols-2">
        {items.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.08} className="bg-ink-950">
            <article className="corner-marks group relative h-full p-7 transition-colors duration-500 hover:bg-ink-850 sm:p-8 lg:p-10">
              <span
                aria-hidden="true"
                className="mb-5 block font-mono text-xs text-silver-600 transition-colors duration-500 group-hover:text-silver-400"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="text-lg font-semibold text-silver-100">{item.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-silver-400">
                {item.description}
              </p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <p className="mt-10 max-w-3xl border-l-2 border-silver-500 pl-5 text-base leading-relaxed text-silver-200 sm:pl-6 sm:text-lg md:mt-12">
          {closing}
        </p>
      </Reveal>
    </Section>
  );
}
