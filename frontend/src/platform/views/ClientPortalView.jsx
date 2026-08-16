import { useEffect, useState } from 'react';

import { Container } from '../../components/ui/Container.jsx';
import { Logo } from '../../components/ui/Logo.jsx';
import { projectsApi } from '../api/platform.api.js';
import { PHASES } from './ProjectsView.jsx';

/**
 * Portal del cliente: solo lectura, solo sus propios proyectos.
 * El backend decide qué puede ver a partir del token; aquí no se
 * envía ningún identificador de cliente.
 */
export function ClientPortalView({ onSignOut }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    projectsApi
      .mine()
      .then(setData)
      .catch(() => setError('No pudimos cargar tu proyecto. Intenta de nuevo en un momento.'));
  }, []);

  return (
    <div className="min-h-screen bg-ink-950">
      <header className="border-b border-ink-700 bg-ink-900">
        <Container className="flex h-16 items-center justify-between">
          <Logo href={null} />
          <button
            type="button"
            onClick={onSignOut}
            className="py-3 text-sm text-silver-400 transition-colors duration-200 hover:text-silver-100"
          >
            Cerrar sesión
          </button>
        </Container>
      </header>

      <main className="py-16 md:py-24">
        <Container>
          {error && (
            <p className="border border-ink-700 bg-ink-800 px-4 py-3 text-sm text-silver-100">
              {error}
            </p>
          )}

          {data && (
            <>
              <header className="mb-14">
                <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-silver-400">
                  Estado de tu proyecto
                </p>
                <h1 className="text-2xl font-semibold text-silver-100 sm:text-3xl">
                  Hola, {data.client.full_name.split(' ')[0]}.
                </h1>
                <p className="mt-3 text-sm leading-relaxed text-silver-400">
                  Aquí ves en qué va tu desarrollo, sin tener que preguntarlo.
                </p>
              </header>

              <div className="space-y-12">
                {data.projects.map((project) => (
                  <ProjectStatus key={project.id} project={project} />
                ))}
                {data.projects.length === 0 && (
                  <p className="border border-ink-700 bg-ink-900 px-6 py-10 text-center text-sm text-silver-400">
                    Todavía no hay un proyecto activo asociado a tu cuenta.
                  </p>
                )}
              </div>
            </>
          )}
        </Container>
      </main>
    </div>
  );
}

function ProjectStatus({ project }) {
  const currentIndex = PHASES.findIndex((phase) => phase.value === project.phase);

  return (
    <article className="border border-ink-700 bg-ink-900 p-7 md:p-10">
      <h2 className="text-lg font-semibold text-silver-100">{project.name}</h2>
      <p className="mt-1 text-sm text-silver-400">Fase actual: {project.phase_label}</p>

      <ol className="mt-8 grid gap-px border border-ink-700 bg-ink-700 md:grid-cols-4">
        {PHASES.map((phase, index) => {
          const done = index < currentIndex;
          const active = index === currentIndex;
          return (
            <li
              key={phase.value}
              className={`p-5 ${active ? 'bg-ink-800' : 'bg-ink-950'}`}
            >
              <span
                className={`text-xs uppercase tracking-wider ${
                  active || done ? 'text-silver-100' : 'text-silver-400/60'
                }`}
              >
                {done ? '✓ Completada' : active ? 'En curso' : 'Pendiente'}
              </span>
              <p
                className={`mt-2 text-sm leading-snug ${
                  active ? 'text-silver-100' : 'text-silver-400'
                }`}
              >
                {phase.label}
              </p>
            </li>
          );
        })}
      </ol>

      {project.updates.length > 0 && (
        <div className="mt-10">
          <h3 className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-silver-400">
            Actualizaciones
          </h3>
          <ul className="space-y-5">
            {project.updates.map((update) => (
              <li key={update.id} className="border-l border-ink-700 pl-5">
                <time className="text-xs text-silver-400/70">
                  {new Date(update.created_at).toLocaleDateString('es-CO', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </time>
                <p className="mt-1 text-sm leading-relaxed text-silver-100">
                  {update.message}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
