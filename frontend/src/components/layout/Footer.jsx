import { Container } from '../ui/Container.jsx';
import { siteConfig } from '../../config/site.config.js';
import { useContent, useLanguage } from '../../i18n/LanguageContext.jsx';

export function Footer() {
  const { footerContent } = useContent();
  const { config } = useLanguage();

  return (
    <footer className="border-t border-ink-700 py-10">
      <Container className="flex flex-col items-start justify-between gap-2 md:flex-row md:items-center md:gap-4">
        <p className="text-sm leading-relaxed text-silver-400">
          © {new Date().getFullYear()} {siteConfig.name}. {footerContent.tagline}
        </p>
        <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-6">
          <a
            href={config.routes.privacy}
            className="py-3 text-sm leading-relaxed text-silver-400 transition-colors duration-200 hover:text-silver-100"
          >
            {footerContent.privacy}
          </a>
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="py-3 text-sm leading-relaxed text-silver-400 transition-colors duration-200 hover:text-silver-100"
          >
            {siteConfig.contactEmail}
          </a>
        </div>
      </Container>
    </footer>
  );
}
