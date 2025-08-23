import { recipe } from "@vanilla-extract/recipes";
import { keyframes, style, createVar } from "@vanilla-extract/css";
import { colors, effects, typography, spacing } from "../tokens";

/**
 * CSS Custom Properties for Dynamic Gradients
 */
export const gradientHoverVar = createVar();
export const gradientActiveVar = createVar();
export const gradientFocusVar = createVar();

/**
 * Button Recipe
 * Comprehensive button styles with variants and states
 */
export const button = recipe({
  base: [
    {
      // Layout and positioning
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: spacing[2],

      // Typography
      fontFamily: typography.fontFamily.sans,
      fontWeight: typography.fontWeight.semibold,
      textDecoration: "none",
      whiteSpace: "nowrap",

      // Borders and shape
      border: "none",
      borderRadius: effects.borderRadius.md,
      cursor: "pointer",

      // Transitions
      transition: "all 200ms ease-out",

      // Focus states
      ":focus-visible": {
        outline: "2px solid transparent",
        outlineOffset: "2px",
        boxShadow: "0 0 0 2px currentColor",
      },

      // Disabled state
      ":disabled": {
        pointerEvents: "none",
        opacity: 0.6,
      },
    },
    {
      selectors: {
        "&:hover:not(:disabled)": {
          transform: "translateY(-1px)",
        },
        "&:active:not(:disabled)": {
          transform: "translateY(0)",
        },
      },
    },
  ],

  variants: {
    variant: {
      primary: [
        {
          backgroundColor: colors.primary[700],
          color: colors.white,
          boxShadow: effects.shadow.sm,
        },
        {
          selectors: {
            "&:hover:not(:disabled)": {
              backgroundColor: colors.primary[800],
              boxShadow: effects.shadow.md,
            },
            "&:active:not(:disabled)": {
              backgroundColor: colors.primary[900],
            },
            "&:focus-visible": {
              boxShadow: `0 0 0 2px ${colors.primary[500]}40`,
            },
          },
        },
      ],

      secondary: [
        {
          backgroundColor: colors.white,
          color: colors.neutral[700],
          border: `1px solid ${colors.neutral[200]}`,
          boxShadow: effects.shadow.sm,
        },
        {
          selectors: {
            "&:hover:not(:disabled)": {
              backgroundColor: colors.neutral[25],
              borderColor: colors.neutral[300],
              boxShadow: effects.shadow.md,
            },
            "&:active:not(:disabled)": {
              backgroundColor: colors.neutral[50],
            },
            "&:focus-visible": {
              boxShadow: `0 0 0 2px ${colors.primary[500]}40`,
              borderColor: colors.primary[500],
            },
          },
        },
      ],

      ghost: [
        {
          backgroundColor: "transparent",
          color: colors.neutral[700],
        },
        {
          selectors: {
            "&:hover:not(:disabled)": {
              backgroundColor: colors.neutral[100],
            },
            "&:active:not(:disabled)": {
              backgroundColor: colors.neutral[200],
            },
            "&:focus-visible": {
              boxShadow: `0 0 0 2px ${colors.primary[500]}40`,
            },
          },
        },
      ],

      destructive: [
        {
          backgroundColor: colors.error[600],
          color: colors.white,
          boxShadow: effects.shadow.sm,
        },
        {
          selectors: {
            "&:hover:not(:disabled)": {
              backgroundColor: colors.error[700],
              boxShadow: effects.shadow.md,
            },
            "&:active:not(:disabled)": {
              backgroundColor: colors.error[800],
            },
            "&:focus-visible": {
              boxShadow: `0 0 0 2px ${colors.error[500]}40`,
            },
          },
        },
      ],

      gradient: [
        {
          background: `linear-gradient(135deg, ${colors.primary[600]} 0%, ${colors.primary[700]} 100%)`,
          color: colors.white,
          boxShadow: effects.shadow.md,
        },
        {
          selectors: {
            "&:hover:not(:disabled)": {
              background: `linear-gradient(135deg, ${colors.primary[700]} 0%, ${colors.primary[800]} 100%)`,
              boxShadow: effects.shadow.lg,
            },
            "&:active:not(:disabled)": {
              background: `linear-gradient(135deg, ${colors.primary[800]} 0%, ${colors.primary[900]} 100%)`,
            },
            "&:focus-visible": {
              boxShadow: `0 0 0 2px ${colors.primary[500]}40, 0 0 20px ${colors.primary[500]}20`,
            },
          },
        },
      ],
    },

    size: {
      sm: {
        height: "2rem",
        paddingLeft: spacing[3],
        paddingRight: spacing[3],
        fontSize: typography.fontSize.xs,
        borderRadius: effects.borderRadius.sm,
      },

      md: {
        height: "2.5rem",
        paddingLeft: spacing[4],
        paddingRight: spacing[4],
        fontSize: typography.fontSize.sm,
      },

      lg: {
        height: "3rem",
        paddingLeft: spacing[6],
        paddingRight: spacing[6],
        fontSize: typography.fontSize.base,
        borderRadius: effects.borderRadius.lg,
      },

      xl: {
        height: "3.5rem",
        paddingLeft: spacing[8],
        paddingRight: spacing[8],
        fontSize: typography.fontSize.lg,
        borderRadius: effects.borderRadius.lg,
      },

      icon: {
        width: "2.5rem",
        height: "2.5rem",
        padding: "0",
      },
    },

    fullWidth: {
      true: {
        width: "100%",
      },
    },

    loading: {
      true: {
        pointerEvents: "none",
        opacity: 0.8,
      },
    },
  },

  defaultVariants: {
    variant: "primary",
    size: "md",
  },

  compoundVariants: [
    {
      variants: { size: "icon", variant: "ghost" },
      style: {
        selectors: {
          "&:hover:not(:disabled)": {
            backgroundColor: colors.neutral[100],
          },
        },
      },
    },
  ],
});

// Spinner animation for loading state
const spin = keyframes({
  to: { transform: "rotate(360deg)" },
});

export const spinner = style({
  animation: `${spin} 1s linear infinite`,
});

/**
 * Dynamic Gradient System
 * Scalable CSS custom properties for gradient customization
 */
export const gradientCustomClass = style({
  // Set up CSS custom properties with fallbacks
  vars: {
    [gradientHoverVar]: "var(--gradient-hover, inherit)",
    [gradientActiveVar]: "var(--gradient-active, inherit)",
    [gradientFocusVar]: "var(--gradient-focus, inherit)",
  },
  selectors: {
    "&:hover:not(:disabled)": {
      background: `${gradientHoverVar} !important`,
      boxShadow: effects.shadow.lg,
      transform: "translateY(-1px)",
    },
    "&:active:not(:disabled)": {
      background: `${gradientActiveVar} !important`,
      transform: "translateY(0)",
    },
    "&:focus-visible": {
      background: gradientFocusVar,
      boxShadow:
        "0 0 0 2px rgba(59, 130, 246, 0.4), 0 0 20px rgba(59, 130, 246, 0.2)",
    },
  },
});

/**
 * Utility Classes for Common Gradient Patterns
 */
export const gradientUtilities = {
  // Diagonal gradient (most common)
  diagonal: style({
    background:
      "linear-gradient(135deg, var(--gradient-start, transparent), var(--gradient-end, transparent))",
  }),

  // Vertical gradient
  vertical: style({
    background:
      "linear-gradient(to bottom, var(--gradient-start, transparent), var(--gradient-end, transparent))",
  }),

  // Horizontal gradient
  horizontal: style({
    background:
      "linear-gradient(to right, var(--gradient-start, transparent), var(--gradient-end, transparent))",
  }),

  // Radial gradient
  radial: style({
    background:
      "radial-gradient(circle, var(--gradient-start, transparent), var(--gradient-end, transparent))",
  }),
};
