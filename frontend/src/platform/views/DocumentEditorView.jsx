import { useEffect, useMemo, useState } from 'react';

import { Button } from '../../components/ui/Button.jsx';
import { clientsApi, documentsApi } from '../api/platform.api.js';
import { DynamicField } from '../components/DynamicField.jsx';
import { PreviewModal } from '../components/PreviewModal.jsx';

/**
 * Flujo de generación: elegir cliente → llenar campos → generar PDF.
 * Los valores quedan guardados como `ClientDocument` para poder volver
 * a descargar el documento sin rellenar todo de nuevo.
 */
export function DocumentEditorView({ template, onBack }) {
  const [detail, setDetail] = useState(null);
  const [clients, setClients] = useState([]);
  const [clientId, setClientId] = useState('');
  const [values, setValues] = useState({});
  const [documentId, setDocumentId] = useState(null);
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [pdfAvailable, setPdfAvailable] = useState(true);
  const [previewHtml, setPreviewHtml] = useState(null);

  useEffect(() => {
    documentsApi.template(template.id).then((data) => {
      setDetail(data);
      setValues(defaultsFrom(data.fields));
    });
    clientsApi.list().then(setClients);
    documentsApi
      .engine()
      .then((data) => setPdfAvailable(data.pdf_available))
      .catch(() => setPdfAvailable(true));
  }, [template.id]);

  // Al elegir cliente, se recuperan los valores ya usados antes para esta
  // plantilla — así no se vuelve a llenar todo desde cero.
  useEffect(() => {
    if (!clientId || !detail) return;
    documentsApi.generated(clientId).then((docs) => {
      const existing = docs.find((doc) => doc.template === detail.id);
      if (existing) {
        setDocumentId(existing.id);
        setValues({ ...defaultsFrom(detail.fields), ...existing.field_values });
        setStatus({
          type: 'info',
          message: 'Recuperamos los valores que usaste la última vez para este cliente.',
        });
      } else {
        setDocumentId(null);
        setValues(defaultsFrom(detail.fields));
        setStatus({ type: 'idle', message: '' });
      }
    });
  }, [clientId, detail]);

  const selectedClient = useMemo(
    () => clients.find((client) => String(client.id) === String(clientId)),
    [clients, clientId],
  );

  const handleFieldChange = (key, value) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const persist = async () => {
    const payload = {
      client: Number(clientId),
      template: detail.id,
      field_values: values,
    };
    const saved = documentId
      ? await documentsApi.update(documentId, payload)
      : await documentsApi.save(payload);
    setDocumentId(saved.id);
    return saved;
  };

  const handleGenerate = async (event) => {
    event.preventDefault();
    setStatus({ type: 'loading', message: 'Generando documento…' });
    try {
      const saved = await persist();
      await documentsApi.downloadPdf(saved.id, `${detail.slug}.pdf`);
      setStatus({ type: 'success', message: 'PDF generado y descargado.' });
    } catch (error) {
      if (error.status === 503) {
        setStatus({
          type: 'error',
          message:
            'El servidor no tiene un motor de PDF disponible. ' +
            'Los datos quedaron guardados; usa la vista previa mientras tanto.',
        });
      } else {
        setStatus({ type: 'error', message: 'No se pudo generar el documento.' });
      }
    }
  };

  const handlePreview = async () => {
    setStatus({ type: 'loading', message: 'Abriendo vista previa…' });
    try {
      const saved = await persist();
      const html = await documentsApi.fetchPreviewHtml(saved.id);
      setPreviewHtml(html);
      setStatus({ type: 'idle', message: '' });
    } catch {
      setStatus({ type: 'error', message: 'No se pudo abrir la vista previa.' });
    }
  };

  if (!detail) {
    return <p className="text-sm text-silver-400">Cargando plantilla…</p>;
  }

  return (
    <div>
      {previewHtml && (
        <PreviewModal
          html={previewHtml}
          title={detail.name}
          onClose={() => setPreviewHtml(null)}
        />
      )}

      <button
        type="button"
        onClick={onBack}
        className="mb-8 text-sm text-silver-400 transition-colors duration-200 hover:text-silver-100"
      >
        ← Documentos
      </button>

      <header className="mb-10">
        <h1 className="text-2xl font-semibold text-silver-100 sm:text-3xl">{detail.name}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-silver-400">
          {detail.description}
        </p>
      </header>

      <form onSubmit={handleGenerate} className="max-w-3xl space-y-8">
        <div>
          <label
            htmlFor="client"
            className="mb-2 block text-xs font-medium uppercase tracking-wider text-silver-400"
          >
            Cliente
          </label>
          <select
            id="client"
            value={clientId}
            onChange={(event) => setClientId(event.target.value)}
            required
            className="w-full border border-ink-700 bg-ink-800 px-4 py-3 text-sm text-silver-100 focus:border-silver-400 focus:outline-none"
          >
            <option value="">Selecciona un cliente…</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.full_name}
                {client.company_name ? ` — ${client.company_name}` : ''}
              </option>
            ))}
          </select>
          {clients.length === 0 && (
            <p className="mt-2 text-xs text-silver-400">
              Todavía no hay clientes registrados. Créalos en la sección Clientes.
            </p>
          )}
        </div>

        {clientId && (
          <>
            <div className="space-y-6 border-t border-ink-700 pt-8">
              {detail.fields.map((field) => (
                <DynamicField
                  key={field.key}
                  field={field}
                  value={values[field.key]}
                  onChange={handleFieldChange}
                />
              ))}
            </div>

            {status.message && (
              <p
                className={`border px-4 py-3 text-sm ${
                  status.type === 'error'
                    ? 'border-ink-700 bg-ink-800 text-silver-100'
                    : 'border-ink-700 bg-ink-900 text-silver-400'
                }`}
              >
                {status.message}
              </p>
            )}

            <div className="flex flex-col gap-4 border-t border-ink-700 pt-8 sm:flex-row">
              <Button type="submit" disabled={status.type === 'loading' || !pdfAvailable}>
                Generar y descargar PDF
              </Button>
              <Button type="button" variant="outline" onClick={handlePreview}>
                Vista previa
              </Button>
            </div>

            {!pdfAvailable && (
              <p className="text-xs leading-relaxed text-silver-400">
                Este servidor no tiene un motor de PDF instalado. La vista previa sí
                funciona y muestra el documento tal como saldrá.
              </p>
            )}

            {selectedClient && (
              <p className="text-xs text-silver-400">
                Se guardará como documento de {selectedClient.full_name}.
              </p>
            )}
          </>
        )}
      </form>
    </div>
  );
}

function defaultsFrom(fields) {
  return fields.reduce((accumulator, field) => {
    accumulator[field.key] = field.default ?? (field.type === 'table' ? [] : '');
    return accumulator;
  }, {});
}
