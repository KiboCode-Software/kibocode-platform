import { apiBaseUrl } from '../../config/site.config.js';
import { getStoredSession, clearSession, storeTokens } from '../auth/session.storage.js';

class ApiError extends Error {
  constructor(message, status, payload) {
    super(message);
    this.status = status;
    this.payload = payload;
  }
}

/**
 * Cliente HTTP de la plataforma: añade el JWT, intenta refrescarlo una vez
 * si el backend responde 401, y normaliza los errores.
 */
export async function request(path, { method = 'GET', body, raw = false } = {}) {
  const response = await send(path, { method, body });

  if (response.status === 401) {
    const refreshed = await tryRefresh();
    if (refreshed) {
      const retry = await send(path, { method, body });
      return handle(retry, raw);
    }
    clearSession();
  }

  return handle(response, raw);
}

async function send(path, { method, body }) {
  const session = getStoredSession();
  const headers = {};
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (session?.tokens?.access) {
    headers.Authorization = `Bearer ${session.tokens.access}`;
  }

  return fetch(`${apiBaseUrl}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

async function handle(response, raw) {
  if (raw) {
    if (!response.ok) throw await toError(response);
    return response;
  }

  if (response.status === 204) return null;

  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    throw new ApiError(
      payload?.detail || 'No se pudo completar la operación.',
      response.status,
      payload,
    );
  }
  return payload;
}

async function toError(response) {
  const payload = await response.json().catch(() => null);
  return new ApiError(
    payload?.detail || 'No se pudo completar la operación.',
    response.status,
    payload,
  );
}

async function tryRefresh() {
  const session = getStoredSession();
  const refresh = session?.tokens?.refresh;
  if (!refresh) return false;

  const response = await fetch(`${apiBaseUrl}/api/auth/refresh/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh }),
  });

  if (!response.ok) return false;

  const data = await response.json();
  storeTokens({ ...session.tokens, access: data.access });
  return true;
}

export { ApiError };
