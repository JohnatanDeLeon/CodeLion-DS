import { style, keyframes } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import {
  colors,
  effects,
  shapeScale,
  spacing,
  typography,
  animation,
} from "../tokens";
import { focusRing } from "../utils/focusRing.css";
import { fieldBase } from "../utils/fieldBase.css";

// Fade/slide for the popover
const slideDown = keyframes({
  "0%": { opacity: 0, transform: "translateY(-4px) scale(0.98)" },
  "100%": { opacity: 1, transform: "translateY(0) scale(1)" },
});

export const selectCustomContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: spacing[2.5],
});

export const selectCustomWrapper = style({
  position: "relative",
  width: "100%",
});

// Trigger button (reuses input-like styling)
export const selectCustomTrigger = style({
  width: "100%",
  ...fieldBase(),
  borderRadius: shapeScale.xl,
  border: `1px solid ${colors.neutral[300]}`,
  backgroundColor: colors.neutral[25],
  color: colors.neutral[900],
  textAlign: "left",
  display: "flex",
  alignItems: "center",
  gap: spacing[2],
  transition: `all ${animation.duration.normal} ${animation.easing.easeInOut}`,
  boxShadow: `${effects.shadow.xs}, inset 0 1px 2px ${colors.neutral[200]}25`,
  cursor: "pointer",
  selectors: {
    "&:hover": {
      borderColor: colors.neutral[400],
      backgroundColor: colors.white,
      boxShadow: `${effects.shadow.sm}, 0 0 0 1px ${colors.neutral[300]}40`,
      transform: "translateY(-1px)",
    },
    "&[aria-expanded='true']": {
      borderColor: colors.primary[600],
      backgroundColor: colors.white,
      boxShadow: [
        `0 0 0 3px ${colors.primary[500]}30`,
        `0 0 30px ${colors.primary[500]}15`,
        `${effects.shadow.md}`,
        `inset 0 1px 0 ${colors.white}`,
      ].join(", "),
    },
    "&:disabled": {
      cursor: "not-allowed",
      opacity: 0.6,
      backgroundColor: colors.neutral[100],
      borderColor: colors.neutral[200],
      boxShadow: "none",
      transform: "none",
    },
  },
  ...focusRing(colors.primary[500], 3),
});

// Size variants (match input scale)
const triggerSm = style({
  minHeight: spacing[8],
  padding: `${spacing[2]} ${spacing[3]}`,
  fontSize: typography.fontSize.xs,
});
const triggerMd = style({
  minHeight: spacing[10],
  padding: `${spacing[3]} ${spacing[4]}`,
  fontSize: typography.fontSize.sm,
});
const triggerLg = style({
  minHeight: spacing[12],
  padding: `${spacing[4]} ${spacing[5]}`,
  fontSize: typography.fontSize.base,
});

const stateError = style({
  borderColor: colors.error[400],
  backgroundColor: colors.error[50],
  boxShadow: `${effects.shadow.xs}, inset 0 1px 2px ${colors.error[200]}25`,
  selectors: {
    "&:hover": {
      borderColor: colors.error[500],
      backgroundColor: colors.error[50],
      boxShadow: `${effects.shadow.sm}, 0 0 0 1px ${colors.error[400]}40`,
    },
  },
});
const stateSuccess = style({
  borderColor: colors.success[400],
  backgroundColor: colors.success[50],
  boxShadow: `${effects.shadow.xs}, inset 0 1px 2px ${colors.success[200]}25`,
  selectors: {
    "&:hover": {
      borderColor: colors.success[500],
      backgroundColor: colors.success[50],
      boxShadow: `${effects.shadow.sm}, 0 0 0 1px ${colors.success[400]}40`,
    },
  },
});
const stateWarning = style({
  borderColor: colors.warning[400],
  backgroundColor: colors.warning[50],
  boxShadow: `${effects.shadow.xs}, inset 0 1px 2px ${colors.warning[200]}25`,
  selectors: {
    "&:hover": {
      borderColor: colors.warning[500],
      backgroundColor: colors.warning[50],
      boxShadow: `${effects.shadow.sm}, 0 0 0 1px ${colors.warning[400]}40`,
    },
  },
});

export const selectCustomFullWidth = style({ width: "100%" });

export const selectCustomRecipe = recipe({
  base: [selectCustomTrigger],
  variants: {
    uiSize: {
      sm: [triggerSm, { borderRadius: shapeScale.xl }],
      md: [triggerMd, { borderRadius: shapeScale.xl }],
      lg: [triggerLg, { borderRadius: shapeScale.xl }],
      xl: [triggerLg, { borderRadius: shapeScale.xl }],
    },
    state: {
      default: {},
      error: stateError,
      success: stateSuccess,
      warning: stateWarning,
    },
    fullWidth: {
      false: {},
      true: selectCustomFullWidth,
    },
  },
  defaultVariants: {
    uiSize: "md",
    state: "default",
    fullWidth: false,
  },
});

export const selectCustomTriggerLabel = style({
  flex: 1,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const selectCustomChevon = style({
  marginInlineStart: "auto",
  color: colors.neutral[500],
  width: spacing[5],
  height: spacing[5],
  transition: `transform ${animation.duration.normal} ${animation.easing.easeInOut}, color ${animation.duration.normal} ${animation.easing.easeInOut}`,
  selectors: {
    [`${selectCustomTrigger}[aria-expanded='true'] &`]: {
      transform: "rotate(180deg)",
      color: colors.primary[600],
    },
    [`${selectCustomTrigger}:disabled &`]: {
      color: colors.neutral[400],
    },
  },
});

export const selectCustomLabel = style({
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.semibold,
  color: colors.neutral[800],
});

export const selectCustomPopover = style({
  position: "absolute",
  top: `calc(100% + ${spacing[1]})`,
  left: 0,
  width: "100%",
  backgroundColor: colors.white,
  border: `1px solid ${colors.neutral[200]}`,
  borderRadius: shapeScale.lg,
  boxShadow: `${effects.shadow.lg}, 0 8px 24px ${colors.neutral[900]}14`,
  zIndex: 50,
  animationName: slideDown,
  animationDuration: animation.duration.fast,
  animationTimingFunction: animation.easing.easeOut,
  overflow: "hidden",
});

export const selectCustomListbox = style({
  maxHeight: "16rem", // 256px
  overflowY: "auto",
  padding: `${spacing[1]} 0`,
});

export const selectCustomOption = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    gap: spacing[2],
    width: "100%",
    padding: `${spacing[2.5]} ${spacing[3]}`,
    fontSize: typography.fontSize.sm,
    lineHeight: 1.5,
    color: colors.neutral[800],
    backgroundColor: "transparent",
    cursor: "pointer",
    userSelect: "none",
  },
  variants: {
    active: {
      false: {},
      true: {
        backgroundColor: colors.primary[50],
        color: colors.primary[800],
      },
    },
    selected: {
      false: {},
      true: {
        backgroundColor: colors.primary[100],
        color: colors.primary[900],
        fontWeight: typography.fontWeight.semibold,
      },
    },
    disabled: {
      false: {},
      true: {
        color: colors.neutral[500],
        cursor: "not-allowed",
      },
    },
  },
});

export const selectCustomCheck = style({
  marginInlineStart: "auto",
  color: colors.primary[600],
});
