const STORAGE_KEY = 'kibocode.platform.session';

/** Sesión persistida: rol, tokens y datos básicos del portador. */
export function getStoredSession() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function storeSession(session) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function storeTokens(tokens) {
  const session = getStoredSession();
  if (!session) return;
  storeSession({ ...session, tokens });
}

export function clearSession() {
  window.localStorage.removeItem(STORAGE_KEY);
}
