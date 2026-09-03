/**
 * Campos del formulario.
 *
 * La etiqueta va en mono con versalitas: es el único punto de la página
 * donde el visitante introduce datos, y la voz de datos de esta marca es la
 * mono.
 *
 * Tres estados visibles, no uno: en reposo el campo es un rectángulo hundido;
 * al enfocarlo se dibuja un filo violeta debajo y la etiqueta se enciende; al
 * quedar relleno aparece un tic violeta a la derecha de la etiqueta. Así el
 * formulario responde a cada pulsación en vez de esperar callado hasta el
 * final.
 */
const baseInputStyles =
  'w-full border border-ink-700 bg-ink-1000 px-4 py-3.5 text-sm text-silver-100 transition-colors duration-200 placeholder:text-silver-500 hover:border-ink-500 focus:border-accent-500/60 focus:outline-none';

export function TextField({ id, label, error, ...props }) {
  return (
    <FieldWrapper id={id} label={label} error={error} value={props.value}>
      <input id={id} name={id} className={baseInputStyles} {...props} />
    </FieldWrapper>
  );
}

export function TextAreaField({ id, label, error, rows = 4, ...props }) {
  return (
    <FieldWrapper id={id} label={label} error={error} value={props.value}>
      <textarea
        id={id}
        name={id}
        rows={rows}
        className={`${baseInputStyles} resize-none`}
        {...props}
      />
    </FieldWrapper>
  );
}

function FieldWrapper({ id, label, error, value, children }) {
  const relleno = typeof value === 'string' && value.trim().length > 0;

  return (
    <div className="campo group/campo relative">
      <label
        htmlFor={id}
        className="label mb-3 flex items-center gap-2 text-silver-400 transition-colors duration-300 group-focus-within/campo:text-accent-300"
      >
        {label}
        <span
          aria-hidden="true"
          className={`text-accent-500 transition-all duration-300 ${
            relleno ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
          }`}
        >
          ✓
        </span>
      </label>

      {children}

      {error && <p className="mt-2 text-xs text-accent-300">{error}</p>}
    </div>
  );
}
