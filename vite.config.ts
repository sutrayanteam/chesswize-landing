import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// NOTE: intentionally no `define: { 'process.env.GEMINI_API_KEY': ... }`.
// The Gemini API key is a server-only secret. Baking it into the client
// bundle (as the old config did) leaked it into every browser payload.
// Any AI-assisted feature that needs Gemini MUST go through the worker.

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom'],
            'vendor-motion': ['motion'],
            'vendor-ui': ['lucide-react', 'sonner', 'clsx', 'tailwind-merge', 'class-variance-authority'],
            'vendor-carousel': ['embla-carousel-react', 'embla-carousel-autoplay'],
            // react-parallax-tilt + canvas-confetti are dynamic-imported,
            // so they become their own async chunks automatically. `lenis`
            // was listed here previously but is unused — removed.
            'vendor-extras': ['react-countup'],
          },
        },
      },
      // Explicit support floor: Safari 15 is the oldest version we target,
      // so we cap output syntax to what Safari 15 can parse. esnext would
      // leave some features untranspiled and Safari 15 would choke silently.
      target: ['safari15', 'chrome107', 'firefox104', 'edge107'],
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      // Forward /api/* to a locally-running wrangler dev (worker/). In prod
      // the Cloudflare route handles this same-origin; in dev we have to
      // proxy explicitly since Vite and the Worker are separate processes.
      proxy: {
        '/api': {
          target: process.env.VITE_API_TARGET || 'http://127.0.0.1:8787',
          changeOrigin: true,
        },
      },
    },
  };
});
