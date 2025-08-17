/**
 * Test Workflow Utilities Tests
 * Simple test coverage for workflow testing function
 */

import { describe, it, expect } from "vitest";
import testWorkflow, { testWorkflow as namedExport } from "./test-workflow";

describe("Test Workflow Utilities", () => {
  describe("testWorkflow (default export)", () => {
    it("should return success message", () => {
      const result = testWorkflow();
      expect(result).toBe("Workflow test successful!");
    });

    it("should be a function", () => {
      expect(typeof testWorkflow).toBe("function");
    });
  });

  describe("testWorkflow (named export)", () => {
    it("should return success message", () => {
      const result = namedExport();
      expect(result).toBe("Workflow test successful!");
    });

    it("should be the same function as default export", () => {
      expect(namedExport).toBe(testWorkflow);
    });
  });
});
