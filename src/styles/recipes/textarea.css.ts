import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { shapeScale, spacing, typography } from "../tokens";
import { inputField, inputFieldError } from "./input.css";

/**
 * Textarea Component Styles
 *
 * Reuses the Input field so both read as the same control: same border,
 * ground, hover lift and focus ring. What changes is the height, which grows
 * with `rows` and the user's resize instead of being fixed per size.
 */

const textareaBase = style([
  inputField,
  {
    height: "auto",
    minHeight: spacing[24], // 96px, about four lines
    lineHeight: typography.lineHeight.normal,
    resize: "vertical",
    borderRadius: shapeScale.xl,
  },
]);

export const textareaRecipe = recipe({
  base: textareaBase,
  variants: {
    size: {
      sm: {
        padding: `${spacing[2]} ${spacing[3]}`, // 8px 12px
        fontSize: typography.fontSize.xs,
      },
      md: {
        padding: `${spacing[3]} ${spacing[4]}`, // 12px 16px
        fontSize: typography.fontSize.sm,
      },
      lg: {
        padding: `${spacing[4]} ${spacing[5]}`, // 16px 20px
        fontSize: typography.fontSize.base,
      },
    },
    state: {
      default: {},
      error: inputFieldError,
    },
    fullWidth: {
      false: {},
      true: { width: "100%" },
    },
  },
  defaultVariants: {
    size: "md",
    state: "default",
    fullWidth: false,
  },
});
