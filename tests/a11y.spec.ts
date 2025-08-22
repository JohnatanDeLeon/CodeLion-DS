import { test } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

const storyUrl = (id: string) => `/iframe.html?id=${id}&viewMode=story`;

test.describe('Accessibility Tests @a11y', () => {
  const stories = [
    { id: 'components-basic-button--default', name: 'Button' },
    { id: 'components-forms-input--default', name: 'Input' },
    { id: 'components-forms-input-masks--currency', name: 'Input with currency mask' },
    { id: 'components-forms-input-masks--phone', name: 'Input with phone mask' },
    { id: 'components-forms-input-masks--serial-number', name: 'Input with serial mask' },
  ];

  for (const { id, name } of stories) {
    test(`@a11y - ${name} should meet accessibility standards`, async ({ page }) => {
      await page.goto(storyUrl(id));
      await page.waitForLoadState('domcontentloaded');
      await injectAxe(page);
      await checkA11y(page, 'body', {
        detailedReport: true,
        detailedReportOptions: { html: true },
      });
    });
  }

  test('@a11y - Main Storybook page should meet accessibility standards', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await injectAxe(page);
    await checkA11y(page, 'body', {
      detailedReport: true,
      detailedReportOptions: { html: true },
    });
  });
});
