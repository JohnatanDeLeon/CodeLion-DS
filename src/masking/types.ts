export type MaskId = string;
export type CaretPosition = number | null;

export interface InputMaskResult {
  raw: string;
  formatted: string;
  caret?: CaretPosition;
  meta?: Record<string, unknown>;
}

export interface MaskHandler<Opts = unknown> {
  id: MaskId;
  apply(input: string, caret: CaretPosition, options?: Opts): InputMaskResult;
  parse?(formatted: string, options?: Opts): string;
  validate?(raw: string, options?: Opts): boolean;
}
