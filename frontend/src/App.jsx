import { useRoute } from './hooks/useRoute.js';
import { LandingPage } from './pages/LandingPage.jsx';
import { PrivacyPage } from './pages/PrivacyPage.jsx';
import { PlatformPage } from './pages/PlatformPage.jsx';
import { routes } from './config/site.config.js';

export default function App({ initialPath }) {
  const path = useRoute(initialPath);

  if (path === routes.privacy) return <PrivacyPage />;
  // Plataforma interna: no está enlazada desde la landing pública.
  if (path === routes.platform) return <PlatformPage />;
  return <LandingPage />;
}
