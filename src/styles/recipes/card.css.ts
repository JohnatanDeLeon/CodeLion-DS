import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { colors, spacing, effects, componentShadows } from "../tokens";

// Base card styles
export const cardBase = style({
  backgroundColor: colors.white,
  borderRadius: effects.borderRadius.lg,
  border: `1px solid ${colors.neutral[200]}`,
  boxShadow: componentShadows.card,
  transition: `all 250ms ease-out`,
  overflow: "hidden",
  position: "relative",

  ":hover": {
    boxShadow: componentShadows.cardHover,
    borderColor: colors.neutral[300],
  },
});

// Card variants using recipe
export const cardVariants = recipe({
  base: cardBase,

  variants: {
    size: {
      sm: {
        padding: spacing[4], // 16px
      },
      md: {
        padding: spacing[6], // 24px
      },
      lg: {
        padding: spacing[8], // 32px
      },
      xl: {
        padding: `${spacing[10]} ${spacing[12]}`, // 40px 48px
      },
    },

    elevation: {
      flat: {
        boxShadow: "none",
        border: `1px solid ${colors.neutral[200]}`,
      },
      low: {
        boxShadow: componentShadows.card,
      },
      medium: {
        boxShadow: componentShadows.cardHover,
      },
      high: {
        boxShadow: effects.shadow.lg,
      },
    },

    variant: {
      default: {
        backgroundColor: colors.white,
        borderColor: colors.neutral[200],
      },
      outlined: {
        backgroundColor: "transparent",
        borderColor: colors.neutral[300],
        borderWidth: "2px",
      },
      filled: {
        backgroundColor: colors.neutral[50],
        borderColor: colors.neutral[200],
      },
      gradient: {
        background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.neutral[25]} 100%)`,
        borderColor: colors.neutral[200],
      },
    },

    interactive: {
      true: {
        cursor: "pointer",
        ":hover": {
          transform: "translateY(-2px)",
          boxShadow: effects.shadow.md,
        },
        ":active": {
          transform: "translateY(0)",
        },
        ":focus": {
          outline: "none",
          borderColor: colors.primary[500],
          boxShadow: `0 0 0 3px ${colors.primary[100]}`,
        },
        ":focus-visible": {
          outline: "none",
          borderColor: colors.primary[500],
          boxShadow: `0 0 0 3px ${colors.primary[100]}`,
        },
      },
      false: {},
    },
  },

  defaultVariants: {
    size: "md",
    elevation: "low",
    variant: "default",
    interactive: false,
  },
});

// Card header styles
export const cardHeader = style({
  marginBottom: spacing[4],
  paddingBottom: spacing[4],
  borderBottom: `1px solid ${colors.neutral[200]}`,
});

// Card body styles
export const cardBody = style({
  flex: 1,
});

// Card footer styles
export const cardFooter = style({
  marginTop: spacing[6],
  paddingTop: spacing[4],
  borderTop: `1px solid ${colors.neutral[200]}`,
  display: "flex",
  gap: spacing[3],
  justifyContent: "flex-end",
  alignItems: "center",
});

// Form-specific card styles
export const formCard = style([
  cardBase,
  {
    padding: spacing[6],
    maxWidth: "28rem", // 448px
    width: "100%",
  },
]);

export const formCardHeader = style({
  textAlign: "center",
  marginBottom: spacing[6],
});

export const formCardBody = style({
  display: "flex",
  flexDirection: "column",
  gap: spacing[4],
});

export const formCardFooter = style({
  marginTop: spacing[6],
  display: "flex",
  flexDirection: "column",
  gap: spacing[3],
});
