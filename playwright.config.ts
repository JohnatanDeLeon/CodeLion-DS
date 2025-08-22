import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:6006',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run storybook',
    url: 'http://localhost:6006',
    reuseExistingServer: true, // Cambiar a true para CI
    timeout: 120 * 1000, // Aumentar timeout para CI
    stdout: 'pipe',
    stderr: 'pipe',
  },
  // Configuración específica para CI
  ...(process.env.CI && {
    webServer: {
      command: 'npm run build-storybook && npx http-server storybook-static -p 6006',
      url: 'http://localhost:6006',
      reuseExistingServer: false,
      timeout: 180 * 1000,
      stdout: 'pipe',
      stderr: 'pipe',
    },
  }),
});
