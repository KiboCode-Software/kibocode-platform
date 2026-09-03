import { Container } from '../ui/Container.jsx';
import { Logo } from '../ui/Logo.jsx';
import { siteConfig } from '../../config/site.config.js';
import { useContent, useLanguage } from '../../i18n/LanguageContext.jsx';

export function Footer() {
  const { footerContent } = useContent();
  const { config } = useLanguage();

  return (
    <footer className="relative border-t border-ink-700 bg-ink-1000/80 py-12 md:py-14">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <Logo href={config.routes.home} size="sm" className="min-h-[44px] py-2" />

          <nav className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-8">
            <a
              href={config.routes.privacy}
              className="inline-flex min-h-[44px] items-center py-3 text-sm text-silver-400 transition-colors duration-200 hover:text-accent-300"
            >
              {footerContent.privacy}
            </a>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="inline-flex min-h-[44px] items-center py-3 text-sm text-silver-400 transition-colors duration-200 hover:text-accent-300"
            >
              {siteConfig.contactEmail}
            </a>
          </nav>
        </div>

        <p className="mt-10 border-t border-ink-800 pt-6 text-xs text-silver-400">
          © {new Date().getFullYear()} {siteConfig.name}. {footerContent.tagline}
        </p>
      </Container>
    </footer>
  );
}
