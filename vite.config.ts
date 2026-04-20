import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
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
            // react-parallax-tilt + canvas-confetti are now dynamic-imported,
            // so they become their own async chunks automatically.
            'vendor-extras': ['react-countup', 'lenis'],
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
    },
  };
});
