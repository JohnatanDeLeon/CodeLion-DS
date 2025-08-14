import { designSystemConfig } from "../styles/tokens";

/**
 * Responsive utilities for design system components
 */

/**
 * Get media query for a specific breakpoint
 *
 * @param breakpoint - Breakpoint name
 * @returns CSS media query string
 *
 * @example
 * ```tsx
 * const mediaQuery = getMediaQuery('md'); // '@media (min-width: 768px)'
 * ```
 */
export function getMediaQuery(
  breakpoint: keyof typeof designSystemConfig.breakpoints,
): string {
  return `@media (min-width: ${designSystemConfig.breakpoints[breakpoint]})`;
}

/**
 * Creates responsive value utilities
 * Maps breakpoints to values for responsive design
 *
 * @example
 * ```tsx
 * const responsiveWidth = createResponsiveValue({
 *   xs: '100%',
 *   md: '50%',
 *   lg: '33.333%'
 * });
 * ```
 */
export function createResponsiveValue<T>(
  values: Partial<Record<keyof typeof designSystemConfig.breakpoints, T>>,
): Record<string, T> {
  const result: Record<string, T> = {};

  Object.entries(values).forEach(([breakpoint, value]) => {
    if (value !== undefined) {
      result[
        getMediaQuery(breakpoint as keyof typeof designSystemConfig.breakpoints)
      ] = value;
    }
  });

  return result;
}

/**
 * Type helper for responsive props
 */
export type ResponsiveValue<T> =
  | T
  | Partial<Record<keyof typeof designSystemConfig.breakpoints, T>>;

/**
 * Utility to resolve responsive values
 *
 * @param value - Responsive value or static value
 * @returns Resolved value for current context
 */
export function resolveResponsiveValue<T>(
  value: ResponsiveValue<T>,
  currentBreakpoint?: keyof typeof designSystemConfig.breakpoints,
): T {
  if (typeof value !== "object" || value === null) {
    return value;
  }

  const responsiveValue = value as Partial<
    Record<keyof typeof designSystemConfig.breakpoints, T>
  >;

  // If no current breakpoint specified, return the largest available value
  if (!currentBreakpoint) {
    const breakpoints = Object.keys(designSystemConfig.breakpoints) as Array<
      keyof typeof designSystemConfig.breakpoints
    >;
    for (let i = breakpoints.length - 1; i >= 0; i--) {
      const bp = breakpoints[i];
      if (responsiveValue[bp] !== undefined) {
        return responsiveValue[bp] as T;
      }
    }
  }

  // Return value for current breakpoint or fallback
  if (currentBreakpoint && responsiveValue[currentBreakpoint] !== undefined) {
    return responsiveValue[currentBreakpoint] as T;
  }

  return responsiveValue.xs ?? Object.values(responsiveValue)[0];
}

/**
 * Hook-like utility for responsive values (for use in vanilla-extract)
 */
export const responsive = {
  /**
   * Creates a responsive style object
   */
  style: createResponsiveValue,

  /**
   * Creates responsive spacing
   */
  spacing: (
    values: Partial<
      Record<keyof typeof designSystemConfig.breakpoints, string>
    >,
  ) => createResponsiveValue(values),

  /**
   * Creates responsive typography
   */
  fontSize: (
    values: Partial<
      Record<keyof typeof designSystemConfig.breakpoints, string>
    >,
  ) => createResponsiveValue(values),
} as const;
