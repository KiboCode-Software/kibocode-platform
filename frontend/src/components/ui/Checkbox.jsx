/**
 * Casilla de verificación con área táctil amplia.
 *
 * Marcada se llena de violeta con el tic en oscuro — el mismo par de
 * colores del botón principal, por la misma razón de contraste.
 * `children` permite incluir enlaces dentro de la etiqueta.
 */
export function Checkbox({ id, children, ...props }) {
  return (
    <div className="flex items-start gap-3 py-1">
      <input
        id={id}
        name={id}
        type="checkbox"
        className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer appearance-none border border-ink-600 bg-ink-1000 transition-colors duration-200 hover:border-ink-500 checked:border-accent-500 checked:bg-accent-500 checked:after:block checked:after:pl-[3px] checked:after:text-sm checked:after:leading-[18px] checked:after:text-ink-950 checked:after:content-['✓']"
        {...props}
      />
      <label
        htmlFor={id}
        className="cursor-pointer text-sm leading-relaxed text-silver-400"
      >
        {children}
      </label>
    </div>
  );
}
