import { defineConfig } from 'vitest/config';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

// Exclude Playwright visual tests from Vitest so Vitest doesn't try to
// execute files that use @playwright/test (which defines its own `test`).
// Also configure a sane default test environment and setup file used in this repo.
export default defineConfig({
  plugins: [vanillaExtractPlugin()],
  test: {
    globals: true,
    include: ['src/**/*.{test,spec}.{ts,tsx,js,jsx}', 'tests/**/*.{test,spec}.{ts,tsx,js,jsx}'],
    exclude: ['node_modules/**', 'tests/visual/**', 'storybook-static/**', 'coverage/**'],
    environment: 'jsdom',
    setupFiles: ['tests/setup.ts'],
    css: true,
  },
});
