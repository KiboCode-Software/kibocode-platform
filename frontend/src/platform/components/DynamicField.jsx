import { TextAreaField, TextField } from '../../components/ui/FormField.jsx';

/**
 * Renderiza un campo a partir de su definición en `DocumentTemplate.fields`.
 * Añadir un tipo nuevo en el backend solo requiere extender este switch.
 */
export function DynamicField({ field, value, onChange }) {
  const handle = (event) => onChange(field.key, event.target.value);

  if (field.type === 'table') {
    return <TableField field={field} value={value || []} onChange={onChange} />;
  }

  if (field.type === 'textarea') {
    return (
      <TextAreaField
        id={field.key}
        label={field.label}
        value={value ?? ''}
        onChange={handle}
        rows={4}
        required={field.required}
      />
    );
  }

  return (
    <TextField
      id={field.key}
      type={field.type === 'date' ? 'date' : 'text'}
      label={field.label}
      value={value ?? ''}
      onChange={handle}
      required={field.required}
    />
  );
}

function TableField({ field, value, onChange }) {
  const rows = value.length ? value : Array.from({ length: field.min_rows || 1 }, () => ({}));

  const updateCell = (rowIndex, columnKey, cellValue) => {
    const next = rows.map((row, index) =>
      index === rowIndex ? { ...row, [columnKey]: cellValue } : row,
    );
    onChange(field.key, next);
  };

  const addRow = () => onChange(field.key, [...rows, {}]);

  const removeRow = (rowIndex) =>
    onChange(
      field.key,
      rows.filter((_, index) => index !== rowIndex),
    );

  return (
    <div>
      <p className="mb-2 block text-xs font-medium uppercase tracking-wider text-silver-400">
        {field.label}
      </p>
      <div className="space-y-3">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="grid gap-3 border border-ink-700 bg-ink-900 p-4 md:grid-cols-3"
          >
            {field.columns.map((column) => (
              <label key={column.key} className="block">
                <span className="mb-1.5 block text-[11px] uppercase tracking-wider text-silver-400">
                  {column.label}
                </span>
                <input
                  value={row[column.key] ?? ''}
                  onChange={(event) => updateCell(rowIndex, column.key, event.target.value)}
                  className="w-full border border-ink-700 bg-ink-800 px-3 py-2.5 text-sm text-silver-100 focus:border-silver-400 focus:outline-none"
                />
              </label>
            ))}
            {rows.length > 1 && (
              <button
                type="button"
                onClick={() => removeRow(rowIndex)}
                className="justify-self-start text-xs text-silver-400 underline underline-offset-4 hover:text-silver-100 md:col-span-3"
              >
                Quitar esta fila
              </button>
            )}
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addRow}
        className="mt-3 border border-ink-700 px-4 py-2.5 text-sm text-silver-400 transition-colors duration-200 hover:border-silver-400 hover:text-silver-100"
      >
        + Agregar fila
      </button>
    </div>
  );
}
