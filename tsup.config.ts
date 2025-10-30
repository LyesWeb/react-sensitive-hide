import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  outDir: 'dist',
  banner: {
    js: '"use client";',
  },
  // Inject CSS into the JS bundle
  injectStyle: true,
  // Enable CSS modules and regular CSS
  loader: {
    '.css': 'local-css',
  },
});
