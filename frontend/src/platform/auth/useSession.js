import { useCallback, useEffect, useState } from 'react';

import { authApi } from '../api/platform.api.js';
import { clearSession, getStoredSession, storeSession } from './session.storage.js';

/**
 * Estado de sesión de la plataforma. Rehidrata desde localStorage y valida
 * el token contra el backend al montar, para no mostrar un panel con una
 * sesión ya expirada.
 */
export function useSession() {
  const [session, setSession] = useState(() => getStoredSession());
  const [checking, setChecking] = useState(() => Boolean(getStoredSession()));

  useEffect(() => {
    if (!session) {
      setChecking(false);
      return;
    }
    let cancelled = false;
    authApi
      .session()
      .then(() => !cancelled && setChecking(false))
      .catch(() => {
        if (cancelled) return;
        clearSession();
        setSession(null);
        setChecking(false);
      });
    return () => {
      cancelled = true;
    };
    // Solo al montar: revalidar en cada cambio provocaría un bucle.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signIn = useCallback((data) => {
    storeSession(data);
    setSession(data);
  }, []);

  const signOut = useCallback(() => {
    clearSession();
    setSession(null);
  }, []);

  return { session, checking, signIn, signOut };
}
