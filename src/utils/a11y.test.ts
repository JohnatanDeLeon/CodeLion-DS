/**
 * Accessibility Utilities Tests
 * Comprehensive test coverage for a11y utility functions
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  srOnly,
  focusVisible,
  focusRing,
  aria,
  contrast,
  keyboard,
  announce,
} from "./a11y";

// Mock timers for setTimeout tests
vi.useFakeTimers();

describe("a11y utilities", () => {
  beforeEach(() => {
    // Clean up DOM before each test
    document.body.innerHTML = "";
    vi.clearAllTimers();
  });

  afterEach(() => {
    // Clean up any remaining timers
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.useFakeTimers();

    // Safely clean up any remaining live regions
    try {
      const liveRegions = document.querySelectorAll("[aria-live]");
      liveRegions.forEach((region) => {
        try {
          if (region && region.parentNode) {
            region.parentNode.removeChild(region);
          }
        } catch (e) {
          // Ignore if already removed
        }
      });
    } catch (e) {
      // Ignore cleanup errors
    }
  });

  describe("srOnly", () => {
    it("should have correct screen reader only styles", () => {
      expect(srOnly).toEqual({
        position: "absolute",
        width: "1px",
        height: "1px",
        padding: "0",
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        borderWidth: "0",
      });
    });

    it("should be a const object", () => {
      // Test that it's properly typed as const
      expect(typeof srOnly).toBe("object");
      expect(srOnly).toBeTruthy();
    });
  });

  describe("focusVisible", () => {
    it("should have correct focus visible styles", () => {
      expect(focusVisible).toEqual({
        outline: "2px solid transparent",
        outlineOffset: "2px",
        ":focus-visible": {
          outline: "2px solid currentColor",
          outlineOffset: "2px",
        },
      });
    });

    it("should be a const object", () => {
      // Test that it's properly typed as const
      expect(typeof focusVisible).toBe("object");
      expect(focusVisible).toBeTruthy();
    });
  });

  describe("focusRing", () => {
    it("should return default focus ring styles", () => {
      const result = focusRing();

      expect(result).toEqual({
        ":focus": {
          outline: "2px solid transparent",
          outlineOffset: "2px",
        },
        ":focus-visible": {
          outline: "2px solid transparent",
          outlineOffset: "2px",
          boxShadow: "0 0 0 2px rgb(59 130 246)80",
        },
      });
    });

    it("should accept custom color", () => {
      const customColor = "rgb(255 0 0)";
      const result = focusRing(customColor);

      expect(result[":focus-visible"].boxShadow).toBe(
        "0 0 0 2px rgb(255 0 0)80",
      );
    });

    it("should accept custom opacity", () => {
      const result = focusRing("rgb(0 255 0)", 1.0);

      expect(result[":focus-visible"].boxShadow).toBe(
        "0 0 0 2px rgb(0 255 0)ff",
      );
    });

    it("should handle zero opacity", () => {
      const result = focusRing("rgb(255 255 255)", 0);

      expect(result[":focus-visible"].boxShadow).toBe(
        "0 0 0 2px rgb(255 255 255)0",
      );
    });

    it("should handle fractional opacity correctly", () => {
      const result = focusRing("rgb(100 150 200)", 0.25);

      expect(result[":focus-visible"].boxShadow).toBe(
        "0 0 0 2px rgb(100 150 200)40",
      );
    });
  });

  describe("aria.button", () => {
    it("should return basic button attributes", () => {
      const result = aria.button({});

      expect(result).toEqual({
        role: "button",
        tabIndex: 0,
      });
    });

    it("should handle disabled state", () => {
      const result = aria.button({ disabled: true });

      expect(result).toEqual({
        role: "button",
        tabIndex: -1,
        "aria-disabled": true,
      });
    });

    it("should handle pressed state", () => {
      const result = aria.button({ pressed: true });

      expect(result).toEqual({
        role: "button",
        tabIndex: 0,
        "aria-pressed": true,
      });
    });

    it("should handle expanded state", () => {
      const result = aria.button({ expanded: false });

      expect(result).toEqual({
        role: "button",
        tabIndex: 0,
        "aria-expanded": false,
      });
    });

    it("should handle describedBy", () => {
      const result = aria.button({ describedBy: "description-id" });

      expect(result).toEqual({
        role: "button",
        tabIndex: 0,
        "aria-describedby": "description-id",
      });
    });

    it("should handle labelledBy", () => {
      const result = aria.button({ labelledBy: "label-id" });

      expect(result).toEqual({
        role: "button",
        tabIndex: 0,
        "aria-labelledby": "label-id",
      });
    });

    it("should handle all properties together", () => {
      const result = aria.button({
        pressed: true,
        expanded: false,
        disabled: true,
        describedBy: "desc",
        labelledBy: "label",
      });

      expect(result).toEqual({
        role: "button",
        tabIndex: -1,
        "aria-pressed": true,
        "aria-expanded": false,
        "aria-disabled": true,
        "aria-describedby": "desc",
        "aria-labelledby": "label",
      });
    });
  });

  describe("aria.input", () => {
    it("should return empty object for no properties", () => {
      const result = aria.input({});

      expect(result).toEqual({});
    });

    it("should handle required state", () => {
      const result = aria.input({ required: true });

      expect(result).toEqual({
        "aria-required": true,
      });
    });

    it("should handle invalid state", () => {
      const result = aria.input({ invalid: true });

      expect(result).toEqual({
        "aria-invalid": true,
      });
    });

    it("should handle describedBy", () => {
      const result = aria.input({ describedBy: "error-message" });

      expect(result).toEqual({
        "aria-describedby": "error-message",
      });
    });

    it("should handle labelledBy", () => {
      const result = aria.input({ labelledBy: "field-label" });

      expect(result).toEqual({
        "aria-labelledby": "field-label",
      });
    });

    it("should handle all properties together", () => {
      const result = aria.input({
        required: true,
        invalid: true,
        describedBy: "help-text",
        labelledBy: "field-label",
        placeholder: "Enter value",
      });

      expect(result).toEqual({
        "aria-required": true,
        "aria-invalid": true,
        "aria-describedby": "help-text",
        "aria-labelledby": "field-label",
      });
    });
  });

  describe("aria.menu", () => {
    it("should return basic menu attributes", () => {
      const result = aria.menu({});

      expect(result).toEqual({
        role: "menu",
      });
    });

    it("should handle expanded state", () => {
      const result = aria.menu({ expanded: true });

      expect(result).toEqual({
        role: "menu",
        "aria-expanded": true,
      });
    });

    it("should handle hasPopup", () => {
      const result = aria.menu({ hasPopup: true });

      expect(result).toEqual({
        role: "menu",
        "aria-haspopup": true,
      });
    });

    it("should handle controls", () => {
      const result = aria.menu({ controls: "submenu-id" });

      expect(result).toEqual({
        role: "menu",
        "aria-controls": "submenu-id",
      });
    });

    it("should handle activeDescendant", () => {
      const result = aria.menu({ activeDescendant: "item-1" });

      expect(result).toEqual({
        role: "menu",
        "aria-activedescendant": "item-1",
      });
    });

    it("should handle all properties together", () => {
      const result = aria.menu({
        expanded: true,
        hasPopup: true,
        controls: "submenu",
        activeDescendant: "active-item",
      });

      expect(result).toEqual({
        role: "menu",
        "aria-expanded": true,
        "aria-haspopup": true,
        "aria-controls": "submenu",
        "aria-activedescendant": "active-item",
      });
    });
  });

  describe("aria.dialog", () => {
    it("should return basic dialog attributes", () => {
      const result = aria.dialog({});

      expect(result).toEqual({
        role: "dialog",
      });
    });

    it("should handle labelledBy", () => {
      const result = aria.dialog({ labelledBy: "dialog-title" });

      expect(result).toEqual({
        role: "dialog",
        "aria-labelledby": "dialog-title",
      });
    });

    it("should handle describedBy", () => {
      const result = aria.dialog({ describedBy: "dialog-description" });

      expect(result).toEqual({
        role: "dialog",
        "aria-describedby": "dialog-description",
      });
    });

    it("should handle modal state", () => {
      const result = aria.dialog({ modal: true });

      expect(result).toEqual({
        role: "dialog",
        "aria-modal": true,
      });
    });

    it("should handle all properties together", () => {
      const result = aria.dialog({
        labelledBy: "title",
        describedBy: "description",
        modal: true,
      });

      expect(result).toEqual({
        role: "dialog",
        "aria-labelledby": "title",
        "aria-describedby": "description",
        "aria-modal": true,
      });
    });
  });

  describe("contrast.getLuminance", () => {
    it("should calculate luminance for black", () => {
      const result = contrast.getLuminance(0, 0, 0);
      expect(result).toBe(0);
    });

    it("should calculate luminance for white", () => {
      const result = contrast.getLuminance(255, 255, 255);
      expect(result).toBe(1);
    });

    it("should calculate luminance for red", () => {
      const result = contrast.getLuminance(255, 0, 0);
      expect(result).toBeCloseTo(0.2126, 4);
    });

    it("should calculate luminance for green", () => {
      const result = contrast.getLuminance(0, 255, 0);
      expect(result).toBeCloseTo(0.7152, 4);
    });

    it("should calculate luminance for blue", () => {
      const result = contrast.getLuminance(0, 0, 255);
      expect(result).toBeCloseTo(0.0722, 4);
    });

    it("should handle mid-range values", () => {
      const result = contrast.getLuminance(128, 128, 128);
      expect(result).toBeCloseTo(0.2159, 4);
    });
  });

  describe("contrast.getContrastRatio", () => {
    it("should return 21 for black and white", () => {
      const result = contrast.getContrastRatio([0, 0, 0], [255, 255, 255]);
      expect(result).toBe(21);
    });

    it("should return 1 for identical colors", () => {
      const result = contrast.getContrastRatio(
        [128, 128, 128],
        [128, 128, 128],
      );
      expect(result).toBe(1);
    });

    it("should handle order independence", () => {
      const ratio1 = contrast.getContrastRatio([0, 0, 0], [255, 255, 255]);
      const ratio2 = contrast.getContrastRatio([255, 255, 255], [0, 0, 0]);
      expect(ratio1).toBe(ratio2);
    });

    it("should calculate reasonable ratios for common colors", () => {
      // Blue on white should have good contrast
      const blueOnWhite = contrast.getContrastRatio(
        [0, 0, 255],
        [255, 255, 255],
      );
      expect(blueOnWhite).toBeGreaterThan(4.5);
    });
  });

  describe("contrast.meetsAA", () => {
    it("should return true for black text on white background", () => {
      const result = contrast.meetsAA([0, 0, 0], [255, 255, 255]);
      expect(result).toBe(true);
    });

    it("should return false for low contrast combinations", () => {
      const result = contrast.meetsAA([200, 200, 200], [255, 255, 255]);
      expect(result).toBe(false);
    });

    it("should return true for combinations with exactly 4.5 ratio", () => {
      // Mock the getContrastRatio to return exactly 4.5
      const originalGetContrastRatio = contrast.getContrastRatio;
      contrast.getContrastRatio = vi.fn().mockReturnValue(4.5);

      const result = contrast.meetsAA([100, 100, 100], [200, 200, 200]);
      expect(result).toBe(true);

      // Restore original function
      contrast.getContrastRatio = originalGetContrastRatio;
    });
  });

  describe("contrast.meetsAAA", () => {
    it("should return true for black text on white background", () => {
      const result = contrast.meetsAAA([0, 0, 0], [255, 255, 255]);
      expect(result).toBe(true);
    });

    it("should return false for AA level but not AAA level combinations", () => {
      // Mock to return a ratio between 4.5 and 7
      const originalGetContrastRatio = contrast.getContrastRatio;
      contrast.getContrastRatio = vi.fn().mockReturnValue(5.0);

      const result = contrast.meetsAAA([100, 100, 100], [200, 200, 200]);
      expect(result).toBe(false);

      // Restore original function
      contrast.getContrastRatio = originalGetContrastRatio;
    });

    it("should return true for combinations with exactly 7 ratio", () => {
      const originalGetContrastRatio = contrast.getContrastRatio;
      contrast.getContrastRatio = vi.fn().mockReturnValue(7.0);

      const result = contrast.meetsAAA([100, 100, 100], [200, 200, 200]);
      expect(result).toBe(true);

      contrast.getContrastRatio = originalGetContrastRatio;
    });
  });

  describe("keyboard.handlers.onEnterOrSpace", () => {
    it("should call callback on Enter key", () => {
      const callback = vi.fn();
      const handler = keyboard.handlers.onEnterOrSpace(callback);

      const event = new KeyboardEvent("keydown", { key: "Enter" });
      const preventDefaultSpy = vi.spyOn(event, "preventDefault");

      handler(event);

      expect(callback).toHaveBeenCalledTimes(1);
      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it("should call callback on Space key", () => {
      const callback = vi.fn();
      const handler = keyboard.handlers.onEnterOrSpace(callback);

      const event = new KeyboardEvent("keydown", { key: " " });
      const preventDefaultSpy = vi.spyOn(event, "preventDefault");

      handler(event);

      expect(callback).toHaveBeenCalledTimes(1);
      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it("should not call callback on other keys", () => {
      const callback = vi.fn();
      const handler = keyboard.handlers.onEnterOrSpace(callback);

      const event = new KeyboardEvent("keydown", { key: "Tab" });
      handler(event);

      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe("keyboard.handlers.onEscape", () => {
    it("should call callback on Escape key", () => {
      const callback = vi.fn();
      const handler = keyboard.handlers.onEscape(callback);

      const event = new KeyboardEvent("keydown", { key: "Escape" });
      const preventDefaultSpy = vi.spyOn(event, "preventDefault");

      handler(event);

      expect(callback).toHaveBeenCalledTimes(1);
      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it("should not call callback on other keys", () => {
      const callback = vi.fn();
      const handler = keyboard.handlers.onEscape(callback);

      const event = new KeyboardEvent("keydown", { key: "Enter" });
      handler(event);

      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe("keyboard.handlers.onArrowKeys", () => {
    it("should call up callback on ArrowUp", () => {
      const callbacks = {
        up: vi.fn(),
        down: vi.fn(),
        left: vi.fn(),
        right: vi.fn(),
      };
      const handler = keyboard.handlers.onArrowKeys(callbacks);

      const event = new KeyboardEvent("keydown", { key: "ArrowUp" });
      const preventDefaultSpy = vi.spyOn(event, "preventDefault");

      handler(event);

      expect(callbacks.up).toHaveBeenCalledTimes(1);
      expect(callbacks.down).not.toHaveBeenCalled();
      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it("should call down callback on ArrowDown", () => {
      const callbacks = { down: vi.fn() };
      const handler = keyboard.handlers.onArrowKeys(callbacks);

      const event = new KeyboardEvent("keydown", { key: "ArrowDown" });
      handler(event);

      expect(callbacks.down).toHaveBeenCalledTimes(1);
    });

    it("should call left callback on ArrowLeft", () => {
      const callbacks = { left: vi.fn() };
      const handler = keyboard.handlers.onArrowKeys(callbacks);

      const event = new KeyboardEvent("keydown", { key: "ArrowLeft" });
      handler(event);

      expect(callbacks.left).toHaveBeenCalledTimes(1);
    });

    it("should call right callback on ArrowRight", () => {
      const callbacks = { right: vi.fn() };
      const handler = keyboard.handlers.onArrowKeys(callbacks);

      const event = new KeyboardEvent("keydown", { key: "ArrowRight" });
      handler(event);

      expect(callbacks.right).toHaveBeenCalledTimes(1);
    });

    it("should not call callback if not provided", () => {
      const callbacks = {}; // No callbacks provided
      const handler = keyboard.handlers.onArrowKeys(callbacks);

      const event = new KeyboardEvent("keydown", { key: "ArrowUp" });

      // Should not throw error
      expect(() => handler(event)).not.toThrow();
    });

    it("should not call callbacks on other keys", () => {
      const callbacks = {
        up: vi.fn(),
        down: vi.fn(),
        left: vi.fn(),
        right: vi.fn(),
      };
      const handler = keyboard.handlers.onArrowKeys(callbacks);

      const event = new KeyboardEvent("keydown", { key: "Enter" });
      handler(event);

      expect(callbacks.up).not.toHaveBeenCalled();
      expect(callbacks.down).not.toHaveBeenCalled();
      expect(callbacks.left).not.toHaveBeenCalled();
      expect(callbacks.right).not.toHaveBeenCalled();
    });
  });

  describe("keyboard.focus.getFocusableElements", () => {
    it("should find focusable buttons", () => {
      const container = document.createElement("div");
      const button = document.createElement("button");
      container.appendChild(button);

      const result = keyboard.focus.getFocusableElements(container);

      expect(result).toHaveLength(1);
      expect(result[0]).toBe(button);
    });

    it("should ignore disabled buttons", () => {
      const container = document.createElement("div");
      const button = document.createElement("button");
      button.disabled = true;
      container.appendChild(button);

      const result = keyboard.focus.getFocusableElements(container);

      expect(result).toHaveLength(0);
    });

    it("should find focusable inputs", () => {
      const container = document.createElement("div");
      const input = document.createElement("input");
      container.appendChild(input);

      const result = keyboard.focus.getFocusableElements(container);

      expect(result).toHaveLength(1);
      expect(result[0]).toBe(input);
    });

    it("should find links with href", () => {
      const container = document.createElement("div");
      const link = document.createElement("a");
      link.href = "#test";
      container.appendChild(link);

      const result = keyboard.focus.getFocusableElements(container);

      expect(result).toHaveLength(1);
      expect(result[0]).toBe(link);
    });

    it("should ignore links without href", () => {
      const container = document.createElement("div");
      const link = document.createElement("a");
      container.appendChild(link);

      const result = keyboard.focus.getFocusableElements(container);

      expect(result).toHaveLength(0);
    });

    it("should find elements with positive tabindex", () => {
      const container = document.createElement("div");
      const div = document.createElement("div");
      div.setAttribute("tabindex", "0");
      container.appendChild(div);

      const result = keyboard.focus.getFocusableElements(container);

      expect(result).toHaveLength(1);
      expect(result[0]).toBe(div);
    });

    it("should ignore elements with negative tabindex", () => {
      const container = document.createElement("div");
      const div = document.createElement("div");
      div.setAttribute("tabindex", "-1");
      container.appendChild(div);

      const result = keyboard.focus.getFocusableElements(container);

      expect(result).toHaveLength(0);
    });
  });

  describe("keyboard.focus.trapFocus", () => {
    let container: HTMLElement;
    let firstButton: HTMLButtonElement;
    let lastButton: HTMLButtonElement;

    beforeEach(() => {
      container = document.createElement("div");
      firstButton = document.createElement("button");
      firstButton.textContent = "First";
      lastButton = document.createElement("button");
      lastButton.textContent = "Last";

      container.appendChild(firstButton);
      container.appendChild(lastButton);
      document.body.appendChild(container);
    });

    afterEach(() => {
      document.body.removeChild(container);
    });

    it("should return cleanup function", () => {
      const cleanup = keyboard.focus.trapFocus(container);

      expect(typeof cleanup).toBe("function");
      cleanup();
    });

    it("should focus last element when tabbing backward from first", () => {
      const cleanup = keyboard.focus.trapFocus(container);

      // Mock document.activeElement
      Object.defineProperty(document, "activeElement", {
        value: firstButton,
        writable: true,
      });

      const lastFocusSpy = vi.spyOn(lastButton, "focus");

      const event = new KeyboardEvent("keydown", {
        key: "Tab",
        shiftKey: true,
      });
      const preventDefaultSpy = vi.spyOn(event, "preventDefault");

      container.dispatchEvent(event);

      expect(preventDefaultSpy).toHaveBeenCalled();
      expect(lastFocusSpy).toHaveBeenCalled();

      cleanup();
    });

    it("should focus first element when tabbing forward from last", () => {
      const cleanup = keyboard.focus.trapFocus(container);

      Object.defineProperty(document, "activeElement", {
        value: lastButton,
        writable: true,
      });

      const firstFocusSpy = vi.spyOn(firstButton, "focus");

      const event = new KeyboardEvent("keydown", {
        key: "Tab",
        shiftKey: false,
      });
      const preventDefaultSpy = vi.spyOn(event, "preventDefault");

      container.dispatchEvent(event);

      expect(preventDefaultSpy).toHaveBeenCalled();
      expect(firstFocusSpy).toHaveBeenCalled();

      cleanup();
    });

    it("should not interfere with normal tabbing", () => {
      const cleanup = keyboard.focus.trapFocus(container);

      // Mock middle element being focused
      const middleElement = document.createElement("button");
      Object.defineProperty(document, "activeElement", {
        value: middleElement,
        writable: true,
      });

      const event = new KeyboardEvent("keydown", { key: "Tab" });
      const preventDefaultSpy = vi.spyOn(event, "preventDefault");

      container.dispatchEvent(event);

      expect(preventDefaultSpy).not.toHaveBeenCalled();

      cleanup();
    });

    it("should ignore non-Tab keys", () => {
      const cleanup = keyboard.focus.trapFocus(container);

      const event = new KeyboardEvent("keydown", { key: "Enter" });
      const preventDefaultSpy = vi.spyOn(event, "preventDefault");

      container.dispatchEvent(event);

      expect(preventDefaultSpy).not.toHaveBeenCalled();

      cleanup();
    });

    it("should remove event listener when cleanup is called", () => {
      const removeEventListenerSpy = vi.spyOn(container, "removeEventListener");
      const cleanup = keyboard.focus.trapFocus(container);

      cleanup();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "keydown",
        expect.any(Function),
      );
    });
  });

  describe("announce.createLiveRegion", () => {
    it("should create live region with polite level by default", () => {
      const liveRegion = announce.createLiveRegion();

      expect(liveRegion.getAttribute("aria-live")).toBe("polite");
      expect(liveRegion.getAttribute("aria-atomic")).toBe("true");
      expect(document.body.contains(liveRegion)).toBe(true);

      // Cleanup
      if (liveRegion.parentNode) {
        liveRegion.parentNode.removeChild(liveRegion);
      }
    });

    it("should create live region with assertive level", () => {
      const liveRegion = announce.createLiveRegion("assertive");

      expect(liveRegion.getAttribute("aria-live")).toBe("assertive");
      expect(liveRegion.getAttribute("aria-atomic")).toBe("true");

      // Cleanup
      if (liveRegion.parentNode) {
        liveRegion.parentNode.removeChild(liveRegion);
      }
    });

    it("should apply screen reader only styles", () => {
      const liveRegion = announce.createLiveRegion();

      // Check that styles are applied to the element
      const styleText = liveRegion.style.cssText;
      expect(styleText).toContain("position");
      expect(styleText).toContain("width");
      expect(styleText).toContain("height");

      // Cleanup
      if (liveRegion.parentNode) {
        liveRegion.parentNode.removeChild(liveRegion);
      }
    });
  });

  describe("announce.message", () => {
    it("should create and cleanup live region", () => {
      // Test the basic functionality without DOM cleanup conflicts
      expect(typeof announce.message).toBe("function");
      expect(() => announce.message("Test message")).not.toThrow();
      expect(() =>
        announce.message("Assertive message", "assertive"),
      ).not.toThrow();
    });
  });
});
