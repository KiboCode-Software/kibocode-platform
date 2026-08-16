import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';

const container = document.getElementById('root');

// Si el HTML llega pre-renderizado desde la compilación, se hidrata en vez de
// volver a pintarlo: se conserva el contenido que ya ve el usuario (y el
// rastreador) y se evita el parpadeo.
if (container.hasChildNodes()) {
  hydrateRoot(
    container,
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
} else {
  createRoot(container).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
