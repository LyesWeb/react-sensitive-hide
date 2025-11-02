import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/react-sensitive-hide/' : '/',
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      'react-sensitive-hide': resolve(__dirname, '../../dist'),
      'react-sensitive-hide/styles.css': resolve(__dirname, '../../dist/index.css'),
    },
  },
});
