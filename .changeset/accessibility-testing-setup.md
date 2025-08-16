---
"@johnatandeleon/design-system": patch
---

🔧 Fix accessibility testing setup and CI/CD pipeline

## What's Changed

### 🛠️ **Fixed Dependencies**
- Added `@storybook/test-runner@^0.19.1` for accessibility testing
- Added `playwright@^1.48.0` for browser automation  
- Added `axe-playwright@^2.0.3` for a11y test integration
- Added `http-server@^14.1.1` for serving static Storybook

### ⚙️ **Configuration Setup**
- Created `.storybook/main.ts` with vanilla-extract integration
- Created `.storybook/preview.ts` with accessibility configuration
- Created `.storybook/test-runner.ts` with axe integration
- Added `playwright.config.ts` for test configuration

### 🚀 **Scripts & Workflows**
- Fixed `test:a11y` script to use `npx @storybook/test-runner`
- Updated GitHub Actions workflow for accessibility testing
- Added Playwright browser installation step in CI/CD
- Improved Storybook serving logic with proper wait conditions

### 📦 **Build Improvements**
- Ensured all builds work correctly (library + Storybook)
- Updated `.gitignore` for new generated files
- Added comprehensive documentation in `ACCESSIBILITY_TESTING.md`

## Testing Results
- ✅ All unit tests passing (21/21 including 5 a11y tests)
- ✅ TypeScript compilation successful
- ✅ Library build working (7.56KB JS, 7.10KB CSS)
- ✅ Storybook build successful with axe integration
- ✅ Playwright browsers installed and ready

This fix resolves the CI/CD error: `Executable doesn't exist at /home/runner/.cache/ms-playwright/chromium_headless_shell` by properly configuring the accessibility testing pipeline.
