import { siteConfig, routes } from '../../config/site.config.js';

const SIZES = {
  sm: { box: 'h-7 w-7', text: 'text-[15px]' },
  md: { box: 'h-9 w-9', text: 'text-base' },
  lg: { box: 'h-12 w-12', text: 'text-lg' },
};

/**
 * Marca de KiboCode: isotipo + nombre.
 *
 * El punto final va en violeta. Es el detalle más pequeño de la identidad
 * y el que aparece en cada esquina de la página, así que es el que fija el
 * color en la memoria antes de que se vea nada más.
 *
 * El archivo vive en `public/`, así que se referencia por ruta absoluta
 * (`/logo.png`) y no por import. Nunca desde `dist/`: esa carpeta es la
 * salida del build y se borra en cada compilación.
 */
export function Logo({ href = routes.home, size = 'md', onClick, className = '' }) {
  const { box, text } = SIZES[size] ?? SIZES.md;

  const content = (
    <>
      <span className={`relative ${box} shrink-0`}>
        {/* Halo: la marca es la fuente de luz de toda la página. */}
        <span
          aria-hidden="true"
          className="glow-mark absolute -inset-2 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100"
        />
        <img
          src="/logo.png"
          alt=""
          width={48}
          height={48}
          className="relative h-full w-full rounded-full"
        />
      </span>
      <span
        className={`display-tight font-semibold text-silver-50 ${text}`}
      >
        {siteConfig.name}
        <span className="text-accent-500">.</span>
      </span>
    </>
  );

  const classes = `group inline-flex items-center gap-2.5 ${className}`;

  if (!href) {
    return (
      <span className={classes} aria-label={siteConfig.name}>
        {content}
      </span>
    );
  }

  return (
    <a
      href={href}
      onClick={onClick}
      className={classes}
      aria-label={`${siteConfig.name} — inicio`}
    >
      {content}
    </a>
  );
}
