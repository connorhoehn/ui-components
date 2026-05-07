import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  root: __dirname,
  resolve: {
    alias: {
      '@connorhoehn/ui-components': resolve(__dirname, '../src'),
      '@': resolve(__dirname, '../src'),
    },
  },
  server: {
    port: 5174,
  },
});
