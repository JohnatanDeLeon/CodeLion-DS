import React from "react";
import type { MaskRegistry } from "./registry";
import type { MaskId } from "./types";

export function useInputMask(params: {
  mask?: { id: MaskId; options?: unknown } | undefined;
  registry?: MaskRegistry;
  value?: string;
  defaultValue?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onValueChange?: (
    v: {
      raw: string;
      formatted: string;
      meta?: Record<string, unknown>;
    }
  ) => void;
  inputRef?: React.Ref<HTMLInputElement>;
}) {
  const {
    mask,
    registry,
    value,
    defaultValue = "",
    onChange,
    onValueChange,
  } = params;

  // prefer an injected registry; fallback to undefined (caller should pass default)
  const reg = registry;
  const internalRef = React.useRef<HTMLInputElement | null>(null);
  const [formatted, setFormatted] = React.useState<string>(
    value ?? defaultValue,
  );
  const lastRaw = React.useRef<string>("");

  // ensure that when a mask is provided we apply it to initial/default value
  React.useEffect(() => {
    if (value !== undefined) {
      // controlled value: apply mask
      applyMask(value, null);
      return;
    }

    if (defaultValue !== undefined) {
      applyMask(defaultValue, null);
      return;
    }
    // otherwise keep existing formatted state
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mask?.id, value, defaultValue, reg]);

  const applyMask = (nextValue: string, caret: number | null) => {
    if (!mask) {
      lastRaw.current = nextValue;
      setFormatted(nextValue);
      onValueChange?.({ raw: nextValue, formatted: nextValue });
      return;
    }
    const handler = reg?.get(mask.id);
    if (!handler) {
      lastRaw.current = nextValue;
      setFormatted(nextValue);
      onValueChange?.({ raw: nextValue, formatted: nextValue });
      return;
    }
    const res = handler.apply(nextValue, caret, mask.options);
    lastRaw.current = res.raw;
    setFormatted(res.formatted);
    onValueChange?.({ raw: res.raw, formatted: res.formatted, meta: res.meta });
    if (internalRef.current && typeof res.caret === "number") {
      const el = internalRef.current;
      const caret = res.caret as number;
      requestAnimationFrame(() => {
        try {
          el.setSelectionRange(caret, caret);
        } catch (err) {
          // ignore setSelectionRange failures (some browsers/inputs)
        }
      });
    }
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const next = e.target.value;
    applyMask(next, e.target.selectionStart);
    onChange?.(e);
  };

  return {
    inputProps: {
      value: formatted,
      onChange: handleChange,
      ref: (el: HTMLInputElement | null) => {
        internalRef.current = el;
        if (typeof params.inputRef === "function") {
          params.inputRef(el);
        } else if (params.inputRef) {
          (params.inputRef as React.MutableRefObject<HTMLInputElement | null>).current = el;
        }
      },
      "data-mask-id": mask?.id,
    },
    formatted,
    raw: lastRaw.current,
    setFormatted,
    setRaw: (r: string) => applyMask(r, null),
  };
}
