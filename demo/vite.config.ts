import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
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
