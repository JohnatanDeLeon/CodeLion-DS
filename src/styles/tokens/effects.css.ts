import { createGlobalTheme } from '@vanilla-extract/css';

/**
 * Design System Effects
 * Shadows, borders, animations, and visual effects
 */
export const effects = createGlobalTheme(':root', {
  // Box shadows - layered elevation system
  shadow: {
    none: 'none',
    xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    base: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    md: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    lg: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    xl: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '2xl': '0 50px 100px -20px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  },

  // Border radius scale
  borderRadius: {
    none: '0',
    xs: '0.125rem',   // 2px
    sm: '0.25rem',    // 4px
    base: '0.375rem', // 6px
    md: '0.5rem',     // 8px
    lg: '0.75rem',    // 12px
    xl: '1rem',       // 16px
    '2xl': '1.5rem',  // 24px
    '3xl': '2rem',    // 32px
    full: '9999px',
  },

  // Border widths
  borderWidth: {
    0: '0',
    1: '1px',
    2: '2px',
    4: '4px',
    8: '8px',
  },

  // Focus rings and interactive states
  ring: {
    none: '0 0 0 0 transparent',
    sm: '0 0 0 1px currentColor',
    base: '0 0 0 2px currentColor',
    md: '0 0 0 3px currentColor',
    lg: '0 0 0 4px currentColor',
  },

  // Blur effects
  blur: {
    none: '0',
    xs: '2px',
    sm: '4px',
    base: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '40px',
    '3xl': '64px',
  },
});

/**
 * Semantic shadow presets for components
 */
export const componentShadows = {
  card: effects.shadow.sm,
  cardHover: effects.shadow.md,
  button: effects.shadow.xs,
  buttonHover: effects.shadow.sm,
  dropdown: effects.shadow.lg,
  modal: effects.shadow.xl,
  tooltip: effects.shadow.md,
  popover: effects.shadow.lg,
} as const;

/**
 * Animation timing and easing functions
 */
export const animation = {
  duration: {
    fast: '150ms',
    normal: '250ms',
    slow: '350ms',
    slower: '500ms',
    slowest: '750ms',
  },
  easing: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    bouncy: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
} as const;

/**
 * Glow effects for focus states and highlights
 */
export const glowEffects = {
  primary: '0 0 0 3px rgb(14 165 233 / 0.15), 0 0 20px rgb(14 165 233 / 0.1)',
  success: '0 0 0 3px rgb(16 185 129 / 0.15), 0 0 20px rgb(16 185 129 / 0.1)',
  error: '0 0 0 3px rgb(239 68 68 / 0.15), 0 0 20px rgb(239 68 68 / 0.1)',
  warning: '0 0 0 3px rgb(245 158 11 / 0.15), 0 0 20px rgb(245 158 11 / 0.1)',
  info: '0 0 0 3px rgb(59 130 246 / 0.15), 0 0 20px rgb(59 130 246 / 0.1)',
} as const;

/**
 * TypeScript types for effect tokens
 */
export type ShadowToken = keyof typeof effects.shadow;
export type BorderRadiusToken = keyof typeof effects.borderRadius;
export type BorderWidthToken = keyof typeof effects.borderWidth;
export type BlurToken = keyof typeof effects.blur;
export type ComponentShadow = keyof typeof componentShadows;
export type AnimationDuration = keyof typeof animation.duration;
export type AnimationEasing = keyof typeof animation.easing;
export type GlowEffect = keyof typeof glowEffects;