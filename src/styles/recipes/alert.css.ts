import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { colors, effects, spacing, typography } from "../tokens";

/**
 * Alert Component Styles
 *
 * A message that belongs to the page, not to a field: a form that failed
 * for a reason no input caused, or the confirmation after an action. Each
 * tone uses its own semantic palette at the same steps, so they read as one
 * family: a 50 ground, a 200 border and 800 text for AA contrast.
 */

const tone = (palette: typeof colors.info) => ({
  backgroundColor: palette[50],
  borderColor: palette[200],
  color: palette[800],
});

export const alertRecipe = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    gap: spacing[1],
    padding: `${spacing[3]} ${spacing[4]}`,
    border: "1px solid",
    borderLeftWidth: spacing[1],
    borderRadius: effects.borderRadius.lg,
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.sm,
    lineHeight: typography.lineHeight.normal,
  },
  variants: {
    variant: {
      info: tone(colors.info),
      success: tone(colors.success),
      warning: tone(colors.warning),
      error: tone(colors.error),
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

export const alertTitle = style({
  fontWeight: typography.fontWeight.semibold,
  margin: 0,
  fontSize: typography.fontSize.sm,
});

export const alertBody = style({
  margin: 0,
});
