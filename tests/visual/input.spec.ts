import { test, expect } from '@playwright/test';

// Visual regression tests for Input component using Storybook stories
// Navigates to a few representative stories and takes screenshots

const stories = [
  'iframe.html?id=components-forms-input--default',
  'iframe.html?id=components-forms-input--with-label',
  'iframe.html?id=components-forms-input--states',
  'iframe.html?id=components-forms-input--with-icons',
];

for (const storyPath of stories) {
  test.describe(`Input visual: ${storyPath}`, () => {
    test(`renders and matches baseline - ${storyPath}`, async ({ page }) => {
      // Go to the Storybook iframe for the story
      await page.goto(`/${storyPath}`);

      // Stabilize animations and fonts early
      await page.evaluate(() => {
        const style = document.createElement('style');
        style.innerHTML = `* { transition: none !important; animation: none !important; }`;
        document.head.appendChild(style);
      });

      // Wait for the actual input element inside the story to be present
      // If the input doesn't appear within timeout, fall back to a full-page snapshot
      const inputLocator = page.locator('input').first();
      const hasInput = await inputLocator.waitFor({ state: 'visible', timeout: 5000 }).then(() => true).catch(() => false);

      const snapshotName = `input-${storyPath.replace(/[^a-z0-9_-]/gi, '_')}.png`;

      if (hasInput) {
        // Prefer snapshotting the input's wrapper so borders/backgrounds and rounded corners are included
        const wrapper = inputLocator.locator('xpath=..');
        // If the immediate parent doesn't include visual decoration, try grandparent
        const wrapperBox = await wrapper.boundingBox();
        // If we got a box, expand it a bit so border-radius and surrounding padding are included
        if (wrapperBox) {
          const padding = 12; // px of extra context around the element
          const pageViewport = await page.viewportSize();
          const clip = {
            x: Math.max(0, wrapperBox.x - padding),
            y: Math.max(0, wrapperBox.y - padding),
            width: Math.min(
              wrapperBox.width + padding * 2,
              pageViewport ? pageViewport.width - Math.max(0, wrapperBox.x - padding) : wrapperBox.width + padding * 2,
            ),
            height: Math.min(
              wrapperBox.height + padding * 2,
              pageViewport ? pageViewport.height - Math.max(0, wrapperBox.y - padding) : wrapperBox.height + padding * 2,
            ),
          };

          // Use page.screenshot with clip to include extra context
          const buffer = await page.screenshot({ clip, type: 'png' });
          // Write/check against baseline using Playwright assertion helper
          await expect(buffer).toMatchSnapshot(snapshotName);
        } else {
          const grand = wrapper.locator('xpath=..');
          await expect(grand).toHaveScreenshot(snapshotName, { maxDiffPixelRatio: 0.001 });
        }
      } else {
        // As a fallback, capture the full page so we still get a baseline to inspect
        await page.waitForTimeout(250);
        await expect(page).toHaveScreenshot(snapshotName, { fullPage: true });
      }
    });

    test(`renders and matches focus - ${storyPath}`, async ({ page }) => {
      await page.goto(`/${storyPath}`);

      // Stabilize animations
      await page.evaluate(() => {
        const style = document.createElement('style');
        style.innerHTML = `* { transition: none !important; animation: none !important; }`;
        document.head.appendChild(style);
      });

      const inputLocator = page.locator('input').first();
      const hasInput = await inputLocator.waitFor({ state: 'visible', timeout: 5000 }).then(() => true).catch(() => false);
      const snapshotNameFocus = `input-${storyPath.replace(/[^a-z0-9_-]/gi, '_')}-focus.png`;

      if (hasInput) {
        // Focus the input to trigger :focus styles
        await inputLocator.focus();
        // Allow focus styles to render
        await page.waitForTimeout(120);

        const wrapper = inputLocator.locator('xpath=..');
        const wrapperBox = await wrapper.boundingBox();
        if (wrapperBox) {
          const padding = 12;
          const pageViewport = await page.viewportSize();
          const clip = {
            x: Math.max(0, wrapperBox.x - padding),
            y: Math.max(0, wrapperBox.y - padding),
            width: Math.min(
              wrapperBox.width + padding * 2,
              pageViewport ? pageViewport.width - Math.max(0, wrapperBox.x - padding) : wrapperBox.width + padding * 2,
            ),
            height: Math.min(
              wrapperBox.height + padding * 2,
              pageViewport ? pageViewport.height - Math.max(0, wrapperBox.y - padding) : wrapperBox.height + padding * 2,
            ),
          };

          const buffer = await page.screenshot({ clip, type: 'png' });
          await expect(buffer).toMatchSnapshot(snapshotNameFocus);
        } else {
          const grand = wrapper.locator('xpath=..');
          await expect(grand).toHaveScreenshot(snapshotNameFocus, { maxDiffPixelRatio: 0.001 });
        }
      } else {
        // fallback full page snapshot for debugging
        await page.waitForTimeout(250);
        await expect(page).toHaveScreenshot(snapshotNameFocus, { fullPage: true });
      }
    });
  });
}
