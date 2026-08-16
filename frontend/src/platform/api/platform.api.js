import { apiBaseUrl } from '../../config/site.config.js';
import { getStoredSession } from '../auth/session.storage.js';
import { request } from './http.js';

export const authApi = {
  loginVendor: (username, password) =>
    request('/api/auth/vendor/login/', {
      method: 'POST',
      body: { username, password },
    }),
  loginClient: (username, password) =>
    request('/api/auth/client/login/', {
      method: 'POST',
      body: { username, password },
    }),
  session: () => request('/api/auth/session/'),
};

export const clientsApi = {
  list: (search = '') =>
    request(`/api/clients/${search ? `?search=${encodeURIComponent(search)}` : ''}`),
  create: (data) => request('/api/clients/', { method: 'POST', body: data }),
};

export const documentsApi = {
  templates: () => request('/api/documents/templates/'),
  template: (id) => request(`/api/documents/templates/${id}/`),
  engine: () => request('/api/documents/templates/engine/'),
  generated: (clientId) =>
    request(`/api/documents/generated/${clientId ? `?client=${clientId}` : ''}`),
  save: (data) => request('/api/documents/generated/', { method: 'POST', body: data }),
  update: (id, data) => request(`/api/documents/generated/${id}/`, { method: 'PUT', body: data }),
  previewUrl: (id) => `${apiBaseUrl}/api/documents/generated/${id}/preview/`,

  /** Descarga el PDF con el token en la cabecera y lo entrega como blob. */
  downloadPdf: async (id, filename) => {
    const response = await request(`/api/documents/generated/${id}/pdf/`, { raw: true });
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || 'documento.pdf';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  },

  /** Devuelve el HTML del documento ya renderizado, para mostrarlo en la app. */
  fetchPreviewHtml: async (id) => {
    const response = await request(`/api/documents/generated/${id}/preview/`, { raw: true });
    return response.text();
  },
};

export const projectsApi = {
  list: (clientId) => request(`/api/projects/${clientId ? `?client=${clientId}` : ''}`),
  create: (data) => request('/api/projects/', { method: 'POST', body: data }),
  update: (id, data) => request(`/api/projects/${id}/`, { method: 'PATCH', body: data }),
  addUpdate: (data) => request('/api/projects/updates/', { method: 'POST', body: data }),
  mine: () => request('/api/projects/mine/'),
};

export const hasSession = () => Boolean(getStoredSession()?.tokens?.access);
