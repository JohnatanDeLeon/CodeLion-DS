export interface FormatPattern {
  pattern: string;
  allowedChars: RegExp;
  placeholder?: string;
  description?: string;
  transform?: (value: string) => string;
  validate?: (value: string, formattedValue: string) => boolean;
  maxLength?: number;
  announceChanges?: boolean;
}
