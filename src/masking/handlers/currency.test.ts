import { currencyHandler } from "./currency";

describe("currencyHandler", () => {
  // Ensure currencyHandler exists
  if (!currencyHandler) {
    throw new Error("currencyHandler not found");
  }
  describe("Correct Currency Masking Behavior", () => {
    it("Caso 1: entrada '1' debe mostrar '1.00' y retornar '1'", () => {
      const out = currencyHandler.apply("1", null);
      expect(out.formatted).toBe("1.00");
      expect(out.raw).toBe("1");
      expect(out.meta?.valueInCents).toBe(100);
      expect(out.meta?.valueInDollars).toBe(1);
    });

    it("Caso 2: entrada '123' debe mostrar '123.00' y retornar '123'", () => {
      const out = currencyHandler.apply("123", null);
      expect(out.formatted).toBe("123.00");
      expect(out.raw).toBe("123");
      expect(out.meta?.valueInCents).toBe(12300);
      expect(out.meta?.valueInDollars).toBe(123);
    });

    it("Caso 3: entrada '123456789' debe mostrar '123,456,789.00' y retornar '123456789'", () => {
      const out = currencyHandler.apply("123456789", null);
      expect(out.formatted).toBe("123,456,789.00");
      expect(out.raw).toBe("123456789");
      expect(out.meta?.valueInCents).toBe(12345678900);
      expect(out.meta?.valueInDollars).toBe(123456789);
    });

    it("Caso 4: entrada '123456.50' debe mostrar '123,456.50' y retornar '12345650'", () => {
      const out = currencyHandler.apply("123456.50", null);
      expect(out.formatted).toBe("123,456.50");
      expect(out.raw).toBe("12345650");
      expect(out.meta?.valueInCents).toBe(12345650);
      expect(out.meta?.valueInDollars).toBe(123456.5);
    });
  });

  describe("Edge Cases and Special Inputs", () => {
    it("handles empty input correctly", () => {
      const out = currencyHandler.apply("", null);
      expect(out.raw).toBe("");
      expect(out.formatted).toBe("0.00");
      expect(out.meta?.valueInCents).toBe(0);
      expect(out.meta?.valueInDollars).toBe(0);
      expect(out.meta?.isEmpty).toBe(true);
    });

    it("handles single digit correctly", () => {
      const out = currencyHandler.apply("5", null);
      expect(out.formatted).toBe("5.00");
      expect(out.raw).toBe("5");
      expect(out.meta?.valueInCents).toBe(500);
      expect(out.meta?.valueInDollars).toBe(5);
    });

    it("handles two digits correctly", () => {
      const out = currencyHandler.apply("50", null);
      expect(out.formatted).toBe("50.00");
      expect(out.raw).toBe("50");
      expect(out.meta?.valueInCents).toBe(5000);
      expect(out.meta?.valueInDollars).toBe(50);
    });

    it("handles three digits correctly", () => {
      const out = currencyHandler.apply("500", null);
      expect(out.formatted).toBe("500.00");
      expect(out.raw).toBe("500");
      expect(out.meta?.valueInCents).toBe(50000);
      expect(out.meta?.valueInDollars).toBe(500);
    });

    it("handles decimal input correctly", () => {
      const out = currencyHandler.apply("123.45", null);
      expect(out.formatted).toBe("123.45");
      expect(out.raw).toBe("12345");
      expect(out.meta?.valueInCents).toBe(12345);
      expect(out.meta?.valueInDollars).toBe(123.45);
    });

    it("handles input with commas correctly", () => {
      const out = currencyHandler.apply("1,234.56", null);
      expect(out.formatted).toBe("1,234.56");
      expect(out.raw).toBe("123456");
      expect(out.meta?.valueInCents).toBe(123456);
      expect(out.meta?.valueInDollars).toBe(1234.56);
    });
  });

  describe("parse() - Parsing Functionality", () => {
    it("parses formatted currency back to raw digits", () => {
      expect(currencyHandler.parse?.("1,234.56")).toBe("123456");
      expect(currencyHandler.parse?.("123.45")).toBe("12345");
      expect(currencyHandler.parse?.("50.00")).toBe("5000");
      expect(currencyHandler.parse?.("5.00")).toBe("500");
    });

    it("handles empty string", () => {
      expect(currencyHandler.parse?.("")).toBe("");
    });

    it("handles format with non-numeric characters", () => {
      expect(currencyHandler.parse?.("$1,234.56")).toBe("123456");
    });
  });

  describe("validate() - Validation Functionality", () => {
    it("accepts valid digit strings", () => {
      expect(currencyHandler.validate?.("123")).toBe(true);
      expect(currencyHandler.validate?.("0")).toBe(true);
      expect(currencyHandler.validate?.("999999")).toBe(true);
    });

    it("rejects strings with non-digits", () => {
      expect(currencyHandler.validate?.("12a34")).toBe(false);
      expect(currencyHandler.validate?.("12.34")).toBe(false);
      expect(currencyHandler.validate?.("12,34")).toBe(false);
      expect(currencyHandler.validate?.("abc")).toBe(false);
    });

    it("rejects empty string", () => {
      expect(currencyHandler.validate?.("")).toBe(false);
    });

    it("rejects null and undefined", () => {
      expect(currencyHandler.validate?.(null as any)).toBe(false);
      expect(currencyHandler.validate?.(undefined as any)).toBe(false);
    });
  });

  describe("Integration Scenarios", () => {
    it("handles complete user interaction flow", () => {
      // Simulate user typing "123" step by step
      let out = currencyHandler.apply("1", 0);
      expect(out.formatted).toBe("1.00");
      expect(out.caret).toBe(1);

      out = currencyHandler.apply("12", 1);
      expect(out.formatted).toBe("12.00");
      expect(out.caret).toBe(2);

      out = currencyHandler.apply("123", 2);
      expect(out.formatted).toBe("123.00");
      expect(out.caret).toBe(3);
    });

    it("handles editing existing value", () => {
      // User has "123.00" and wants to change it to "523.00"
      const out = currencyHandler.apply("523", 0);
      expect(out.formatted).toBe("523.00");
      expect(out.raw).toBe("523");
    });

    it("handles clearing and starting over", () => {
      // User clears the field and types "7"
      let out = currencyHandler.apply("", null);
      expect(out.formatted).toBe("0.00");
      expect(out.meta?.isEmpty).toBe(true);

      out = currencyHandler.apply("7", 0);
      expect(out.formatted).toBe("7.00");
      expect(out.raw).toBe("7");
      expect(out.meta?.isEmpty).toBe(false);
    });
  });

  describe("Real-world Usage Scenarios", () => {
    it("handles price input for e-commerce", () => {
      const testCases = [
        { input: "999", expected: "999.00", description: "Price $999.00" },
        { input: "1999", expected: "1,999.00", description: "Price $1,999.00" },
        { input: "9999", expected: "9,999.00", description: "Price $9,999.00" },
        {
          input: "99999",
          expected: "99,999.00",
          description: "Price $99,999.00",
        },
      ];

      testCases.forEach(({ input, expected, description }) => {
        const out = currencyHandler.apply(input, null);
        expect(out.formatted).toBe(expected);
      });
    });

    it("handles decimal price inputs", () => {
      const testCases = [
        { input: "9.99", expected: "9.99", description: "Price $9.99" },
        { input: "19.99", expected: "19.99", description: "Price $19.99" },
        { input: "99.99", expected: "99.99", description: "Price $99.99" },
        { input: "999.99", expected: "999.99", description: "Price $999.99" },
      ];

      testCases.forEach(({ input, expected, description }) => {
        const out = currencyHandler.apply(input, null);
        expect(out.formatted).toBe(expected);
      });
    });
  });
});
