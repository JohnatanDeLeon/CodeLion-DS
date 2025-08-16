/**
 * Gradient Hooks
 * Custom hooks for gradient functionality in components
 */

import { useMemo, useCallback } from "react";
import { darkenColor, lightenColor } from "../utils/color";
import {
  type GradientProps,
  type GradientConfig,
  type GradientStateConfig,
  type GradientStyles,
  type GradientHookOptions,
  type GradientDirection,
  type SimpleGradientProps,
  type AdvancedGradientProps,
  isSimpleGradient,
  isAdvancedGradient,
} from "../types/gradient";

/**
 * Convert gradient direction to CSS value
 */
const getGradientDirection = (direction: GradientDirection): string => {
  if (typeof direction === "number") {
    return `${direction}deg`;
  }

  const directionMap: Record<string, string> = {
    "to-top": "to top",
    "to-bottom": "to bottom",
    "to-left": "to left",
    "to-right": "to right",
    "to-top-left": "to top left",
    "to-top-right": "to top right",
    "to-bottom-left": "to bottom left",
    "to-bottom-right": "to bottom right",
  };

  return directionMap[direction] || "135deg";
};

/**
 * Generate CSS gradient string from config
 */
const generateGradientCSS = (config: GradientConfig): string => {
  const direction = getGradientDirection(config.direction || 135);
  const stops = config.stops
    .map(
      (stop) =>
        `${stop.color}${stop.position !== undefined ? ` ${stop.position}%` : ""}`,
    )
    .join(", ");

  return `linear-gradient(${direction}, ${stops})`;
};

/**
 * Convert simple gradient props to advanced configuration
 */
const convertSimpleToAdvanced = (
  props: SimpleGradientProps,
  options: GradientHookOptions,
): GradientStateConfig => {
  const {
    startColor,
    endColor,
    direction = 135,
    hoverStartColor,
    hoverEndColor,
  } = props;
  const { hoverDarkenAmount = 0.15, activeDarkenAmount = 0.25 } = options;

  const defaultConfig: GradientConfig = {
    direction,
    stops: [
      { color: startColor, position: 0 },
      { color: endColor, position: 100 },
    ],
    fallback: startColor,
  };

  const hoverConfig: GradientConfig = {
    direction,
    stops: [
      {
        color:
          hoverStartColor ||
          darkenColor(startColor, { amount: hoverDarkenAmount }),
        position: 0,
      },
      {
        color:
          hoverEndColor || darkenColor(endColor, { amount: hoverDarkenAmount }),
        position: 100,
      },
    ],
    fallback:
      hoverStartColor || darkenColor(startColor, { amount: hoverDarkenAmount }),
  };

  const activeConfig: GradientConfig = {
    direction,
    stops: [
      {
        color: darkenColor(hoverStartColor || startColor, {
          amount: activeDarkenAmount,
        }),
        position: 0,
      },
      {
        color: darkenColor(hoverEndColor || endColor, {
          amount: activeDarkenAmount,
        }),
        position: 100,
      },
    ],
    fallback: darkenColor(hoverStartColor || startColor, {
      amount: activeDarkenAmount,
    }),
  };

  return {
    default: defaultConfig,
    hover: hoverConfig,
    active: activeConfig,
  };
};

/**
 * Hook for gradient functionality
 */
export const useGradient = (
  gradientProps?: GradientProps,
  options: GradientHookOptions = {},
): GradientStyles | null => {
  const { generateCustomProperties = true, cssPropertyPrefix = "gradient" } =
    options;

  const gradientConfig = useMemo((): GradientStateConfig | null => {
    if (!gradientProps) return null;

    if (isSimpleGradient(gradientProps)) {
      return convertSimpleToAdvanced(gradientProps, options);
    }

    if (isAdvancedGradient(gradientProps)) {
      return gradientProps.gradient;
    }

    return null;
  }, [gradientProps, options]);

  const styles = useMemo((): GradientStyles | null => {
    if (!gradientConfig) return null;

    const background = generateGradientCSS(gradientConfig.default);
    const customProperties: Record<string, string> = {};

    if (generateCustomProperties) {
      if (gradientConfig.hover) {
        customProperties[`--${cssPropertyPrefix}-hover`] = generateGradientCSS(
          gradientConfig.hover,
        );
      }

      if (gradientConfig.active) {
        customProperties[`--${cssPropertyPrefix}-active`] = generateGradientCSS(
          gradientConfig.active,
        );
      }

      if (gradientConfig.focus) {
        customProperties[`--${cssPropertyPrefix}-focus`] = generateGradientCSS(
          gradientConfig.focus,
        );
      }

      if (gradientConfig.disabled) {
        customProperties[`--${cssPropertyPrefix}-disabled`] =
          generateGradientCSS(gradientConfig.disabled);
      }
    }

    return {
      background,
      customProperties,
      className: generateCustomProperties
        ? `${cssPropertyPrefix}-custom`
        : undefined,
    };
  }, [gradientConfig, generateCustomProperties, cssPropertyPrefix]);

  return styles;
};

/**
 * Hook for creating gradient presets
 */
export const useGradientPresets = () => {
  const createPreset = useCallback(
    (
      name: string,
      startColor: string,
      endColor: string,
      direction: GradientDirection = 135,
    ): SimpleGradientProps => ({
      startColor,
      endColor,
      direction,
    }),
    [],
  );

  const presets = useMemo(
    () => ({
      // Brand gradients
      primary: createPreset("primary", "#667eea", "#764ba2"),
      secondary: createPreset("secondary", "#f093fb", "#f5576c"),

      // Mood gradients
      sunset: createPreset("sunset", "#ff9a9e", "#fecfef"),
      ocean: createPreset("ocean", "#a8edea", "#fed6e3"),
      forest: createPreset("forest", "#11998e", "#38ef7d"),
      fire: createPreset("fire", "#f12711", "#f5af19"),

      // Neutral gradients
      silver: createPreset("silver", "#bdc3c7", "#2c3e50"),
      graphite: createPreset("graphite", "#232526", "#414345"),

      // Utility gradients
      success: createPreset("success", "#56ab2f", "#a8e6cf"),
      warning: createPreset("warning", "#f7931e", "#ffd200"),
      error: createPreset("error", "#ee5a52", "#f093fb"),
      info: createPreset("info", "#3b82f6", "#06b6d4"),
    }),
    [createPreset],
  );

  return { presets, createPreset };
};

/**
 * Hook for gradient animation utilities
 */
export const useGradientAnimation = () => {
  const createAnimatedGradient = useCallback(
    (config: GradientConfig, _duration: number = 3000): GradientConfig => {
      // Add animation properties to the gradient config
      // This could be extended to create moving gradients, color cycling, etc.
      // TODO: Implement animation using duration parameter
      return {
        ...config,
        // Add animation-specific properties here
      };
    },
    [],
  );

  const createPulsingGradient = useCallback(
    (
      baseGradient: SimpleGradientProps,
      intensity: number = 0.1,
    ): AdvancedGradientProps => {
      const { startColor, endColor, direction } = baseGradient;

      const lightenedStart = lightenColor(startColor, { amount: intensity });
      const lightenedEnd = lightenColor(endColor, { amount: intensity });

      return {
        gradient: {
          default: {
            direction,
            stops: [
              { color: startColor, position: 0 },
              { color: endColor, position: 100 },
            ],
          },
          hover: {
            direction,
            stops: [
              { color: lightenedStart, position: 0 },
              { color: lightenedEnd, position: 100 },
            ],
          },
          active: {
            direction,
            stops: [
              {
                color: darkenColor(startColor, { amount: intensity }),
                position: 0,
              },
              {
                color: darkenColor(endColor, { amount: intensity }),
                position: 100,
              },
            ],
          },
        },
      };
    },
    [],
  );

  return { createAnimatedGradient, createPulsingGradient };
};
