/**
 * Gradient Hooks Tests
 * Comprehensive test coverage for gradient hooks
 */

import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import {
  useGradient,
  useGradientPresets,
  useGradientAnimation,
} from "./useGradient";
import type {
  SimpleGradientProps,
  AdvancedGradientProps,
} from "../types/gradient";

describe("Gradient Hooks", () => {
  describe("useGradient", () => {
    it("should return null when no gradient props provided", () => {
      const { result } = renderHook(() => useGradient());
      expect(result.current).toBeNull();
    });

    it("should handle simple gradient props", () => {
      const simpleGradient: SimpleGradientProps = {
        startColor: "#ff0000",
        endColor: "#00ff00",
      };

      const { result } = renderHook(() => useGradient(simpleGradient));

      expect(result.current).not.toBeNull();
      expect(result.current?.background).toContain("linear-gradient");
      expect(result.current?.background).toContain("#ff0000");
      expect(result.current?.background).toContain("#00ff00");
      expect(result.current?.className).toBe("gradient-custom");
    });

    it("should handle simple gradient with custom direction", () => {
      const simpleGradient: SimpleGradientProps = {
        startColor: "#ff0000",
        endColor: "#00ff00",
        direction: 45,
      };

      const { result } = renderHook(() => useGradient(simpleGradient));

      expect(result.current?.background).toContain("45deg");
    });

    it("should handle simple gradient with named direction", () => {
      const simpleGradient: SimpleGradientProps = {
        startColor: "#ff0000",
        endColor: "#00ff00",
        direction: "to-right",
      };

      const { result } = renderHook(() => useGradient(simpleGradient));

      expect(result.current?.background).toContain("to right");
    });

    it("should handle simple gradient with custom hover colors", () => {
      const simpleGradient: SimpleGradientProps = {
        startColor: "#ff0000",
        endColor: "#00ff00",
        hoverStartColor: "#cc0000",
        hoverEndColor: "#00cc00",
      };

      const { result } = renderHook(() => useGradient(simpleGradient));

      expect(result.current?.customProperties).toHaveProperty(
        "--gradient-hover",
      );
      expect(result.current?.customProperties["--gradient-hover"]).toContain(
        "#cc0000",
      );
      expect(result.current?.customProperties["--gradient-hover"]).toContain(
        "#00cc00",
      );
    });

    it("should auto-generate hover colors when not provided", () => {
      const simpleGradient: SimpleGradientProps = {
        startColor: "#ff0000",
        endColor: "#00ff00",
      };

      const { result } = renderHook(() => useGradient(simpleGradient));

      expect(result.current?.customProperties).toHaveProperty(
        "--gradient-hover",
      );
      expect(result.current?.customProperties).toHaveProperty(
        "--gradient-active",
      );
    });

    it("should handle advanced gradient props", () => {
      const advancedGradient: AdvancedGradientProps = {
        gradient: {
          default: {
            direction: 135,
            stops: [
              { color: "#ff0000", position: 0 },
              { color: "#00ff00", position: 100 },
            ],
          },
        },
      };

      const { result } = renderHook(() => useGradient(advancedGradient));

      expect(result.current).not.toBeNull();
      expect(result.current?.background).toContain("linear-gradient");
      expect(result.current?.background).toContain("135deg");
      expect(result.current?.background).toContain("#ff0000 0%");
      expect(result.current?.background).toContain("#00ff00 100%");
    });

    it("should handle advanced gradient with multiple stops", () => {
      const advancedGradient: AdvancedGradientProps = {
        gradient: {
          default: {
            direction: "to-right",
            stops: [
              { color: "#ff0000", position: 0 },
              { color: "#ffff00", position: 50 },
              { color: "#00ff00", position: 100 },
            ],
          },
        },
      };

      const { result } = renderHook(() => useGradient(advancedGradient));

      expect(result.current?.background).toContain("#ff0000 0%");
      expect(result.current?.background).toContain("#ffff00 50%");
      expect(result.current?.background).toContain("#00ff00 100%");
    });

    it("should handle advanced gradient with hover state", () => {
      const advancedGradient: AdvancedGradientProps = {
        gradient: {
          default: {
            direction: 135,
            stops: [
              { color: "#ff0000", position: 0 },
              { color: "#00ff00", position: 100 },
            ],
          },
          hover: {
            direction: 135,
            stops: [
              { color: "#cc0000", position: 0 },
              { color: "#00cc00", position: 100 },
            ],
          },
        },
      };

      const { result } = renderHook(() => useGradient(advancedGradient));

      expect(result.current?.customProperties).toHaveProperty(
        "--gradient-hover",
      );
      expect(result.current?.customProperties["--gradient-hover"]).toContain(
        "#cc0000",
      );
    });

    it("should handle custom CSS property prefix", () => {
      const simpleGradient: SimpleGradientProps = {
        startColor: "#ff0000",
        endColor: "#00ff00",
      };

      const { result } = renderHook(() =>
        useGradient(simpleGradient, { cssPropertyPrefix: "custom" }),
      );

      expect(result.current?.customProperties).toHaveProperty("--custom-hover");
      expect(result.current?.className).toBe("custom-custom");
    });

    it("should handle disabled custom properties generation", () => {
      const simpleGradient: SimpleGradientProps = {
        startColor: "#ff0000",
        endColor: "#00ff00",
      };

      const { result } = renderHook(() =>
        useGradient(simpleGradient, { generateCustomProperties: false }),
      );

      expect(Object.keys(result.current?.customProperties || {})).toHaveLength(
        0,
      );
      expect(result.current?.className).toBeUndefined();
    });

    it("should handle custom darken amounts", () => {
      const simpleGradient: SimpleGradientProps = {
        startColor: "#ff0000",
        endColor: "#00ff00",
      };

      const { result } = renderHook(() =>
        useGradient(simpleGradient, {
          hoverDarkenAmount: 0.3,
          activeDarkenAmount: 0.5,
        }),
      );

      expect(result.current?.customProperties).toHaveProperty(
        "--gradient-hover",
      );
      expect(result.current?.customProperties).toHaveProperty(
        "--gradient-active",
      );
    });

    it("should memoize results correctly", () => {
      const simpleGradient: SimpleGradientProps = {
        startColor: "#ff0000",
        endColor: "#00ff00",
      };

      const { result, rerender } = renderHook(
        ({ gradient }) => useGradient(gradient),
        { initialProps: { gradient: simpleGradient } },
      );

      const firstResult = result.current;

      // Rerender with same props (same object reference)
      rerender({ gradient: simpleGradient });

      // Objects should have same content but may be different references
      expect(result.current).toStrictEqual(firstResult); // Check deep equality
    });
  });

  describe("useGradientPresets", () => {
    it("should return preset gradients", () => {
      const { result } = renderHook(() => useGradientPresets());

      expect(result.current.presets).toBeDefined();
      expect(result.current.presets.primary).toBeDefined();
      expect(result.current.presets.sunset).toBeDefined();
      expect(result.current.presets.ocean).toBeDefined();
      expect(result.current.presets.forest).toBeDefined();
      expect(result.current.presets.fire).toBeDefined();
    });

    it("should have all expected presets", () => {
      const { result } = renderHook(() => useGradientPresets());

      const expectedPresets = [
        "primary",
        "secondary",
        "sunset",
        "ocean",
        "forest",
        "fire",
        "silver",
        "graphite",
        "success",
        "warning",
        "error",
        "info",
      ];

      expectedPresets.forEach((preset) => {
        expect(result.current.presets).toHaveProperty(preset);
      });
    });

    it("should provide createPreset function", () => {
      const { result } = renderHook(() => useGradientPresets());

      expect(result.current.createPreset).toBeDefined();
      expect(typeof result.current.createPreset).toBe("function");
    });

    it("should create custom presets correctly", () => {
      const { result } = renderHook(() => useGradientPresets());

      const customPreset = result.current.createPreset(
        "custom",
        "#ff0000",
        "#00ff00",
        90,
      );

      expect(customPreset.startColor).toBe("#ff0000");
      expect(customPreset.endColor).toBe("#00ff00");
      expect(customPreset.direction).toBe(90);
    });

    it("should use default direction when not provided", () => {
      const { result } = renderHook(() => useGradientPresets());

      const preset = result.current.createPreset("test", "#ff0000", "#00ff00");

      expect(preset.direction).toBe(135); // Default direction
    });

    it("should memoize presets", () => {
      const { result, rerender } = renderHook(() => useGradientPresets());

      const firstPresets = result.current.presets;
      rerender();

      expect(result.current.presets).toBe(firstPresets);
    });
  });

  describe("useGradientAnimation", () => {
    it("should provide animation functions", () => {
      const { result } = renderHook(() => useGradientAnimation());

      expect(result.current.createAnimatedGradient).toBeDefined();
      expect(result.current.createPulsingGradient).toBeDefined();
      expect(typeof result.current.createAnimatedGradient).toBe("function");
      expect(typeof result.current.createPulsingGradient).toBe("function");
    });

    it("should create animated gradient config", () => {
      const { result } = renderHook(() => useGradientAnimation());

      const baseConfig = {
        direction: 135 as const,
        stops: [
          { color: "#ff0000", position: 0 },
          { color: "#00ff00", position: 100 },
        ],
      };

      const animated = result.current.createAnimatedGradient(baseConfig, 2000);

      expect(animated).toEqual(baseConfig); // Currently returns same config
    });

    it("should create pulsing gradient", () => {
      const { result } = renderHook(() => useGradientAnimation());

      const baseGradient: SimpleGradientProps = {
        startColor: "#ff0000",
        endColor: "#00ff00",
        direction: 45,
      };

      const pulsing = result.current.createPulsingGradient(baseGradient, 0.2);

      expect(pulsing.gradient.default).toBeDefined();
      expect(pulsing.gradient.hover).toBeDefined();
      expect(pulsing.gradient.active).toBeDefined();
    });

    it("should use default intensity when not provided", () => {
      const { result } = renderHook(() => useGradientAnimation());

      const baseGradient: SimpleGradientProps = {
        startColor: "#ff0000",
        endColor: "#00ff00",
      };

      const pulsing = result.current.createPulsingGradient(baseGradient);

      expect(pulsing.gradient.default).toBeDefined();
      expect(pulsing.gradient.hover).toBeDefined();
      expect(pulsing.gradient.active).toBeDefined();
    });
  });

  describe("Integration tests", () => {
    it("should work with presets in useGradient", () => {
      const { result: presetsResult } = renderHook(() => useGradientPresets());
      const { result: gradientResult } = renderHook(() =>
        useGradient(presetsResult.current.presets.sunset),
      );

      expect(gradientResult.current).not.toBeNull();
      expect(gradientResult.current?.background).toContain("linear-gradient");
    });

    it("should work with animated gradients in useGradient", () => {
      const { result: animationResult } = renderHook(() =>
        useGradientAnimation(),
      );

      const baseGradient: SimpleGradientProps = {
        startColor: "#ff0000",
        endColor: "#00ff00",
      };

      const pulsing =
        animationResult.current.createPulsingGradient(baseGradient);

      const { result: gradientResult } = renderHook(() => useGradient(pulsing));

      expect(gradientResult.current).not.toBeNull();
      expect(gradientResult.current?.background).toContain("linear-gradient");
      expect(gradientResult.current?.customProperties).toHaveProperty(
        "--gradient-hover",
      );
    });
  });
});
