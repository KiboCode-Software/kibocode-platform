import { Section } from '../components/layout/Section.jsx';
import { SectionHeader } from '../components/ui/SectionHeader.jsx';
import { Reveal } from '../components/motion/Reveal.jsx';
import { useContent } from '../i18n/LanguageContext.jsx';

export function FaqSection() {
  const { faqContent } = useContent();
  const { id, eyebrow, title, items } = faqContent;

  return (
    <Section id={id}>
      <SectionHeader eyebrow={eyebrow} title={title} />

      <div className="max-w-3xl divide-y divide-ink-700 border-y border-ink-600">
        {items.map((item, index) => (
          <Reveal key={item.question} delay={index * 0.05}>
            <details className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[15px] font-medium text-silver-200 transition-colors duration-300 hover:text-silver-50 sm:gap-6 sm:py-6 sm:text-base [&::-webkit-details-marker]:hidden">
                <span className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1 w-1 shrink-0 rotate-45 bg-ink-400 transition-colors duration-300 group-open:bg-silver-300"
                  />
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className="shrink-0 text-xl font-light text-silver-500 transition-transform duration-300 group-open:rotate-45 group-open:text-silver-200"
                >
                  +
                </span>
              </summary>
              <p className="pb-6 pl-8 pr-4 text-sm leading-relaxed text-silver-400 sm:pr-10">
                {item.answer}
              </p>
            </details>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
