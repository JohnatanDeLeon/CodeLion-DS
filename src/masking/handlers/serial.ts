import type { MaskHandler, InputMaskResult } from "../types";

const onlyAlnum = (s: string) => s.replace(/[^a-z0-9]/gi, "");

export const serialHandler: MaskHandler<{ upper?: boolean }> = {
  id: "serial",
  apply(input, caret) {
    let raw = onlyAlnum(input);
    raw = raw.toUpperCase();
    const letters = raw.slice(0, 3);
    const digits = raw.slice(3, 7);
    let formatted = letters;
    if (digits.length > 0) formatted += `-${digits}`;
    let newCaret = typeof caret === "number" ? caret : formatted.length;
    if (typeof caret === "number") {
      const hadDashBefore = input.slice(0, caret).includes("-");
      const willHaveDash = formatted.includes("-");
      if (!hadDashBefore && willHaveDash && caret > 3) newCaret = caret + 1;
      newCaret = Math.min(newCaret, formatted.length);
    }
    return {
      raw,
      formatted,
      caret: newCaret,
      meta: { kind: "serial" },
    } as InputMaskResult;
  },
  parse(formatted) {
    return onlyAlnum(formatted).toUpperCase();
  },
  validate(raw) {
    const r = onlyAlnum(raw).toUpperCase();
    return /^[A-Z]{3}\d{4}$/.test(r);
  },
};
