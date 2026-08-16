import { useEffect, useState } from 'react';

import { Button } from '../../components/ui/Button.jsx';
import { TextField } from '../../components/ui/FormField.jsx';
import { clientsApi } from '../api/platform.api.js';

const EMPTY = {
  full_name: '',
  company_name: '',
  email: '',
  whatsapp_number: '',
  document_id: '',
  username: '',
  password: '',
};

export function ClientsView() {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [creating, setCreating] = useState(false);
  const [status, setStatus] = useState('');

  const load = () => clientsApi.list().then(setClients);

  useEffect(() => {
    load();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('');
    try {
      await clientsApi.create(form);
      setForm(EMPTY);
      setCreating(false);
      setStatus('Cliente creado. Entrégale usuario y contraseña por un canal seguro.');
      load();
    } catch (error) {
      setStatus(
        error.payload?.username?.[0] ||
          error.payload?.password?.[0] ||
          'No se pudo crear el cliente.',
      );
    }
  };

  return (
    <div>
      <header className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-silver-100 sm:text-3xl">Clientes</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-silver-400">
            Cada cliente recibe credenciales generadas aquí para entrar a su portal.
          </p>
        </div>
        <Button type="button" variant="outline" onClick={() => setCreating((prev) => !prev)}>
          {creating ? 'Cancelar' : 'Nuevo cliente'}
        </Button>
      </header>

      {status && (
        <p className="mb-8 border border-ink-700 bg-ink-800 px-4 py-3 text-sm text-silver-100">
          {status}
        </p>
      )}

      {creating && (
        <form
          onSubmit={handleSubmit}
          className="mb-12 grid max-w-3xl gap-6 border border-ink-700 bg-ink-900 p-7 md:grid-cols-2"
        >
          <TextField id="full_name" label="Nombre completo" value={form.full_name} onChange={handleChange} required />
          <TextField id="company_name" label="Empresa" value={form.company_name} onChange={handleChange} />
          <TextField id="email" type="email" label="Correo" value={form.email} onChange={handleChange} />
          <TextField id="whatsapp_number" label="WhatsApp" value={form.whatsapp_number} onChange={handleChange} />
          <TextField id="document_id" label="Cédula / NIT" value={form.document_id} onChange={handleChange} />
          <TextField id="username" label="Usuario del portal" value={form.username} onChange={handleChange} required />
          <TextField
            id="password"
            label="Contraseña inicial (mín. 8)"
            value={form.password}
            onChange={handleChange}
            minLength={8}
            required
          />
          <div className="md:col-span-2">
            <Button type="submit">Crear cliente</Button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto border border-ink-700">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-ink-800 text-xs uppercase tracking-wider text-silver-400">
            <tr>
              <th className="px-5 py-4">Cliente</th>
              <th className="px-5 py-4">Empresa</th>
              <th className="px-5 py-4">Usuario</th>
              <th className="px-5 py-4">Estado</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id} className="border-t border-ink-700">
                <td className="px-5 py-4 text-silver-100">{client.full_name}</td>
                <td className="px-5 py-4 text-silver-400">{client.company_name || '—'}</td>
                <td className="px-5 py-4 text-silver-400">{client.username}</td>
                <td className="px-5 py-4 text-silver-400">
                  {client.is_active ? 'Activo' : 'Inactivo'}
                </td>
              </tr>
            ))}
            {clients.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-silver-400">
                  Todavía no hay clientes registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
