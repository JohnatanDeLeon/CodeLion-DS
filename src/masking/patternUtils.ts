import type { FormatPattern } from "./patternTypes";

const DIGIT = "#";
const LETTER = "A";
const ALNUM = "X";

const isPlaceholder = (ch: string) => [DIGIT, LETTER, ALNUM].includes(ch);

export function isCharAllowed(char: string, pattern: FormatPattern) {
  return pattern.allowedChars.test(char);
}

export function format(value: string, patternDef: FormatPattern) {
  const pattern = patternDef.pattern;
  const raw = patternDef.transform ? patternDef.transform(value) : value;
  let out = "";
  let ri = 0;

  for (let pi = 0; pi < pattern.length && ri < raw.length; pi++) {
    const pch = pattern[pi];
    if (isPlaceholder(pch)) {
      const ch = raw[ri];
      const ok =
        (pch === DIGIT && /\d/.test(ch)) ||
        (pch === LETTER && /[A-Za-z]/.test(ch)) ||
        (pch === ALNUM && /[A-Za-z0-9]/.test(ch));
      if (ok) {
        out += ch;
        ri++;
      } else {
        // skip input char if it doesn't match; advance raw until match
        ri++;
        pi--; // retry same pattern position with next raw char
      }
    } else {
      out += pch;
    }
  }

  return out;
}

export function unformat(formatted: string, patternDef: FormatPattern) {
  const re = new RegExp(patternDef.allowedChars.source, "g");
  const matches = formatted.match(re);
  return matches ? matches.join("") : "";
}

export function calculateCursorPosition(
  oldValue: string,
  newValue: string,
  oldCursor: number,
  patternDef: FormatPattern,
) {
  const pat = patternDef.pattern;
  let placeholdersBefore = 0;
  for (
    let i = 0, vi = 0;
    i < pat.length && vi < oldValue.length && i < oldCursor;
    i++
  ) {
    const pch = pat[i];
    if (isPlaceholder(pch)) {
      placeholdersBefore++;
      vi++;
    }
  }

  let seen = 0;
  for (let i = 0; i < newValue.length; i++) {
    const ch = newValue[i];
    if (patternDef.allowedChars.test(ch)) seen++;
    if (seen >= placeholdersBefore) return i + 1;
  }
  return newValue.length;
}

export function generatePlaceholder(patternDef: FormatPattern) {
  return patternDef.pattern
    .replaceAll(DIGIT, "0")
    .replaceAll(LETTER, "A")
    .replaceAll(ALNUM, "0");
}
