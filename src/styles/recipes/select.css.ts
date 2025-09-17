import { style, keyframes } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import {
  colors,
  effects,
  shapeScale,
  typography,
  spacing,
  animation,
} from "../tokens";
import { focusRing } from "../utils/focusRing.css";
import { fieldBase } from "../utils/fieldBase.css";
import { iconPadding } from "../utils/iconPadding.css";

/**
 * Select Component Styles (stub) – aligned with Input
 */

export const selectContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: spacing[2.5], // 10px
});

export const selectWrapper = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  width: "100%",
});

export const selectField = style({
  width: "100%",
  ...fieldBase(),
  borderRadius: shapeScale.xl,
  border: `1px solid ${colors.neutral[300]}`,
  backgroundColor: colors.neutral[25],
  // Ensure readable text color is explicitly set (don’t rely on inheritance)
  color: colors.neutral[900],
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.semibold,
  fontFamily: typography.fontFamily.sans,
  transition: `all ${animation.duration.normal} ${animation.easing.easeInOut}`,
  boxShadow: `${effects.shadow.xs}, inset 0 1px 2px ${colors.neutral[200]}25`,
  // apply shared focus ring at root level
  ...focusRing(colors.primary[500], 3),
  // Hide native arrow across browsers; we'll render our own chevron
  appearance: "none",
  WebkitAppearance: "none",
  MozAppearance: "none",
  // Reserve space for custom right icon by default (md computes ~48px)
  ...iconPadding({
    position: "right",
    iconSize: spacing[5],
    extra: spacing[1],
  }),

  selectors: {
    "&:focus-visible": {
      borderColor: colors.primary[600],
      backgroundColor: colors.white,
      boxShadow: [
        `0 0 0 3px ${colors.primary[500]}30`,
        `0 0 30px ${colors.primary[500]}15`,
        `${effects.shadow.md}`,
        `inset 0 1px 0 ${colors.white}`,
      ].join(", "),
    },
    "&:hover": {
      borderColor: colors.neutral[400],
      backgroundColor: colors.white,
      boxShadow: `${effects.shadow.sm}, 0 0 0 1px ${colors.neutral[300]}40`,
      transform: "translateY(-1px)",
    },
    "&:not(:disabled)": {
      cursor: "pointer",
    },
    "&:disabled": {
      cursor: "not-allowed",
      opacity: 0.6,
      backgroundColor: colors.neutral[100],
      borderColor: colors.neutral[200],
      boxShadow: "none",
    },
    // IE/legacy Edge arrow
    "&::-ms-expand": {
      display: "none",
    },
    "&[data-placeholder='true']": {
      color: colors.neutral[500],
      fontWeight: typography.fontWeight.medium,
    },
  },
});

export const selectLabel = style({
  display: "block",
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.semibold,
  color: colors.neutral[800],
  letterSpacing: typography.letterSpacing.tight,
  fontFamily: typography.fontFamily.sans,
  marginBottom: spacing[1.5],
});

export const selectLabelRequired = style({
  selectors: {
    "&::after": {
      content: " *",
      color: colors.error[500],
    },
  },
});

export const selectLabelError = style({
  color: colors.error[700],
});

export const selectHint = style({
  fontSize: typography.fontSize.sm,
  color: colors.neutral[700],
  fontWeight: typography.fontWeight.medium,
  fontFamily: typography.fontFamily.sans,
  marginTop: spacing[1.5],
});

export const selectErrorMessage = style({
  fontSize: typography.fontSize.sm,
  color: colors.error[700],
  fontWeight: typography.fontWeight.semibold,
  fontFamily: typography.fontFamily.sans,
  marginTop: spacing[3],
});

export const selectFieldError = style({
  borderColor: colors.error[400],
  backgroundColor: colors.error[50],
  boxShadow: `${effects.shadow.xs}, inset 0 1px 2px ${colors.error[200]}25`,
  selectors: {
    "&:hover": {
      borderColor: colors.error[500],
      backgroundColor: colors.error[50],
      boxShadow: `${effects.shadow.sm}, 0 0 0 1px ${colors.error[400]}40`,
    },
    "&:focus-visible": {
      borderColor: colors.error[600],
      backgroundColor: colors.white,
      boxShadow: [
        `0 0 0 3px ${colors.error[500]}30`,
        `0 0 30px ${colors.error[500]}15`,
        `${effects.shadow.md}`,
        `inset 0 1px 0 ${colors.white}`,
      ].join(", "),
    },
  },
});

export const selectFieldSuccess = style({
  borderColor: colors.success[400],
  backgroundColor: colors.success[50],
  boxShadow: `${effects.shadow.xs}, inset 0 1px 2px ${colors.success[200]}25`,
  selectors: {
    "&:hover": {
      borderColor: colors.success[500],
      backgroundColor: colors.success[50],
      boxShadow: `${effects.shadow.sm}, 0 0 0 1px ${colors.success[400]}40`,
    },
    "&:focus-visible": {
      borderColor: colors.success[600],
      backgroundColor: colors.white,
      boxShadow: [
        `0 0 0 3px ${colors.success[500]}30`,
        `0 0 30px ${colors.success[500]}15`,
        `${effects.shadow.md}`,
        `inset 0 1px 0 ${colors.white}`,
      ].join(", "),
    },
  },
});

export const selectFieldWarning = style({
  borderColor: colors.warning[400],
  backgroundColor: colors.warning[50],
  boxShadow: `${effects.shadow.xs}, inset 0 1px 2px ${colors.warning[200]}25`,
  selectors: {
    "&:hover": {
      borderColor: colors.warning[500],
      backgroundColor: colors.warning[50],
      boxShadow: `${effects.shadow.sm}, 0 0 0 1px ${colors.warning[400]}40`,
    },
    "&:focus-visible": {
      borderColor: colors.warning[600],
      backgroundColor: colors.white,
      boxShadow: [
        `0 0 0 3px ${colors.warning[500]}30`,
        `0 0 30px ${colors.warning[500]}15`,
        `${effects.shadow.md}`,
        `inset 0 1px 0 ${colors.white}`,
      ].join(", "),
    },
  },
});

export const selectFieldSmall = style({
  // Use minHeight to avoid height/padding conflicts that can hide text on Windows
  minHeight: spacing[8],
  padding: `${spacing[2]} ${spacing[3]}`,
  fontSize: typography.fontSize.xs,
});

export const selectFieldMedium = style({
  // Match defaults from fieldBase but keep explicit to control per-size behavior
  minHeight: spacing[10],
  padding: `${spacing[3]} ${spacing[4]}`,
  fontSize: typography.fontSize.sm,
});

export const selectFieldLarge = style({
  // Larger control without forcing line-height to equal the element height
  minHeight: spacing[12],
  padding: `${spacing[4]} ${spacing[5]}`,
  fontSize: typography.fontSize.base,
});

export const selectFullWidth = style({ width: "100%" });

// Right icon container (chevron)
export const selectRightIcon = style({
  position: "absolute",
  insetInlineEnd: spacing[5], // 20px from right
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 10,
  pointerEvents: "none",
  color: colors.neutral[500],
  transition: `all ${animation.duration.normal} ${animation.easing.easeInOut}`,
  width: spacing[5],
  height: spacing[5],
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  selectors: {
    [`${selectWrapper}:hover &`]: {
      color: colors.neutral[600],
      filter: "drop-shadow(0 2px 2px rgba(0, 0, 0, 0.1))",
      transform: "translateY(-50%) scale(1.05)",
    },
    [`${selectWrapper}:focus-within &`]: {
      color: colors.primary[600],
      filter: [
        "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15))",
        `drop-shadow(0 0 8px ${colors.primary[500]}40)`,
      ].join(" "),
      transform: "translateY(-50%) scale(1.1) rotate(180deg)",
    },
    [`${selectField}:disabled ~ &`]: {
      color: colors.neutral[400],
      opacity: 0.6,
    },
  },
});
// Keep native select field recipe available for potential use cases
export const selectNativeRecipe = recipe({
  base: [selectField],
  variants: {
    uiSize: {
      sm: [selectFieldSmall, { borderRadius: shapeScale.xl }],
      md: [selectFieldMedium, { borderRadius: shapeScale.xl }],
      lg: [selectFieldLarge, { borderRadius: shapeScale.xl }],
      xl: [selectFieldLarge, { borderRadius: shapeScale.xl }],
    },
    state: {
      default: {},
      error: selectFieldError,
      success: selectFieldSuccess,
      warning: selectFieldWarning,
    },
    fullWidth: {
      false: {},
      true: selectFullWidth,
    },
  },
  defaultVariants: {
    uiSize: "md",
    state: "default",
    fullWidth: false,
  },
  compoundVariants: [
    { variants: { uiSize: "md" }, style: { paddingRight: "2.75rem" } },
    { variants: { uiSize: "sm" }, style: { paddingRight: "2.75rem" } },
    { variants: { uiSize: "lg" }, style: { paddingRight: "2.75rem" } },
    { variants: { uiSize: "xl" }, style: { paddingRight: "2.75rem" } },
  ],
});

// =====================
// Overlay-based Select (unified)
// =====================

// Fade/slide for the popover
const slideDown = keyframes({
  "0%": { opacity: 0, transform: "translateY(-4px) scale(0.98)" },
  "100%": { opacity: 1, transform: "translateY(0) scale(1)" },
});

// Trigger button (reuses input-like styling)
export const selectTrigger = style({
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
      borderColor: `var(--select-focus-ring-color, ${colors.primary[600]})`,
      backgroundColor: colors.white,
      // Do not apply focus ring here; keep ring only on :focus-visible to match Input behavior
    },
    "&:disabled": {
      cursor: "not-allowed",
      opacity: 0.6,
      backgroundColor: colors.neutral[100],
      borderColor: colors.neutral[200],
      boxShadow: "none",
      transform: "none",
    },
    // Match Input's layered focus ring intensities, allow color override via CSS variable
    "&:focus-visible": {
      outline: "2px solid transparent",
      outlineOffset: "2px",
      borderColor: `var(--select-focus-ring-color, ${colors.primary[600]})`,
      boxShadow: [
        `0 0 0 3px color-mix(in srgb, var(--select-focus-ring-color, ${colors.primary[500]}) 18.8%, transparent)`,
        `0 0 30px color-mix(in srgb, var(--select-focus-ring-color, ${colors.primary[500]}) 8.2%, transparent)`,
        `${effects.shadow.md}`,
        `inset 0 1px 0 ${colors.white}`,
      ].join(", "),
    },
  },
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

const triggerStateError = style({
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
const triggerStateSuccess = style({
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
const triggerStateWarning = style({
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

export const selectRecipe = recipe({
  base: [selectTrigger],
  variants: {
    uiSize: {
      sm: [triggerSm, { borderRadius: shapeScale.xl }],
      md: [triggerMd, { borderRadius: shapeScale.xl }],
      lg: [triggerLg, { borderRadius: shapeScale.xl }],
      xl: [triggerLg, { borderRadius: shapeScale.xl }],
    },
    state: {
      default: {},
      error: triggerStateError,
      success: triggerStateSuccess,
      warning: triggerStateWarning,
    },
    fullWidth: {
      false: {},
      true: selectFullWidth,
    },
  },
  defaultVariants: {
    uiSize: "md",
    state: "default",
    fullWidth: false,
  },
});

export const selectTriggerLabel = style({
  flex: 1,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const selectChevron = style({
  marginInlineStart: "auto",
  color: colors.neutral[500],
  width: spacing[5],
  height: spacing[5],
  transition: `transform ${animation.duration.normal} ${animation.easing.easeInOut}, color ${animation.duration.normal} ${animation.easing.easeInOut}`,
  selectors: {
    [`${selectTrigger}[aria-expanded='true'] &`]: {
      transform: "rotate(180deg)",
      color: colors.primary[600],
    },
    [`${selectTrigger}:disabled &`]: {
      color: colors.neutral[400],
    },
  },
});

export const selectPopover = style({
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

export const selectListbox = style({
  padding: `${spacing[1]} 0`,
});

// Optional scroll behavior for long lists
export const selectListboxScrollable = style({
  maxHeight: "16rem", // 256px
  overflowY: "auto",
});

export const selectOption = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    gap: spacing[2],
    width: "100%",
    padding: `${spacing[2.5]} ${spacing[3]}`,
    fontSize: typography.fontSize.sm,
    lineHeight: 1.5,
    color: `var(--select-option-text-color, ${colors.neutral[800]})`,
    backgroundColor: "transparent",
    cursor: "pointer",
    userSelect: "none",
    selectors: {
      "&:hover": {
        backgroundColor: `var(--select-option-hover-bg, ${colors.primary[50]})`,
        color: `var(--select-option-hover-color, ${colors.primary[800]})`,
      },
      "&[aria-disabled='true']:hover": {
        backgroundColor: "transparent",
        color: colors.neutral[500],
      },
    },
  },
  variants: {
    active: {
      false: {},
      true: {
        backgroundColor: `var(--select-option-hover-bg, ${colors.primary[50]})`,
        color: `var(--select-option-hover-color, ${colors.primary[800]})`,
      },
    },
    selected: {
      false: {},
      true: {
        backgroundColor: `var(--select-option-selected-bg, ${colors.primary[100]})`,
        color: `var(--select-option-selected-color, ${colors.primary[900]})`,
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

export const selectCheck = style({
  marginInlineStart: "auto",
  color: `var(--select-check-color, ${colors.primary[600]})`,
});
