import { Container } from '../ui/Container.jsx';

/**
 * Envoltorio estándar de sección.
 *
 * `tone` alterna la profundidad del plano en vez de separar las secciones
 * con líneas: el ojo lee el cambio de nivel antes que un filete de 1px, y
 * la página gana relieve sin añadir más bordes.
 *
 * `scroll-mt` compensa la altura de la barra fija al saltar por anclas.
 */
const TONES = {
  ground: 'bg-ink-950',
  raised: 'bg-ink-900',
  panel: 'bg-ink-800',
};

export function Section({
  id,
  tone = 'ground',
  texture = false,
  glow = false,
  className = '',
  children,
}) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-20 py-18 md:py-24 lg:py-28 ${TONES[tone] ?? TONES.ground} ${className}`}
    >
      {texture && (
        <div
          aria-hidden="true"
          className="topo fade-edges pointer-events-none absolute inset-0"
        />
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
