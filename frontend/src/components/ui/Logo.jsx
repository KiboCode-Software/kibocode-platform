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
 * Aquí va la marca sin disco: sobre los fondos ink el círculo negro no
 * aporta nada y solo le quita aire. El disco se reserva para donde el fondo
 * no lo controlamos — la pestaña del navegador, el icono de iOS y la
 * cabecera de los PDF, que van sobre papel blanco.
 *
 * Es vectorial: aparece desde 28 px en el pie hasta 80 px en la portada, y
 * al doble en pantallas retina. Vive en `public/`, así que se referencia por
 * ruta absoluta y no por import. Nunca desde `dist/`: esa carpeta es la
 * salida del build y se borra al compilar.
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
          src="/logo-mark.svg"
          alt=""
          width={48}
          height={48}
          className="relative h-full w-full"
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
