/**
 * Botón de la landing.
 *
 * El sólido es la única superficie grande de violeta de toda la página, y
 * lleva texto oscuro, no blanco: sobre accent-500 el blanco se queda en
 * 3,96:1 y esto es texto de 14px, que exige 4,5:1. Con ink-950 sube a
 * 4,84:1. Por eso el hover aclara en vez de oscurecer.
 */
const VARIANTS = {
  solid:
    'bg-accent-500 text-ink-950 shadow-[0_0_0_0_rgba(168,85,247,0)] hover:bg-accent-300 hover:shadow-[0_8px_40px_-8px_rgba(168,85,247,0.55)]',
  outline:
    'border border-ink-600 text-silver-100 hover:border-accent-500 hover:bg-accent-500/6 hover:text-accent-300',
};

export function Button({
  as: Tag = 'button',
  variant = 'solid',
  className = '',
  children,
  ...props
}) {
  return (
    <Tag
      className={`group/btn inline-flex min-h-[52px] items-center justify-center gap-2.5 px-7 py-4 text-center text-sm font-semibold tracking-wide transition-all duration-300 sm:px-8 ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}

/**
 * Enlace con flecha que avanza al pasar el cursor. Para las acciones
 * secundarias que no merecen el peso de un botón.
 *
 * `py-3` no es aire decorativo: sin él la zona pulsable medía 20 px de alto
 * y en un teléfono había que apuntar. El mínimo cómodo son 44.
 */
export function ArrowLink({ children, className = '', ...props }) {
  return (
    <a
      className={`group/link inline-flex min-h-[44px] items-center gap-2 py-3 text-sm text-silver-300 transition-colors duration-300 hover:text-accent-300 ${className}`}
      {...props}
    >
      {children}
      <span
        aria-hidden="true"
        className="transition-transform duration-300 group-hover/link:translate-x-1"
      >
        →
      </span>
    </a>
  );
}
