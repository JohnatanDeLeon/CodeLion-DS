/**
 * Design System Tokens
 * Centralized design tokens with TypeScript support
 */

// Import all token modules
import { colors, gradients } from './colors.css';
import { spacing, semanticSpacing } from './spacing.css';
import { typography, textStyles } from './typography.css';
import { effects, componentShadows, animation, glowEffects } from './effects.css';

// Re-export individual tokens
export { colors, gradients } from './colors.css';
export { spacing, semanticSpacing } from './spacing.css';
export { typography, textStyles } from './typography.css';
export { effects, componentShadows, animation, glowEffects } from './effects.css';

/**
 * Combined tokens object for easier access
 */
export const tokens = {
  colors,
  gradients,
  spacing,
  semanticSpacing,
  typography,
  textStyles,
  effects,
  componentShadows,
  animation,
  glowEffects,
} as const;

/**
 * Design system configuration
 */
export const designSystemConfig = {
  name: '@johnatandeleon/design-system',
  version: '0.1.0',
  
  // Theme configuration
  themes: {
    light: 'light',
    dark: 'dark',
  },
  
  // Breakpoints for responsive design
  breakpoints: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  // Z-index scale
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },
} as const;

/**
 * Export types for external consumption
 */
export type {
  ColorToken,
  ColorScale,
  PrimaryColor,
  NeutralColor,
  SemanticColor,
  GradientType,
} from './colors.css';

export type {
  SpacingToken,
  SemanticSpacingToken,
} from './spacing.css';

export type {
  FontFamily,
  FontSize,
  FontWeight,
  LineHeight,
  LetterSpacing,
  TextStyle,
} from './typography.css';

export type {
  ShadowToken,
  BorderRadiusToken,
  BorderWidthToken,
  BlurToken,
  ComponentShadow,
  AnimationDuration,
  AnimationEasing,
  GlowEffect,
} from './effects.css';

/**
 * Additional derived types
 */
export type ThemeName = keyof typeof designSystemConfig.themes;
export type Breakpoint = keyof typeof designSystemConfig.breakpoints;
export type ZIndexLevel = keyof typeof designSystemConfig.zIndex;