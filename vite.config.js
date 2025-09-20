import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  define: {
    global: 'window',
  },
  server: {
    proxy: {
      '/ws': {
        target: 'https://87bebd977d4865.lhr.life',
        changeOrigin: true,
        ws: true,
      },
    },
  },
});
