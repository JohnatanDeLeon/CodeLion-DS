import { currencyHandler } from "./currency";

describe("currencyHandler", () => {
  it("formats numbers with proper thousands separators", () => {
    const out = currencyHandler.apply("12345", null);
    expect(out.raw).toBe("12345");
    expect(out.formatted).toBe("12,345");
  });

  it("formats decimal numbers correctly", () => {
    const out = currencyHandler.apply("1234.56", null);
    expect(out.raw).toBe("1234.56");
    expect(out.formatted).toBe("1,234.56");
  });

  it("handles edge cases correctly", () => {
    // Empty input should remain empty (no annoying default "0")
    expect(currencyHandler.apply("", null).formatted).toBe("");
    // Just decimal point should also remain empty
    expect(currencyHandler.apply(".", null).formatted).toBe("");
    // But valid decimal starting with dot should format correctly
    expect(currencyHandler.apply(".99", null).formatted).toBe("0.99");
  });

  it("parses formatted currency back to clean decimal format", () => {
    expect(currencyHandler.parse?.("1,234.56")).toBe("1234.56");
    expect(currencyHandler.parse?.("1,000")).toBe("1000");
    expect(currencyHandler.parse?.("100.00")).toBe("100.00");
  });

  it("truncates excessive decimal places", () => {
    const out = currencyHandler.apply("123.456789", null);
    expect(out.raw).toBe("123.45");
    expect(out.formatted).toBe("123.45");
  });
});
