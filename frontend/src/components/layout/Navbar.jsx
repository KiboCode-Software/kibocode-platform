import { useEffect, useState } from 'react';
import { Container } from '../ui/Container.jsx';
import { ScrollProgress } from '../motion/ScrollProgress.jsx';
import { Logo } from '../ui/Logo.jsx';
import { LanguageSwitcher } from '../ui/LanguageSwitcher.jsx';
import { useContent, useLanguage } from '../../i18n/LanguageContext.jsx';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { navLinks } = useContent();
  const { config } = useLanguage();

  // Bloquea el scroll del fondo mientras el menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Cierra el menú si la pantalla crece hasta el layout de escritorio
  useEffect(() => {
    const query = window.matchMedia('(min-width: 768px)');
    const close = (event) => event.matches && setOpen(false);
    query.addEventListener('change', close);
    return () => query.removeEventListener('change', close);
  }, []);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-ink-700/80 bg-ink-950/80 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between">
        <Logo
          href={config.routes.home}
          onClick={() => setOpen(false)}
          className="-ml-1 px-1 py-3"
        />

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative flex items-center text-sm text-silver-400 transition-colors duration-300 hover:text-silver-50"
            >
              {/* El mismo cuadrado violeta que marca cada sección: al pasar
                  el cursor, el enlace se señala como un punto de la ruta. */}
              <span
                aria-hidden="true"
                className="absolute -left-3 h-1 w-1 -translate-x-1 bg-accent-500 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
              />
              {link.label}
            </a>
          ))}
          <LanguageSwitcher className="border-l border-ink-700 pl-6" />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            className="-mr-3 flex h-12 w-12 items-center justify-center text-silver-100"
          >
            <span className="relative block h-4 w-6" aria-hidden="true">
              <span
                className={`absolute left-0 block h-px w-6 bg-current transition-transform duration-300 ${
                  open ? 'top-2 rotate-45' : 'top-0.5'
                }`}
              />
              <span
                className={`absolute left-0 top-2 block h-px w-6 bg-current transition-opacity duration-200 ${
                  open ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-6 bg-current transition-transform duration-300 ${
                  open ? 'top-2 -rotate-45' : 'top-3.5'
                }`}
              />
            </span>
          </button>
        </div>
      </Container>

      <div
        id="menu-movil"
        hidden={!open}
        className="menu-panel border-t border-ink-700 bg-ink-950 md:hidden"
      >
        <Container className="flex flex-col py-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 border-b border-ink-800 py-4 text-base text-silver-300 transition-colors duration-200 last:border-b-0 hover:text-silver-50"
            >
              <span aria-hidden="true" className="h-1 w-1 shrink-0 bg-accent-500" />
              {link.label}
            </a>
          ))}
        </Container>
      </div>

      <ScrollProgress />
    </nav>
  );
}
