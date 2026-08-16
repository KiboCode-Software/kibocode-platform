import { useEffect } from 'react';

/**
 * Vista previa del documento dentro de la app.
 *
 * Se usa un iframe con `srcDoc` en vez de abrir una pestaña nueva: la ventana
 * emergente se pedía después de un `await`, perdía el gesto del usuario y el
 * navegador la bloqueaba. Además, así el vendedor no pierde el formulario.
 */
export function PreviewModal({ html, title, onClose }) {
  useEffect(() => {
    const onKeyDown = (event) => event.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Vista previa: ${title}`}
      className="fixed inset-0 z-50 flex flex-col bg-black/80 p-4 sm:p-8"
    >
      <div className="mx-auto flex h-full w-full max-w-4xl flex-col border border-ink-700 bg-ink-900">
        <header className="flex items-center justify-between gap-4 border-b border-ink-700 px-5 py-4">
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-[0.2em] text-silver-400">
              Vista previa
            </p>
            <h2 className="truncate text-sm font-medium text-silver-100">{title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 border border-ink-700 px-4 py-2.5 text-sm text-silver-400 transition-colors duration-200 hover:border-silver-400 hover:text-silver-100"
          >
            Cerrar
          </button>
        </header>

        <iframe
          title={`Vista previa de ${title}`}
          srcDoc={html}
          sandbox=""
          className="h-full w-full flex-1 bg-white"
        />
      </div>
    </div>
  );
}
