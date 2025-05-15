import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// eslint-disable-next-line import/no-extraneous-dependencies
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [
    react(),
    eslint({
      failOnError: true, // 💥 ломает dev и build при ошибке
      failOnWarning: false, // можно включить если хочешь жёстче
      cache: false, // всегда проверяет свежие файлы
    }),
  ],
  resolve: {
    alias: {
      // твои alias если есть
    },
  },
  define: {
    global: 'window',
    'process.env': {},
  },
  build: {
    outDir: 'build',
  },
});
