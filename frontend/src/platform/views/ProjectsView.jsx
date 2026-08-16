import { useEffect, useState } from 'react';

import { projectsApi } from '../api/platform.api.js';

export const PHASES = [
  { value: 'descubrimiento', label: '01 Descubrimiento & Arquitectura' },
  { value: 'desarrollo', label: '02 Desarrollo & Pruebas' },
  { value: 'despliegue', label: '03 Despliegue & Escalabilidad' },
  { value: 'completado', label: 'Completado' },
];

export function ProjectsView() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    projectsApi
      .list()
      .then(setProjects)
      .finally(() => setLoading(false));
  }, []);

  const changePhase = async (project, phase) => {
    await projectsApi.update(project.id, { phase });
    setProjects((prev) =>
      prev.map((item) => (item.id === project.id ? { ...item, phase } : item)),
    );
  };

  return (
    <div>
      <header className="mb-10">
        <h1 className="text-2xl font-semibold text-silver-100 sm:text-3xl">Proyectos</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-silver-400">
          La fase que marques aquí es exactamente lo que el cliente ve en su portal.
        </p>
      </header>

      {loading && <p className="text-sm text-silver-400">Cargando proyectos…</p>}

      <div className="space-y-px border border-ink-700 bg-ink-700">
        {projects.map((project) => (
          <article key={project.id} className="bg-ink-950 p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-base font-semibold text-silver-100">{project.name}</h2>
                <p className="mt-1 text-sm text-silver-400">{project.client_name}</p>
              </div>
              <select
                value={project.phase}
                onChange={(event) => changePhase(project, event.target.value)}
                className="border border-ink-700 bg-ink-800 px-4 py-2.5 text-sm text-silver-100 focus:border-silver-400 focus:outline-none"
              >
                {PHASES.map((phase) => (
                  <option key={phase.value} value={phase.value}>
                    {phase.label}
                  </option>
                ))}
              </select>
            </div>
            {project.notes && (
              <p className="mt-4 border-l border-ink-700 pl-4 text-sm leading-relaxed text-silver-400">
                <span className="text-silver-100">Nota interna:</span> {project.notes}
              </p>
            )}
          </article>
        ))}
        {!loading && projects.length === 0 && (
          <p className="bg-ink-950 px-7 py-10 text-center text-sm text-silver-400">
            Todavía no hay proyectos registrados.
          </p>
        )}
      </div>
    </div>
  );
}
