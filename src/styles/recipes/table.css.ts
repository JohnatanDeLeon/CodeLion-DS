import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { colors, effects, spacing, typography } from "../tokens";

/**
 * Table Component Styles
 *
 * Data first: hairline row separators instead of cell borders, a quiet
 * header, and tabular figures so numbers line up. The wrapper scrolls on its
 * own so a wide table never pushes the page sideways on a phone.
 */

export const tableWrapper = style({
  width: "100%",
  overflowX: "auto",
  border: `1px solid ${colors.neutral[200]}`,
  borderRadius: effects.borderRadius.lg,
  backgroundColor: colors.white,
});

export const tableRecipe = recipe({
  base: {
    width: "100%",
    borderCollapse: "collapse",
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.sm,
    color: colors.neutral[800],
    fontVariantNumeric: "tabular-nums",
  },
  variants: {
    size: {
      sm: {},
      md: {},
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const tableCaption = style({
  captionSide: "top",
  textAlign: "left",
  padding: `${spacing[3]} ${spacing[4]}`,
  fontWeight: typography.fontWeight.semibold,
  color: colors.neutral[900],
});

export const tableHead = style({
  backgroundColor: colors.neutral[50],
});

export const tableRow = style({
  borderBottom: `1px solid ${colors.neutral[200]}`,
  selectors: {
    "tbody > &:last-child": {
      borderBottom: "none",
    },
  },
});

export const tableRowStriped = style({
  selectors: {
    "tbody > &:nth-child(even)": {
      backgroundColor: colors.neutral[25],
    },
  },
});

const cellBase = {
  textAlign: "left",
  verticalAlign: "middle",
} as const;

export const tableCellRecipe = recipe({
  base: cellBase,
  variants: {
    size: {
      sm: { padding: `${spacing[2]} ${spacing[3]}` },
      md: { padding: `${spacing[3]} ${spacing[4]}` },
    },
    align: {
      start: { textAlign: "left" },
      end: { textAlign: "right" },
    },
  },
  defaultVariants: {
    size: "md",
    align: "start",
  },
});

export const tableHeaderCell = style({
  fontSize: typography.fontSize.xs,
  fontWeight: typography.fontWeight.semibold,
  letterSpacing: typography.letterSpacing.wide,
  textTransform: "uppercase",
  color: colors.neutral[600],
  whiteSpace: "nowrap",
});
