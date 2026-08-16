import { Container } from '../ui/Container.jsx';
import { siteConfig, routes } from '../../config/site.config.js';

export function Footer() {
  return (
    <footer className="border-t border-ink-700 py-10">
      <Container className="flex flex-col items-start justify-between gap-2 md:flex-row md:items-center md:gap-4">
        <p className="text-sm leading-relaxed text-silver-400">
          © {new Date().getFullYear()} {siteConfig.name}. Ingeniería de software a medida.
        </p>
        <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-6">
          <a
            href={routes.privacy}
            className="py-3 text-sm leading-relaxed text-silver-400 transition-colors duration-200 hover:text-silver-100"
          >
            Aviso de Privacidad
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
