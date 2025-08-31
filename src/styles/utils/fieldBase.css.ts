import { spacing } from "../tokens/spacing.css";
import { typography } from "../tokens";

/**
 * fieldBase returns common styles for input-like fields.
 * size could be 'sm' | 'md' | 'lg' in future; for now we support a single size token.
 */
export const fieldBase = ({ size = "md" }: { size?: string } = {}) => {
  // currently we map size to minHeight and fontSize; can be extended later
  const minHeight = size === "sm" ? spacing[6] : spacing[10];

  return {
    minHeight,
    padding: `${spacing[3]} ${spacing[4]}`,
    // Ensure predictable sizing so height + padding behave as expected
    boxSizing: "border-box",
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    fontFamily: typography.fontFamily.sans,
  } as const;
};
