import type { MaskHandler, CaretPosition } from "../types";

export const currencyHandler: MaskHandler = {
  id: "currency",
  apply(input: string, caret?: CaretPosition) {
    const digits = input.replace(/[^0-9]/g, "");
    const num = digits === "" ? 0 : parseInt(digits, 10) / 100;
    const formatted = num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    // caret preservation: determine number of digits before original caret and map
    let newCaret: CaretPosition = null;
    if (typeof caret === "number") {
      const before = Math.max(0, caret);
      const digitsBefore = input.slice(0, before).replace(/[^0-9]/g, "").length;
      if (digitsBefore === 0) newCaret = 0;
      else {
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
  parse(s: string) {
    return s.replace(/[^0-9]/g, "");
  },
  validate: (_raw: string) => true,
};
