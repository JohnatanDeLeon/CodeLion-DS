import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    globals: true,
    exclude: [
      // Build y dependencias
      '**/node_modules/**',
      '**/dist/**',
      '**/coverage/**',
      
      // Configuración
      '**/*.config.*',
      '**/vite.config.ts',
      '**/vitest.config.ts',
      '**/.eslintrc.*',
      '**/.prettierrc.*',
      '**/tsconfig.*',
      '**/playwright.config.*',
      
      // Playwright específicos
      '**/*.spec.ts',
      'tests/a11y.spec.ts',
      
      // Storybook
      '**/*.stories.*',
      '**/stories/**',
      
      // Archivos de test vacíos o inválidos
      'tests/a11y.test.ts',
      
      // Archivos de ejemplo/demo
      '**/*Example*.tsx',
      '**/*Test*.tsx',
      '**/*Demo*.tsx',
      '**/examples/**',
      '**/demos/**',
      
      // Otros
      '**/.storybook/**',
      '**/storybook-static/**',
      '**/playwright-report/**',
      '**/test-results/**',
      '**/test-outputs/**',
      '**/.sb-cache/**',
      '**/chromatic-snapshots/**'
    ],
    include: [
      'src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      'tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/coverage/**',
        '**/*.d.ts',
        '**/*.config.*',
        '**/tests/**',
        '**/stories/**',
        '**/*.stories.*',
        '**/.storybook/**',
        '**/storybook-static/**',
        '**/playwright-report/**',
        '**/test-results/**',
        '**/test-outputs/**',
        '**/.sb-cache/**',
        '**/chromatic-snapshots/**',
        '**/.eslintrc.*',
        '**/.prettierrc.*',
        '**/tsconfig.*',
        '**/playwright.config.*',
        '**/*Example*.tsx',
        '**/*Test*.tsx',
        '**/*Demo*.tsx',
        '**/examples/**',
        '**/demos/**',
        '**/currencyTest.tsx',
        '**/directCurrencyTest.tsx',
        '**/masksExamples.tsx'
      ],
    },
  },
});
