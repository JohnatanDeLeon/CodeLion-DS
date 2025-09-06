import type { MaskHandler, CaretPosition } from "../types";

export const currencyHandler: MaskHandler = {
  id: "currency",
  apply(input: string, caret?: CaretPosition) {
    // Remove all non-digit and non-decimal characters, but preserve one decimal point
    const cleaned = input.replace(/[^0-9.]/g, "");

    // Ensure only one decimal point exists
    const parts = cleaned.split(".");
    let processedInput = parts[0];
    if (parts.length > 1) {
      // Take only the first decimal part and limit to 2 decimal places
      processedInput = parts[0] + "." + parts[1].slice(0, 2);
    }

    // Parse as float and format
    // Don't convert empty or just-decimal-point to 0, keep them empty
    if (processedInput === "" || processedInput === ".") {
      return { raw: "", formatted: "", caret };
    }

    const num = parseFloat(processedInput);

    // Handle invalid numbers
    if (isNaN(num)) {
      return { raw: "", formatted: "", caret };
    }

    // Determine if we should show decimals based on input
    const hasDecimals = processedInput.includes(".") || num % 1 !== 0;

    const formatted = num.toLocaleString(undefined, {
      minimumFractionDigits: hasDecimals ? 2 : 0,
      maximumFractionDigits: 2,
    });

    // For raw value, preserve the clean numeric input
    const raw = processedInput;

    // caret preservation: determine number of characters before original caret and map
    let newCaret: CaretPosition = null;
    if (typeof caret === "number") {
      const before = Math.max(0, caret);
      const charsBefore = input.slice(0, before).replace(/[^0-9.]/g, "").length;
      if (charsBefore === 0) newCaret = 0;
      else {
        // find position after the charsBefore-th character in formatted
        let seen = 0;
        for (let i = 0; i < formatted.length; i++) {
          if (/[\d.]/.test(formatted[i])) seen++;
          if (seen === charsBefore) {
            newCaret = i + 1;
            break;
          }
        }
        if (newCaret === null) newCaret = formatted.length;
      }
    }

    return { raw, formatted, caret: newCaret };
  },
  parse(s: string) {
    // Remove all non-digit and non-decimal characters, preserve one decimal point
    const cleaned = s.replace(/[^0-9.]/g, "");
    const parts = cleaned.split(".");
    if (parts.length > 1) {
      return parts[0] + "." + parts[1].slice(0, 2);
    }
    return cleaned;
  },
  validate: (_raw: string) => true,
};
