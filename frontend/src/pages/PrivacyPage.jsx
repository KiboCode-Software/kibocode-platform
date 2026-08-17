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
      <header className="border-b border-ink-700 bg-ink-900">
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
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-silver-400 sm:text-xs sm:tracking-[0.25em]">
              {eyebrow}
            </p>
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-silver-100 sm:text-4xl">
              {title}
            </h1>
            <p className="mt-3 text-base text-silver-400 sm:text-lg">{subtitle}</p>
            <p className="mt-2 text-xs text-silver-400/70">{lastUpdated}</p>

            <p className="mt-10 border-l border-silver-400 pl-5 text-base leading-relaxed text-silver-100 sm:pl-6">
              {intro}
            </p>

            <div className="mt-12 space-y-10">
              {blocks.map((block) => (
                <section key={block.heading} className="border-t border-ink-700 pt-7">
                  <h2 className="text-lg font-semibold text-silver-100">
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
                          className="flex gap-3 text-sm leading-relaxed text-silver-400 sm:text-base"
                        >
                          <span aria-hidden="true" className="text-silver-400/60">
                            —
                          </span>
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
