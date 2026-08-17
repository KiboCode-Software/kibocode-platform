import { useRoute } from './hooks/useRoute.js';
import { Analytics } from './components/Analytics.jsx';
import { LandingPage } from './pages/LandingPage.jsx';
import { PrivacyPage } from './pages/PrivacyPage.jsx';
import { PlatformPage } from './pages/PlatformPage.jsx';
import { routes } from './config/site.config.js';

export default function App({ initialPath }) {
  const path = useRoute(initialPath);

  // La plataforma interna no se mide: son datos de trabajo, no visitantes.
  if (path === routes.platform) return <PlatformPage />;

  return (
    <>
      <Analytics />
      {path === routes.privacy ? <PrivacyPage /> : <LandingPage />}
    </>
  );
}
