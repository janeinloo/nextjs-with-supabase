import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts',
    include: ['**/__tests__/**/*.test.{ts,tsx}'],
    css: false,
  },
  esbuild: {
    jsxInject: `import React from 'react'`, // 👈 Väga oluline!
  },
});