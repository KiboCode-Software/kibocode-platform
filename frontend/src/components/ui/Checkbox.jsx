/**
 * Casilla de verificación con área táctil amplia.
 * `children` permite incluir enlaces dentro de la etiqueta.
 */
export function Checkbox({ id, children, ...props }) {
  return (
    <div className="flex items-start gap-3 py-1">
      <input
        id={id}
        name={id}
        type="checkbox"
        className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer appearance-none border border-ink-700 bg-ink-800 transition-colors duration-200 checked:border-silver-100 checked:bg-silver-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-silver-400 checked:after:block checked:after:pl-[3px] checked:after:text-sm checked:after:leading-[18px] checked:after:text-ink-950 checked:after:content-['✓']"
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
