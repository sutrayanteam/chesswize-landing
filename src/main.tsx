import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// Self-host Plus Jakarta Sans via @fontsource so we don't block LCP on
// fonts.googleapis.com. Variable file covers weights 200-800 in one shot.
import '@fontsource-variable/plus-jakarta-sans';
import App from './App.tsx';
import './index.css';
import { captureAttribution } from './lib/attribution';

// Capture first-touch attribution synchronously, BEFORE React renders,
// so the very first WhatsApp CTA the user sees already has UTM/fbclid
// baked into the message body — no render→effect race.
captureAttribution();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
