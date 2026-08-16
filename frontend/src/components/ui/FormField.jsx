const baseInputStyles =
  'w-full border border-ink-700 bg-ink-800 px-4 py-3 text-sm text-silver-100 placeholder:text-silver-400/60 transition-colors duration-200 focus:border-silver-400 focus:outline-none';

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
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-medium uppercase tracking-wider text-silver-400"
      >
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-silver-400">{error}</p>}
    </div>
  );
}
