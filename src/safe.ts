/**
 * CodeLion Design System - Safe Entry Point
 * 
 * Entry point that avoids all vanilla-extract code
 * Import only components that use React inline styles
 */

// Safe components (no vanilla-extract)
export { ButtonInline } from './components/Button/Button.inline';

// Safe utilities (no CSS dependencies)
export { cn, cnx } from './utils/cn';

// Safe types
export type { ButtonProps } from './components/Button/Button.inline';
