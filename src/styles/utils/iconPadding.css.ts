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
  // use a slightly larger default icon size (spacing[5] = 1.25rem = 20px)
  // to match the recommended 16-20px range and avoid tight fits for SVGs
  iconSize = spacing[5],
  extra = spacing[1],
}: {
  position?: "left" | "right";
  iconSize?: string;
  extra?: string;
}) => {
  const property =
    position === "left" ? "paddingInlineStart" : "paddingInlineEnd";

  // base horizontal padding of the input is spacing[4] (16px).
  // Keep this aligned with the field base horizontal padding so
  // icon padding calculations produce the expected 44px placeholder
  // start: 16 (base) + 8 (gap) + 16 (icon) + 4 (extra) = 44px
  const basePadding = spacing[4];
  const gap = semanticSpacing.iconSpacing; // token (8px)

  return {
    [property]: `calc(${basePadding} + ${gap} + ${iconSize} + ${extra})`,
  } as const;
};
