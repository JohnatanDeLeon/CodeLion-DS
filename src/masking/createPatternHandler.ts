import type { FormatPattern } from "./patternTypes";
import type { MaskHandler, InputMaskResult } from "./types";
import { format, unformat, calculateCursorPosition } from "./patternUtils";

export function createPatternHandler(patternDef: FormatPattern): MaskHandler {
  return {
    id: `pattern:${patternDef.pattern}`,
    apply(input: string, caret: number | null) {
      const normalized = patternDef.transform ? patternDef.transform(input) : input;
      const raw = unformat(normalized, patternDef);

      let rawTrimmed = raw;
      if (patternDef.maxLength) rawTrimmed = raw.slice(0, patternDef.maxLength);

      const formatted = format(rawTrimmed, patternDef);

      let newCaret: number | null = formatted.length;
      if (caret != null) {
        newCaret = calculateCursorPosition(input, formatted, caret, patternDef);
      }

      let isValid = true;
      if (patternDef.validate) {
        isValid = patternDef.validate(rawTrimmed, formatted);
      } else if (patternDef.maxLength) {
        isValid = rawTrimmed.length === patternDef.maxLength;
      }

      let isComplete = false;
      if (patternDef.maxLength) {
        isComplete = rawTrimmed.length === patternDef.maxLength;
      }

      const meta = {
        isValid,
        isComplete,
      };

      return {
        raw: rawTrimmed,
        formatted,
        caret: newCaret,
        meta,
      } as InputMaskResult;
    },
    parse(formatted: string) {
      return unformat(formatted, patternDef);
    },
    validate(raw: string) {
      if (patternDef.validate) {
        return patternDef.validate(raw, format(raw, patternDef));
      }

      if (!patternDef.maxLength) return true;

      return raw.length <= (patternDef.maxLength || Infinity);
    },
  };
}
