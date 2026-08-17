import { LANGUAGES, LANGUAGE_CODES, stripPrefix } from '../../i18n/languages.js';
import { setPreferredLanguage } from '../../i18n/useLanguageRedirect.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';

/**
 * Selector de idioma.
 *
 * Enlaza a la misma página en el otro idioma, no a su portada: si estás
 * leyendo el aviso de privacidad y cambias de idioma, sigues en el aviso.
 * Al pulsarlo se recuerda la elección, para que la detección automática no
 * la deshaga en la siguiente visita.
 */
export function LanguageSwitcher({ className = '', onNavigate }) {
  const { language, path } = useLanguage();

  return (
    <div
      className={`flex items-center gap-1 ${className}`}
      role="group"
      aria-label="Idioma / Language"
    >
      {LANGUAGE_CODES.map((code, index) => {
        const activo = code === language;
        return (
          <span key={code} className="flex items-center">
            {index > 0 && (
              <span aria-hidden="true" className="mx-1 text-ink-500">
                /
              </span>
            )}
            <a
              href={equivalentPath(code, path)}
              hrefLang={code}
              aria-current={activo ? 'true' : undefined}
              onClick={() => {
                setPreferredLanguage(code);
                onNavigate?.();
              }}
              className={`px-1 py-2 text-xs font-medium tracking-wider transition-colors duration-200 ${
                activo
                  ? 'text-silver-50'
                  : 'text-silver-500 hover:text-silver-200'
              }`}
            >
              {LANGUAGES[code].short}
            </a>
          </span>
        );
      })}
    </div>
  );
}

/**
 * La misma página, en el idioma pedido.
 *
 * La ruta llega por parámetro y no de `window`: en el pre-renderizado no hay
 * navegador, y leerlo allí hacía que el HTML servido enlazara siempre a la
 * portada en vez de a la página equivalente.
 */
function equivalentPath(code, actual = '/') {
  const sinPrefijo = stripPrefix(actual);
  const destino = LANGUAGES[code];

  // El aviso de privacidad tiene nombre propio en cada idioma.
  const esPrivacidad = Object.values(LANGUAGES).some(
    (lang) => stripPrefix(lang.routes.privacy) === sinPrefijo,
  );
  return esPrivacidad ? destino.routes.privacy : destino.routes.home;
}
