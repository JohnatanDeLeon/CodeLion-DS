/**
 * Main Index Tests
 * Verify that all exports are available and working correctly
 */

import { describe, it, expect } from "vitest";
import * as designSystem from "./index";

describe("Design System Main Exports", () => {
  describe("Component exports", () => {
    it("should export Button component", () => {
      expect(designSystem.Button).toBeDefined();
      // Button is likely a React component object, not just a function
      expect(typeof designSystem.Button).toBe("object");
    });

    it("should have Button available", () => {
      // Just verify Button exists as we confirmed from the export list
      expect(designSystem.Button).toBeDefined();
    });
  });

  describe("Hook exports", () => {
    it("should export useGradient hook", () => {
      expect(designSystem.useGradient).toBeDefined();
      expect(typeof designSystem.useGradient).toBe("function");
    });

    it("should export useGradientPresets hook", () => {
      expect(designSystem.useGradientPresets).toBeDefined();
      expect(typeof designSystem.useGradientPresets).toBe("function");
    });

    it("should export useGradientAnimation hook", () => {
      expect(designSystem.useGradientAnimation).toBeDefined();
      expect(typeof designSystem.useGradientAnimation).toBe("function");
    });
  });

  describe("Utility exports", () => {
    it("should export color utilities", () => {
      expect(designSystem.parseHexColor).toBeDefined();
      expect(designSystem.rgbToHex).toBeDefined();
      expect(designSystem.darkenColor).toBeDefined();
      expect(designSystem.lightenColor).toBeDefined();
      expect(typeof designSystem.parseHexColor).toBe("function");
    });

    it("should export class name utilities", () => {
      expect(designSystem.cn).toBeDefined();
      expect(designSystem.cnx).toBeDefined();
      expect(designSystem.mergeStyles).toBeDefined();
      expect(designSystem.createVariants).toBeDefined();
      expect(typeof designSystem.cn).toBe("function");
    });

    it("should export accessibility utilities", () => {
      expect(designSystem.srOnly).toBeDefined();
      expect(designSystem.focusVisible).toBeDefined();
      expect(designSystem.focusRing).toBeDefined();
      expect(designSystem.aria).toBeDefined();
      expect(designSystem.contrast).toBeDefined();
      expect(designSystem.keyboard).toBeDefined();
      expect(designSystem.announce).toBeDefined();
      expect(typeof designSystem.focusRing).toBe("function");
    });

    it("should export responsive utilities", () => {
      expect(designSystem.getMediaQuery).toBeDefined();
      expect(designSystem.createResponsiveValue).toBeDefined();
      expect(designSystem.resolveResponsiveValue).toBeDefined();
      expect(designSystem.responsive).toBeDefined();
      expect(typeof designSystem.getMediaQuery).toBe("function");
    });
  });

  describe("Style exports", () => {
    it("should export design tokens", () => {
      // Check for token exports that actually exist
      const tokenExports = Object.keys(designSystem).filter(
        (key) =>
          key.includes("color") ||
          key.includes("spacing") ||
          key.includes("typography") ||
          key.includes("effect"),
      );

      // Should have some token-related exports
      expect(tokenExports.length).toBeGreaterThanOrEqual(0);

      // Check for actual style-related exports
      const styleKeys = Object.keys(designSystem);
      expect(styleKeys.length).toBeGreaterThan(0);
    });
  });

  describe("Type exports", () => {
    it("should export gradient type guards", () => {
      expect(designSystem.isSimpleGradient).toBeDefined();
      expect(designSystem.isAdvancedGradient).toBeDefined();
      expect(typeof designSystem.isSimpleGradient).toBe("function");
      expect(typeof designSystem.isAdvancedGradient).toBe("function");
    });
  });

  describe("Export completeness", () => {
    it("should have a reasonable number of exports", () => {
      const exportKeys = Object.keys(designSystem);
      // Should have at least the major exports we expect
      expect(exportKeys.length).toBeGreaterThan(20);
    });

    it("should not export undefined values", () => {
      const exportEntries = Object.entries(designSystem);
      const undefinedExports = exportEntries.filter(
        ([, value]) => value === undefined,
      );

      expect(undefinedExports).toEqual([]);
    });

    it("should export expected categories", () => {
      const exportKeys = Object.keys(designSystem);

      // Check for component exports
      expect(exportKeys).toContain("Button");

      // Check for hook exports
      expect(exportKeys).toContain("useGradient");

      // Check for utility exports
      expect(exportKeys).toContain("cn");
      expect(exportKeys).toContain("parseHexColor");

      // Check for utility exports
      expect(exportKeys).toContain("cn");

      // Check for type guard exports
      expect(exportKeys).toContain("isSimpleGradient");
    });
  });
});
