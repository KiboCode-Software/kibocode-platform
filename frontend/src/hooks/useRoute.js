import { useEffect, useState } from 'react';

/**
 * Router mínimo basado en `location.pathname`.
 * Suficiente para un sitio de dos vistas (landing y aviso legal),
 * sin añadir dependencias al proyecto.
 *
 * `initialPath` permite renderizar una ruta concreta fuera del navegador,
 * que es lo que necesita el pre-renderizado de la compilación.
 */
export function useRoute(initialPath) {
  const [path, setPath] = useState(() =>
    normalize(initialPath ?? (typeof window === 'undefined' ? '/' : window.location.pathname)),
  );

  useEffect(() => {
    const sync = () => setPath(normalize(window.location.pathname));
    sync();
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  return path;
}

/** Quita la barra final para que `/privacidad/` y `/privacidad` sean la misma ruta. */
function normalize(pathname) {
  return pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
}
