import { phoneHandler } from "./phone";

describe("phoneHandler", () => {
  it("formats partial and full phone numbers", () => {
    expect(phoneHandler.apply("1", null).formatted).toContain("(");
    expect(phoneHandler.apply("1234", null).formatted).toContain(")");
    expect(phoneHandler.apply("1234567890", null).formatted).toBe(
      "(123) 456-7890",
    );
  });

  it("parses to digits only", () => {
    expect(phoneHandler.parse?.("(123) 456-7890")).toBe("1234567890");
  });

  it("validates 10-digit numbers", () => {
    expect(phoneHandler.validate?.("1234567890")).toBe(true);
    expect(phoneHandler.validate?.("1234")).toBe(false);
  });
});
