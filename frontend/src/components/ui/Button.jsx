// El sólido lleva texto oscuro, no blanco: sobre el violeta de marca el blanco
// se queda en 3.9:1 y este botón es texto normal (14px), que exige 4.5:1. Y el
// hover aclara en vez de oscurecer, porque con texto oscuro es al revés.
const VARIANTS = {
  solid:
    'bg-accent-500 text-ink-950 hover:bg-accent-300 focus-visible:outline-accent-300',
  outline:
    'border border-ink-700 text-silver-100 hover:border-accent-500 hover:text-accent-300 focus-visible:outline-silver-400',
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
      className={`inline-flex min-h-[48px] items-center justify-center px-6 py-3.5 text-center text-sm font-medium tracking-wide transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:px-7 ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
