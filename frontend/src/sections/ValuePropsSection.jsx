import { Section } from '../components/layout/Section.jsx';
import { SectionHeader } from '../components/ui/SectionHeader.jsx';
import { Reveal } from '../components/motion/Reveal.jsx';
import { useContent } from '../i18n/LanguageContext.jsx';

export function ValuePropsSection() {
  const { valuePropsContent } = useContent();
  const { id, eyebrow, title, items } = valuePropsContent;

  return (
    <Section id={id} className="bg-ink-800">
      <SectionHeader eyebrow={eyebrow} title={title} />

      <div className="space-y-8 md:space-y-10">
        {items.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.1}>
            <article className="group grid gap-3 border-t border-ink-600 pt-7 transition-colors duration-500 hover:border-silver-500 md:pt-8 lg:grid-cols-[280px_1fr] lg:gap-12">
              <h3 className="flex items-start gap-3 text-lg font-semibold text-silver-100">
                <span
                  aria-hidden="true"
                  className="mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 border border-silver-500 transition-all duration-500 group-hover:bg-silver-300"
                />
                {item.title}
              </h3>
              <p className="max-w-2xl text-sm leading-relaxed text-silver-400 md:text-base">
                {item.description}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
