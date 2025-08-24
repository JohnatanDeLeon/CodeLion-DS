import { spacing, semanticSpacing } from "../tokens/spacing.css";

/**
 * Calculate padding to avoid icon-placeholder overlap.
 * Returns an object with a logical padding property (paddingInlineStart / paddingInlineEnd)
 * position: 'left' | 'right'
 * iconSize: string token (defaults to spacing[4] -> 1rem)
 * extra: additional spacing token to add when needed (e.g. error icons)
 */
export const iconPadding = ({
  position = "left",
  iconSize = spacing[4],
  extra = spacing[1],
}: {
  position?: "left" | "right";
  iconSize?: string;
  extra?: string;
}) => {
  const property =
    position === "left" ? "paddingInlineStart" : "paddingInlineEnd";

  // base horizontal padding of the input is spacing[4]
  const basePadding = spacing[4];
  const gap = semanticSpacing.iconSpacing; // token (8px)

  return {
    [property]: `calc(${basePadding} + ${gap} + ${iconSize} + ${extra})`,
  } as const;
};
