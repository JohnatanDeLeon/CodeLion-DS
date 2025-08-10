/**
 * CodeLion Design System
 * @codelion/design-system
 * 
 * A comprehensive React design system built with:
 * - TypeScript for type safety
 * - vanilla-extract for CSS-in-JS
 * - Tailwind CSS for utilities  
 * - Storybook for documentation
 * - Vitest for testing
 * - WCAG 2.1 AA accessibility compliance
 */

// Import CSS reset - this should be imported by consuming applications
import './styles/globals/reset.css';

// Components
export * from './components';

// Design tokens and styles
export * from './styles';

// Utilities
export * from './utils';

// Types
export * from './types';