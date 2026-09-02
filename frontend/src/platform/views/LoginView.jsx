import { useState } from 'react';

import { Button } from '../../components/ui/Button.jsx';
import { TextField } from '../../components/ui/FormField.jsx';
import { Logo } from '../../components/ui/Logo.jsx';
import { routes } from '../../config/site.config.js';
import { authApi } from '../api/platform.api.js';

const TABS = [
  { key: 'vendor', label: 'Equipo KiboCode' },
  { key: 'client', label: 'Soy cliente' },
];

export function LoginView({ onSignedIn }) {
  const [tab, setTab] = useState('vendor');
  const [values, setValues] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const login = tab === 'vendor' ? authApi.loginVendor : authApi.loginClient;
      const data = await login(values.username, values.password);
      onSignedIn(data);
    } catch (err) {
      setError(
        err.status === 401
          ? 'Usuario o contraseña incorrectos.'
          : 'No se pudo conectar con el servidor. Verifica que el backend esté corriendo.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-950 px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-10 flex flex-col items-center text-center">
          <img
            src="/logo-mark.svg"
            alt=""
            width={56}
            height={56}
            className="mb-4 h-14 w-14"
          />
          <span className="text-xl font-semibold tracking-tight text-silver-50">
            KiboCode<span className="text-accent-500">.</span>
          </span>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-silver-400">
            Plataforma interna
          </p>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-px border border-ink-700 bg-ink-700">
          {TABS.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => {
                setTab(item.key);
                setError('');
              }}
              className={`px-4 py-3 text-sm transition-colors duration-200 ${
                tab === item.key
                  ? 'bg-ink-800 text-silver-100'
                  : 'bg-ink-950 text-silver-400 hover:text-silver-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <TextField
            id="username"
            label="Usuario"
            value={values.username}
            onChange={handleChange}
            autoComplete="username"
            required
          />
          <TextField
            id="password"
            type="password"
            label="Contraseña"
            value={values.password}
            onChange={handleChange}
            autoComplete="current-password"
            required
          />

          {error && (
            <p className="border border-ink-700 bg-ink-800 px-4 py-3 text-sm text-silver-100">
              {error}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Entrando…' : 'Entrar'}
          </Button>
        </form>

        <p className="mt-8 text-center text-xs leading-relaxed text-silver-400">
          {tab === 'client'
            ? 'Tus credenciales te las entrega KiboCode directamente.'
            : 'Acceso restringido al equipo de KiboCode.'}
        </p>
        <p className="mt-4 text-center">
          <a
            href={routes.home}
            className="text-xs text-silver-400 underline underline-offset-4 hover:text-silver-100"
          >
            Volver al sitio público
          </a>
        </p>
      </div>
    </div>
  );
}
