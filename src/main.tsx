import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// Self-host Plus Jakarta Sans via @fontsource so we don't block LCP on
// fonts.googleapis.com. Variable file covers weights 200-800 in one shot.
import '@fontsource-variable/plus-jakarta-sans';
import App from './App.tsx';
import './index.css';
import { captureAttribution } from './lib/attribution';
import { initAnalytics } from './lib/analytics';

// Capture first-touch attribution synchronously, BEFORE React renders,
// so the very first WhatsApp CTA the user sees already has UTM/fbclid
// baked into the message body — no render→effect race.
captureAttribution();

// Boot analytics in the same pre-render tick. Each provider is
// env-var gated and silently no-ops if the key is missing, so this
// is safe in dev / preview / unset-secrets builds too.
initAnalytics();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
