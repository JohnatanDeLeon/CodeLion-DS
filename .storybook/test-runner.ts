import type { TestRunnerConfig } from '@storybook/test-runner';
import { injectAxe, checkA11y } from 'axe-playwright';

const config: TestRunnerConfig = {
  async preVisit(page, story) {
    await injectAxe(page);
  },
  async postVisit(page, story) {
    // Run accessibility tests on every story
    await checkA11y(page, '#storybook-root', {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
      // Customize rules as needed
      axeOptions: {
        rules: {
          // Disable specific rules if needed
          // 'color-contrast': { enabled: false },
        },
      },
    });
  },
}; 

export default config;
