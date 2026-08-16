import { siteConfig, routes } from '../../config/site.config.js';

/**
 * Marca de KiboCode: isotipo + nombre.
 *
 * El archivo vive en `public/`, así que se referencia por ruta absoluta
 * (`/logo.png`) y no por import. Nunca desde `dist/`: esa carpeta es la
 * salida del build y se borra en cada compilación.
 */
export function Logo({ href = routes.home, size = 'md', onClick, className = '' }) {
  const dimensions = size === 'sm' ? 'h-7 w-7' : 'h-9 w-9';

  const content = (
    <>
      <img
        src="/logo.png"
        alt=""
        width={36}
        height={36}
        className={`${dimensions} shrink-0 rounded-full`}
      />
      <span className="text-base font-semibold tracking-tight text-silver-50">
        {siteConfig.name}
        <span className="text-silver-400">.</span>
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
    <a href={href} onClick={onClick} className={classes} aria-label={`${siteConfig.name} — inicio`}>
      {content}
    </a>
  );
}
