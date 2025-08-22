import { currencyHandler } from "./currency";

describe("currencyHandler", () => {
  it("formats cents into localized currency string", () => {
    const out = currencyHandler.apply("12345", null); // 123.45
    expect(out.raw).toBe("12345");
    // formatted should contain decimal separator and two decimals
    expect(/\d+[.,]\d{2}/.test(out.formatted)).toBe(true);
  });

  it("parses formatted currency back to digits", () => {
    expect(currencyHandler.parse?.("1,234.56")).toBe("123456");
  });
});
