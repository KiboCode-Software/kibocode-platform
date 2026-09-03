import { Parallax } from '../motion/Parallax.jsx';

/**
 * El isotipo en grande, casi apagado, ocupando el hueco.
 *
 * Los márgenes de las secciones son el sitio donde más se notaba el negro
 * liso. Una marca de agua los llena con algo que ya es de la casa en vez de
 * con un adorno cualquiera, y al ir con parallax se separa del texto en
 * lugar de competir con él.
 *
 * Opacidad muy baja y `mix-blend-mode: screen` para que aclare el fondo sin
 * ensuciar el color: sobre los planos ink apenas se intuye la silueta.
 */
export function Watermark({ side = 'right', className = '' }) {
  const posicion =
    side === 'left'
      ? '-left-[18%] md:-left-[10%]'
      : '-right-[18%] md:-right-[8%]';

  return (
    <Parallax
      pixels={side === 'left' ? 190 : -160}
      className={`pointer-events-none absolute inset-y-0 hidden select-none md:block ${posicion} ${className}`}
    >
      <img
        src="/logo-mark.svg"
        alt=""
        aria-hidden="true"
        width={640}
        height={640}
        className="h-[62vh] w-auto opacity-[0.045] mix-blend-screen"
      />
    </Parallax>
  );
}
