import { useRoute } from './hooks/useRoute.js';
import { Analytics } from './components/Analytics.jsx';
import { LandingPage } from './pages/LandingPage.jsx';
import { PrivacyPage } from './pages/PrivacyPage.jsx';
import { PlatformPage } from './pages/PlatformPage.jsx';
import { routes } from './config/site.config.js';
import { LanguageProvider } from './i18n/LanguageContext.jsx';
import { LANGUAGES, languageFromPath, stripPrefix } from './i18n/languages.js';
import { useLanguageRedirect } from './i18n/useLanguageRedirect.js';

export default function App({ initialPath }) {
  const path = useRoute(initialPath);

  // La plataforma interna no se traduce ni se mide: es una herramienta de
  // trabajo del equipo, no una página pública.
  if (path === routes.platform) return <PlatformPage />;

  return <PublicSite path={path} />;
}

function PublicSite({ path }) {
  const language = languageFromPath(path);
  const sinPrefijo = stripPrefix(path);

  useLanguageRedirect(language, path);

  const esPrivacidad = sinPrefijo === stripPrefix(LANGUAGES[language].routes.privacy);

  return (
    <LanguageProvider language={language} path={path}>
      <Analytics />
      {esPrivacidad ? <PrivacyPage /> : <LandingPage />}
    </LanguageProvider>
  );
}
