import { useEffect, useState } from 'react';
import { Container } from '../ui/Container.jsx';
import { ScrollProgress } from '../motion/ScrollProgress.jsx';
import { Logo } from '../ui/Logo.jsx';
import { LanguageSwitcher } from '../ui/LanguageSwitcher.jsx';
import { useActiveSection } from '../../hooks/useActiveSection.js';
import { useContent, useLanguage } from '../../i18n/LanguageContext.jsx';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { navLinks } = useContent();
  const { config } = useLanguage();
  const activo = useActiveSection(navLinks.map((link) => link.href));

  // Bloquea el scroll del fondo mientras el menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Cierra el menú si la pantalla crece hasta el layout de escritorio
  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)');
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

        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={link.href === activo ? 'true' : undefined}
              className={`group relative flex items-center text-sm transition-colors duration-300 hover:text-silver-50 ${
                link.href === activo ? 'text-silver-50' : 'text-silver-400'
              }`}
            >
              {/* El mismo cuadrado violeta que abre cada sección. Se enciende
                  al pasar el cursor y se queda encendido en la sección que
                  se está leyendo: dice dónde estás, no solo dónde apuntas. */}
              <span
                aria-hidden="true"
                className={`absolute -left-3 h-1 w-1 bg-accent-500 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 ${
                  link.href === activo
                    ? 'translate-x-0 opacity-100'
                    : '-translate-x-1 opacity-0'
                }`}
              />
              {link.label}
            </a>
          ))}
          <LanguageSwitcher className="border-l border-ink-700 pl-6" />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
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
        className="menu-panel border-t border-ink-700 bg-ink-950 lg:hidden"
      >
        <Container className="flex flex-col py-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              aria-current={link.href === activo ? 'true' : undefined}
              className={`flex items-center gap-3 border-b border-ink-800 py-4 text-base transition-colors duration-200 last:border-b-0 hover:text-silver-50 ${
                link.href === activo ? 'text-silver-50' : 'text-silver-300'
              }`}
            >
              <span
                aria-hidden="true"
                className={`h-1 w-1 shrink-0 transition-colors duration-300 ${
                  link.href === activo ? 'bg-accent-500' : 'bg-ink-500'
                }`}
              />
              {link.label}
            </a>
          ))}
        </Container>
      </div>

      <ScrollProgress />
    </nav>
  );
}
