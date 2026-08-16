import { Logo } from '../../components/ui/Logo.jsx';

export function Sidebar({ sections, current, onSelect, onSignOut, userName, open, onClose }) {
  return (
    <>
      {/* Capa oscura al abrir el menú en móvil */}
      {open && (
        <button
          type="button"
          aria-label="Cerrar menú"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-ink-700 bg-ink-900 transition-transform duration-300 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center gap-2 border-b border-ink-700 px-6">
          <Logo href={null} size="sm" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-silver-500">
            Interno
          </span>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-4">
          {sections.map((section) => (
            <button
              key={section.key}
              type="button"
              onClick={() => onSelect(section.key)}
              className={`flex items-center justify-between px-4 py-3 text-left text-sm transition-colors duration-200 ${
                current === section.key
                  ? 'border border-ink-700 bg-ink-800 text-silver-100'
                  : 'border border-transparent text-silver-400 hover:text-silver-100'
              }`}
            >
              {section.label}
            </button>
          ))}
        </nav>

        <div className="border-t border-ink-700 p-4">
          <p className="mb-3 truncate text-xs text-silver-400">{userName}</p>
          <button
            type="button"
            onClick={onSignOut}
            className="w-full border border-ink-700 px-4 py-2.5 text-sm text-silver-400 transition-colors duration-200 hover:border-silver-400 hover:text-silver-100"
          >
            Cerrar sesión
          </button>
        </div>
      </aside>
    </>
  );
}
