/**
 * Gradient System Types
 * Comprehensive type definitions for gradient functionality
 */

export type GradientDirection =
  | "to-top"
  | "to-bottom"
  | "to-left"
  | "to-right"
  | "to-top-left"
  | "to-top-right"
  | "to-bottom-left"
  | "to-bottom-right"
  | number; // Custom angle in degrees

export interface GradientStop {
  color: string;
  position?: number; // 0-100 percentage
}

export interface GradientConfig {
  /**
   * Direction of the gradient
   * @default 135 (diagonal top-left to bottom-right)
   */
  direction?: GradientDirection;

  /**
   * Gradient color stops
   */
  stops: GradientStop[];

  /**
   * Fallback color for unsupported browsers
   */
  fallback?: string;
}

export interface GradientStateConfig {
  /**
   * Default gradient configuration
   */
  default: GradientConfig;

  /**
   * Hover state gradient (optional, auto-generated if not provided)
   */
  hover?: GradientConfig;

  /**
   * Active/pressed state gradient (optional, auto-generated if not provided)
   */
  active?: GradientConfig;

  /**
   * Focus state gradient (optional, uses default if not provided)
   */
  focus?: GradientConfig;

  /**
   * Disabled state gradient (optional, uses muted version if not provided)
   */
  disabled?: GradientConfig;
}

export interface SimpleGradientProps {
  /**
   * Start color of the gradient
   */
  startColor: string;

  /**
   * End color of the gradient
   */
  endColor: string;

  /**
   * Direction of the gradient
   * @default 135
   */
  direction?: GradientDirection;

  /**
   * Hover start color (optional, auto-darkened if not provided)
   */
  hoverStartColor?: string;

  /**
   * Hover end color (optional, auto-darkened if not provided)
   */
  hoverEndColor?: string;
}

export interface AdvancedGradientProps {
  /**
   * Complete gradient configuration with all states
   */
  gradient: GradientStateConfig;
}

export type GradientProps = SimpleGradientProps | AdvancedGradientProps;

export interface GradientStyles {
  /**
   * Default background gradient
   */
  background: string;

  /**
   * CSS custom properties for state variations
   */
  customProperties: Record<string, string>;

  /**
   * Additional CSS classes to apply
   */
  className?: string;
}

export interface GradientHookOptions {
  /**
   * Amount to darken colors for auto-generated hover states
   * @default 0.15
   */
  hoverDarkenAmount?: number;

  /**
   * Amount to darken colors for auto-generated active states
   * @default 0.25
   */
  activeDarkenAmount?: number;

  /**
   * Whether to generate CSS custom properties
   * @default true
   */
  generateCustomProperties?: boolean;

  /**
   * Prefix for CSS custom properties
   * @default 'gradient'
   */
  cssPropertyPrefix?: string;
}

// Type guards
export const isSimpleGradient = (
  props: GradientProps,
): props is SimpleGradientProps => {
  return "startColor" in props && "endColor" in props;
};

export const isAdvancedGradient = (
  props: GradientProps,
): props is AdvancedGradientProps => {
  return "gradient" in props;
};

// Utility types for component props
export type OptionalGradientProps<T = Record<string, never>> = T & {
  /**
   * Gradient configuration (optional)
   * Can be simple (startColor/endColor) or advanced (full configuration)
   */
  gradient?: GradientProps;
};

export type RequiredGradientProps<T = Record<string, never>> = T & {
  /**
   * Gradient configuration (required)
   * Can be simple (startColor/endColor) or advanced (full configuration)
   */
  gradient: GradientProps;
};
