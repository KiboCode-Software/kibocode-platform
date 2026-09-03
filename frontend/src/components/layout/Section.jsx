import { Container } from '../ui/Container.jsx';
import { Parallax } from '../motion/Parallax.jsx';

/**
 * Envoltorio estándar de sección.
 *
 * `tone` alterna la profundidad del plano en vez de separar las secciones
 * con líneas: el ojo lee el cambio de nivel antes que un filete de 1px, y
 * la página gana relieve sin añadir más bordes.
 *
 * Translúcidos a propósito: el campo de luz violeta va fijo detrás de toda
 * la página y tiene que atravesarlas. Con el fondo opaco cada sección lo
 * tapaba y la atmósfera se cortaba en cada plano.
 *
 * `scroll-mt` compensa la altura de la barra fija al saltar por anclas.
 */
const TONES = {
  ground: 'bg-ink-950/75',
  raised: 'bg-ink-900/75',
  panel: 'bg-ink-800/80',
};

/**
 * Tramas de fondo. Ninguna sección se queda en negro liso: alternarlas
 * evita que dos vecinas tengan el mismo grano y que la página se lea como
 * una sola superficie vacía.
 *
 * `topo` va enmascarada hacia los bordes y `malla`/`trama` hacia el centro,
 * que es donde vive el texto.
 */
const TEXTURAS = {
  topo: { clase: 'topo fade-edges', recorrido: 110 },
  malla: { clase: 'malla fade-center', recorrido: 80 },
  trama: { clase: 'trama fade-center', recorrido: 140 },
};

export function Section({
  id,
  tone = 'ground',
  texture = false,
  glow = false,
  className = '',
  children,
}) {
  const trama = TEXTURAS[texture === true ? 'topo' : texture];

  return (
    <section
      id={id}
      className={`relative overflow-hidden scroll-mt-20 py-18 md:py-24 lg:py-28 ${TONES[tone] ?? TONES.ground} ${className}`}
    >
      {/* La trama se queda atrás respecto al texto: es lo que hace que el
          fondo se lea como fondo y no como parte de la hoja. El sangrado
          vertical extra evita que asome el borde al desplazarse. */}
      {trama && (
        <Parallax
          pixels={trama.recorrido}
          className="pointer-events-none absolute inset-0"
        >
          <div
            aria-hidden="true"
            className={`absolute inset-x-0 -inset-y-32 ${trama.clase}`}
          />
        </Parallax>
      )}

      {/* El halo va fuera del contenedor para que llegue de borde a borde. */}
      {glow && (
        <div
          aria-hidden="true"
          className="glow-horizon pointer-events-none absolute inset-x-0 bottom-0 h-[560px]"
        />
      )}
      <Container className="relative">{children}</Container>
    </section>
  );
}
