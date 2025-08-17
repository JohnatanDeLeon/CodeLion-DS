/**
 * Design System Hooks
 * Custom React hooks for enhanced component functionality
 */

export {
  useGradient,
  useGradientPresets,
  useGradientAnimation,
} from "./useGradient";
export type { GradientHookOptions } from "../types/gradient";

// Formatting hooks
export { useInputFormat, useSimpleFormat } from "./useInputFormat";
export type { 
  UseInputFormatResult, 
  UseInputFormatOptions 
} from "../types/formatting";