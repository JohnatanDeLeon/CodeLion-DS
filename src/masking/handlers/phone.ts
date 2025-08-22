import type { MaskHandler, CaretPosition } from "../types";

export const phoneHandler: MaskHandler = {
  id: "phone",
  apply(input: string, caret?: CaretPosition) {
    const digits = input.replace(/\D/g, "").slice(0, 10);
    let formatted = digits;
    if (digits.length >= 7) {
      formatted = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    } else if (digits.length >= 4) {
      formatted = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    } else if (digits.length >= 1) {
      formatted = `(${digits}`;
    }

    // caret preservation: map number of digits before original caret to new formatted index
    let newCaret: CaretPosition = null;
    if (typeof caret === "number") {
      const before = Math.max(0, caret);
      const digitsBefore = input.slice(0, before).replace(/\D/g, "").length;
      if (digitsBefore === 0) {
        // place after opening paren or at start
        newCaret = formatted.indexOf("(") >= 0 ? formatted.indexOf("(") + 1 : 0;
      } else {
        // find position after the digitsBefore-th digit in formatted
        let seen = 0;
        for (let i = 0; i < formatted.length; i++) {
          if (/\d/.test(formatted[i])) seen++;
          if (seen === digitsBefore) {
            newCaret = i + 1;
            break;
          }
        }
        if (newCaret === null) newCaret = formatted.length;
      }
    }

    return { raw: digits, formatted, caret: newCaret };
  },
  parse(formatted: string) {
    return formatted.replace(/\D/g, "");
  },
  validate(raw: string) {
    return raw.replace(/\D/g, "").length === 10;
  },
};
