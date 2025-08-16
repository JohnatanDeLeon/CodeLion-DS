/**
 * Color Utilities
 * Comprehensive color manipulation utilities for design system components
 */

export type ColorFormat = "hex" | "rgb" | "rgba" | "hsl" | "hsla";

export interface RGBColor {
  r: number;
  g: number;
  b: number;
}

export interface HSLColor {
  h: number;
  s: number;
  l: number;
}

export interface ColorManipulationOptions {
  amount?: number;
  format?: ColorFormat;
}

/**
 * Parse hex color to RGB components
 */
export const parseHexColor = (hex: string): RGBColor | null => {
  const cleanHex = hex.replace("#", "");

  // Support both 3 and 6 character hex codes
  const isShortHex = cleanHex.length === 3;
  const isLongHex = cleanHex.length === 6;

  if (!isShortHex && !isLongHex) {
    return null;
  }

  let normalizedHex = cleanHex;
  if (isShortHex) {
    normalizedHex = cleanHex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  const num = parseInt(normalizedHex, 16);
  if (isNaN(num)) {
    return null;
  }

  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
};

/**
 * Convert RGB to hex format
 */
export const rgbToHex = ({ r, g, b }: RGBColor): string => {
  const toHex = (n: number) =>
    Math.round(Math.max(0, Math.min(255, n)))
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

/**
 * Convert RGB to HSL
 */
export const rgbToHsl = ({ r, g, b }: RGBColor): HSLColor => {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const diff = max - min;

  let h = 0;
  const l = (max + min) / 2;
  const s = diff === 0 ? 0 : diff / (1 - Math.abs(2 * l - 1));

  if (diff !== 0) {
    switch (max) {
      case rNorm:
        h = ((gNorm - bNorm) / diff) % 6;
        break;
      case gNorm:
        h = (bNorm - rNorm) / diff + 2;
        break;
      case bNorm:
        h = (rNorm - gNorm) / diff + 4;
        break;
    }
  }

  return {
    h: Math.round(h * 60),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
};

/**
 * Convert HSL to RGB
 */
export const hslToRgb = ({ h, s, l }: HSLColor): RGBColor => {
  const hNorm = h / 360;
  const sNorm = s / 100;
  const lNorm = l / 100;

  const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
  const x = c * (1 - Math.abs(((hNorm * 6) % 2) - 1));
  const m = lNorm - c / 2;

  let r = 0,
    g = 0,
    b = 0;

  if (0 <= hNorm && hNorm < 1 / 6) {
    r = c;
    g = x;
    b = 0;
  } else if (1 / 6 <= hNorm && hNorm < 2 / 6) {
    r = x;
    g = c;
    b = 0;
  } else if (2 / 6 <= hNorm && hNorm < 3 / 6) {
    r = 0;
    g = c;
    b = x;
  } else if (3 / 6 <= hNorm && hNorm < 4 / 6) {
    r = 0;
    g = x;
    b = c;
  } else if (4 / 6 <= hNorm && hNorm < 5 / 6) {
    r = x;
    g = 0;
    b = c;
  } else if (5 / 6 <= hNorm && hNorm < 1) {
    r = c;
    g = 0;
    b = x;
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
};

/**
 * Darken a color by reducing its lightness
 */
export const darkenColor = (
  color: string,
  options: ColorManipulationOptions = {},
): string => {
  const { amount = 0.15 } = options;

  // Try to parse as hex first
  const rgb = parseHexColor(color);
  if (!rgb) {
    // Fallback for non-hex colors - return original
    return color;
  }

  const hsl = rgbToHsl(rgb);
  const darkenedHsl: HSLColor = {
    ...hsl,
    l: Math.max(0, hsl.l - amount * 100),
  };

  const darkenedRgb = hslToRgb(darkenedHsl);
  return rgbToHex(darkenedRgb);
};

/**
 * Lighten a color by increasing its lightness
 */
export const lightenColor = (
  color: string,
  options: ColorManipulationOptions = {},
): string => {
  const { amount = 0.15 } = options;

  const rgb = parseHexColor(color);
  if (!rgb) {
    return color;
  }

  const hsl = rgbToHsl(rgb);
  const lightenedHsl: HSLColor = {
    ...hsl,
    l: Math.min(100, hsl.l + amount * 100),
  };

  const lightenedRgb = hslToRgb(lightenedHsl);
  return rgbToHex(lightenedRgb);
};

/**
 * Adjust saturation of a color
 */
export const adjustSaturation = (color: string, amount: number): string => {
  const rgb = parseHexColor(color);
  if (!rgb) {
    return color;
  }

  const hsl = rgbToHsl(rgb);
  const adjustedHsl: HSLColor = {
    ...hsl,
    s: Math.max(0, Math.min(100, hsl.s + amount)),
  };

  const adjustedRgb = hslToRgb(adjustedHsl);
  return rgbToHex(adjustedRgb);
};

/**
 * Get contrasting text color (black or white) for a background color
 */
export const getContrastColor = (
  backgroundColor: string,
): "#000000" | "#ffffff" => {
  const rgb = parseHexColor(backgroundColor);
  if (!rgb) {
    return "#000000"; // Default to black for unknown colors
  }

  // Calculate relative luminance
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;

  return luminance > 0.5 ? "#000000" : "#ffffff";
};

/**
 * Validate if a string is a valid color format
 */
export const isValidColor = (color: string): boolean => {
  // Check hex format
  if (parseHexColor(color)) {
    return true;
  }

  // Check CSS color names and other formats
  const tempElement = document.createElement("div");
  tempElement.style.color = color;
  return tempElement.style.color !== "";
};

/**
 * Generate a color palette from a base color
 */
export const generateColorPalette = (
  baseColor: string,
  steps: number = 9,
): string[] => {
  const rgb = parseHexColor(baseColor);
  if (!rgb) {
    return [baseColor];
  }

  const hsl = rgbToHsl(rgb);
  const palette: string[] = [];

  for (let i = 0; i < steps; i++) {
    const lightness = 10 + i * (80 / (steps - 1));
    const paletteHsl: HSLColor = { ...hsl, l: lightness };
    const paletteRgb = hslToRgb(paletteHsl);
    palette.push(rgbToHex(paletteRgb));
  }

  return palette;
};
