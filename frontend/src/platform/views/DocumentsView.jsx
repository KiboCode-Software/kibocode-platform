import { useEffect, useState } from 'react';

import { documentsApi } from '../api/platform.api.js';

const STYLE_LABEL = {
  legal: 'Documento legal',
  comercial: 'Material comercial',
};

export function DocumentsView({ onOpenTemplate }) {
  const [templates, setTemplates] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    documentsApi
      .templates()
      .then(setTemplates)
      .catch(() => setError('No se pudieron cargar las plantillas.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <header className="mb-10">
        <h1 className="text-2xl font-semibold text-silver-100 sm:text-3xl">Documentos</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-silver-400">
          Elige una plantilla, selecciona el cliente y llena solo los campos variables.
          El diseño ya está resuelto: el PDF sale listo para enviar.
        </p>
      </header>

      {loading && <p className="text-sm text-silver-400">Cargando plantillas…</p>}
      {error && (
        <p className="border border-ink-700 bg-ink-800 px-4 py-3 text-sm text-silver-100">
          {error}
        </p>
      )}

      <div className="grid gap-px border border-ink-700 bg-ink-700 sm:grid-cols-2 xl:grid-cols-4">
        {templates.map((template) => (
          <button
            key={template.id}
            type="button"
            onClick={() => onOpenTemplate(template)}
            className="group flex h-full flex-col bg-ink-950 p-7 text-left transition-colors duration-300 hover:bg-ink-800"
          >
            <DocumentPreview style={template.style} />
            <h2 className="mt-6 text-base font-semibold text-silver-100">{template.name}</h2>
            <p className="mt-3 text-sm leading-relaxed text-silver-400">
              {template.description}
            </p>
            <span className="mt-auto pt-6 text-xs uppercase tracking-[0.15em] text-silver-400">
              {STYLE_LABEL[template.style]} →
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/** Miniatura que insinúa la hoja: clara para legal, oscura para comercial. */
function DocumentPreview({ style }) {
  const isLegal = style === 'legal';
  return (
    <div
      className={`flex h-28 w-20 flex-col gap-1.5 border p-2.5 ${
        isLegal ? 'border-ink-700 bg-[#f4f4f4]' : 'border-ink-700 bg-ink-900'
      }`}
    >
      <div className={`h-1.5 w-8 ${isLegal ? 'bg-[#1f1f1f]' : 'bg-silver-100'}`} />
      <div className={`h-px w-full ${isLegal ? 'bg-[#d8d8d8]' : 'bg-ink-700'}`} />
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className={`h-1 ${isLegal ? 'bg-[#dcdcdc]' : 'bg-ink-700'}`}
          style={{ width: `${index === 4 ? 55 : 100}%` }}
        />
      ))}
    </div>
  );
}
