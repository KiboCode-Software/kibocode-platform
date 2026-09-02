import { Container } from '../components/ui/Container.jsx';
import { Logo } from '../components/ui/Logo.jsx';
import { Footer } from '../components/layout/Footer.jsx';
import { LanguageSwitcher } from '../components/ui/LanguageSwitcher.jsx';
import { useContent, useLanguage } from '../i18n/LanguageContext.jsx';

export function PrivacyPage() {
  const { privacyContent } = useContent();
  const { config } = useLanguage();
  const { eyebrow, title, subtitle, intro, lastUpdated, backLabel, blocks } =
    privacyContent;

  return (
    <>
      <header className="border-b border-ink-700 bg-ink-950">
        <Container className="flex h-16 items-center justify-between">
          <Logo href={config.routes.home} className="-ml-1 px-1 py-3" />
          <div className="flex items-center gap-5">
            <LanguageSwitcher />
            <a
              href={config.routes.home}
              className="py-3 text-sm text-silver-400 transition-colors duration-200 hover:text-silver-100"
            >
              ← {backLabel}
            </a>
          </div>
        </Container>
      </header>

      <main className="py-16 md:py-24">
        <Container>
          <article className="max-w-3xl">
            <p className="label mb-5 flex items-center gap-3 text-silver-400">
              <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 bg-accent-500" />
              {eyebrow}
            </p>
            <h1 className="display text-3xl font-semibold leading-[1.1] text-silver-50 sm:text-4xl md:text-5xl">
              {title}
            </h1>
            <p className="mt-4 text-base text-silver-400 sm:text-lg">{subtitle}</p>
            <p className="mt-2 font-mono text-xs text-silver-400">{lastUpdated}</p>

            <p className="mt-10 border-l-2 border-accent-500 pl-5 text-base leading-relaxed text-silver-100 sm:pl-6">
              {intro}
            </p>

            <div className="mt-12 space-y-10">
              {blocks.map((block) => (
                <section key={block.heading} className="border-t border-ink-700 pt-7">
                  <h2 className="display-tight text-lg font-semibold text-silver-50 md:text-xl">
                    {block.heading}
                  </h2>
                  {block.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="mt-3 text-sm leading-relaxed text-silver-400 sm:text-base"
                    >
                      {paragraph}
                    </p>
                  ))}
                  {block.list && (
                    <ul className="mt-4 space-y-2.5">
                      {block.list.map((item) => (
                        <li
                          key={item}
                          className="flex gap-3.5 text-sm leading-relaxed text-silver-400 sm:text-base"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent-500"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          </article>
        </Container>
      </main>

      <Footer />
    </>
  );
}
