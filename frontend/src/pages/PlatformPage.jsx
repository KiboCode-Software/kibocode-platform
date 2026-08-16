import { useState } from 'react';

import { useSession } from '../platform/auth/useSession.js';
import { Sidebar } from '../platform/components/Sidebar.jsx';
import { ClientPortalView } from '../platform/views/ClientPortalView.jsx';
import { ClientsView } from '../platform/views/ClientsView.jsx';
import { DocumentEditorView } from '../platform/views/DocumentEditorView.jsx';
import { DocumentsView } from '../platform/views/DocumentsView.jsx';
import { LoginView } from '../platform/views/LoginView.jsx';
import { ProjectsView } from '../platform/views/ProjectsView.jsx';

const SECTIONS = [
  { key: 'documentos', label: 'Documentos' },
  { key: 'clientes', label: 'Clientes' },
  { key: 'proyectos', label: 'Proyectos' },
];

export function PlatformPage() {
  const { session, checking, signIn, signOut } = useSession();

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink-950">
        <p className="text-sm text-silver-400">Verificando sesión…</p>
      </div>
    );
  }

  if (!session) {
    return <LoginView onSignedIn={signIn} />;
  }

  if (session.role === 'client') {
    return <ClientPortalView onSignOut={signOut} />;
  }

  return <VendorDashboard session={session} onSignOut={signOut} />;
}

function VendorDashboard({ session, onSignOut }) {
  const [section, setSection] = useState('documentos');
  const [openTemplate, setOpenTemplate] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const selectSection = (key) => {
    setSection(key);
    setOpenTemplate(null);
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-ink-950">
      <Sidebar
        sections={SECTIONS}
        current={section}
        onSelect={selectSection}
        onSignOut={onSignOut}
        userName={session.user?.full_name || session.user?.username}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      <div className="lg:pl-64">
        {/* Barra superior con el disparador del menú en pantallas pequeñas */}
        <div className="flex h-16 items-center gap-4 border-b border-ink-700 bg-ink-900 px-6 lg:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú"
            className="-ml-2 flex h-12 w-12 items-center justify-center text-silver-100"
          >
            <span className="relative block h-3.5 w-6" aria-hidden="true">
              <span className="absolute left-0 top-0 block h-px w-6 bg-current" />
              <span className="absolute left-0 top-1.5 block h-px w-6 bg-current" />
              <span className="absolute left-0 top-3 block h-px w-6 bg-current" />
            </span>
          </button>
          <span className="text-sm text-silver-400">
            {SECTIONS.find((item) => item.key === section)?.label}
          </span>
        </div>

        <main className="px-6 py-12 md:px-10 md:py-16">
          {section === 'documentos' &&
            (openTemplate ? (
              <DocumentEditorView
                template={openTemplate}
                onBack={() => setOpenTemplate(null)}
              />
            ) : (
              <DocumentsView onOpenTemplate={setOpenTemplate} />
            ))}
          {section === 'clientes' && <ClientsView />}
          {section === 'proyectos' && <ProjectsView />}
        </main>
      </div>
    </div>
  );
}
