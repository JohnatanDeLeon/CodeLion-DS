/**
 * Shared focus ring utility for components.
 * colorToken should be a resolved color string from tokens (e.g. colors.primary[500])
 * width is the ring thickness in px.
 */
export const focusRing = (colorToken: string, width = 2) => {
  const hexOpacity = (opacity: number) => {
    const v = Math.round(opacity * 255).toString(16);
    return v.padStart(2, "0");
  };

  const outerOpacity = hexOpacity(0.25);

  return {
    outline: "2px solid transparent",
    outlineOffset: "2px",
    ":focus-visible": {
      outline: "2px solid transparent",
      outlineOffset: "2px",
      boxShadow: `0 0 0 ${width}px ${colorToken}${outerOpacity}`,
    },
  } as const;
};
