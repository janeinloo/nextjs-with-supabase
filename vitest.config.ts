import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: [],
    include: ['**/__tests__/**/*.test.{ts,tsx}'],
    css: false,
  },
});