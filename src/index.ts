/**
 * CodeLion Design System
 * @johnatandeleon/design-system
 *
 * A comprehensive React design system built with:
 * - TypeScript for type safety
 * - vanilla-extract for CSS-in-JS
 * - Tailwind CSS for utilities
 * - Storybook for documentation
 * - Vitest for testing
 * - WCAG 2.1 AA accessibility compliance
 */

// CSS reset is available as an optional import:
// import '@johnatandeleon/design-system/reset'

// Components
export * from "./components";

// Design tokens and styles
export * from "./styles";

// Utilities
export * from "./utils";

// Hooks
export * from "./hooks";

// Types
export * from "./types";

// Ensure masking handlers are registered when the lib is imported
import "./masking/handlers";
