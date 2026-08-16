import { Container } from '../ui/Container.jsx';

/**
 * Envoltorio estándar de sección: espaciado vertical amplio,
 * borde superior sutil de 1px y fondo configurable.
 *
 * `scroll-mt-16` compensa la altura del navbar fijo al saltar por anclas.
 */
export function Section({ id, className = '', bordered = true, children }) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 py-20 md:py-28 lg:py-32 ${bordered ? 'border-t border-ink-700' : ''} ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}
