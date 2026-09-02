/* La etiqueta va en mono con versalitas: el formulario es el único punto de
   la página donde el visitante introduce datos, y la voz de datos de esta
   marca es la mono. El campo se enciende en violeta al recibir el foco. */
const baseInputStyles =
  'w-full border border-ink-700 bg-ink-1000 px-4 py-3.5 text-sm text-silver-100 transition-colors duration-200 placeholder:text-silver-500 hover:border-ink-500 focus:border-accent-500 focus:outline-none';

export function TextField({ id, label, error, ...props }) {
  return (
    <FieldWrapper id={id} label={label} error={error}>
      <input id={id} name={id} className={baseInputStyles} {...props} />
    </FieldWrapper>
  );
}

export function TextAreaField({ id, label, error, rows = 4, ...props }) {
  return (
    <FieldWrapper id={id} label={label} error={error}>
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

function FieldWrapper({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="label mb-3 block text-silver-400">
        {label}
      </label>
      {children}
      {error && <p className="mt-2 text-xs text-accent-300">{error}</p>}
    </div>
  );
}
