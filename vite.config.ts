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
            'vendor-extras': ['react-countup', 'react-parallax-tilt', 'canvas-confetti', 'lenis'],
          },
        },
      },
      target: 'esnext',
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
