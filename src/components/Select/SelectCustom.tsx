import React from "react";
import { cn } from "../../utils";
import { colors } from "../../styles/tokens";
import {
  selectCustomContainer,
  selectCustomWrapper,
  selectCustomTrigger,
  selectCustomTriggerLabel,
  selectCustomPopover,
  selectCustomListbox,
  selectCustomOption,
  selectCustomCheck,
  selectCustomLabel,
  selectCustomChevon,
} from "../../styles/recipes/select.custom.css";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectCustomProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  id?: string;
  helperText?: string;
  state?: "default" | "error" | "success" | "warning";
}

export const SelectCustom = React.forwardRef<
  HTMLButtonElement,
  SelectCustomProps
>(
  (
    {
      label,
      placeholder = "Select…",
      options,
      value,
      defaultValue,
      onChange,
      open: openProp,
      onOpenChange,
      disabled,
      id: idProp,
      className,
      ...rest
    },
    ref,
  ) => {
    const internalId = React.useId();
    const id = idProp ?? internalId;

    const isControlled = value !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = React.useState<
      string | undefined
    >(defaultValue);
    const selectedValue = isControlled ? value : uncontrolledValue;

    const [open, setOpen] = React.useState<boolean>(false);
    const isOpen = openProp !== undefined ? openProp : open;

    const buttonRef = React.useRef<HTMLButtonElement | null>(null);
    const listRef = React.useRef<HTMLUListElement | null>(null);
    const mergedRef = React.useCallback(
      (node: HTMLButtonElement | null) => {
        buttonRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref)
          (ref as React.MutableRefObject<HTMLButtonElement | null>).current =
            node;
      },
      [ref],
    );

    const [activeIndex, setActiveIndex] = React.useState<number>(() => {
      const idx = options.findIndex((o) => o.value === selectedValue);
      return idx >= 0 ? idx : 0;
    });

    const updateOpen = React.useCallback(
      (next: boolean) => {
        if (onOpenChange) onOpenChange(next);
        else setOpen(next);
      },
      [onOpenChange],
    );

    const commitSelection = (index: number) => {
      const opt = options[index];
      if (!opt || opt.disabled) return;
      if (!isControlled) setUncontrolledValue(opt.value);
      onChange?.(opt.value);
      updateOpen(false);
      // return focus to trigger for a11y
      setTimeout(() => buttonRef.current?.focus(), 0);
    };

    const moveActive = (delta: number) => {
      const len = options.length;
      let next = activeIndex;
      for (let i = 0; i < len; i++) {
        next = (next + delta + len) % len;
        if (!options[next]?.disabled) break;
      }
      setActiveIndex(next);
      // ensure item is visible
      const list = listRef.current;
      const item = list?.children[next] as HTMLElement | undefined;
      if (list && item) {
        const itemTop = item.offsetTop;
        const itemBottom = itemTop + item.offsetHeight;
        const viewTop = list.scrollTop;
        const viewBottom = viewTop + list.clientHeight;
        if (itemTop < viewTop) list.scrollTop = itemTop;
        else if (itemBottom > viewBottom)
          list.scrollTop = itemBottom - list.clientHeight;
      }
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
      if (!isOpen) {
        if (
          e.key === "ArrowDown" ||
          e.key === "ArrowUp" ||
          e.key === "Enter" ||
          e.key === " "
        ) {
          e.preventDefault();
          updateOpen(true);
        }
        return;
      }

      switch (e.key) {
        case "Escape":
          e.preventDefault();
          updateOpen(false);
          break;
        case "ArrowDown":
          e.preventDefault();
          moveActive(1);
          break;
        case "ArrowUp":
          e.preventDefault();
          moveActive(-1);
          break;
        case "Home":
          e.preventDefault();
          setActiveIndex(0);
          break;
        case "End":
          e.preventDefault();
          setActiveIndex(options.length - 1);
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          commitSelection(activeIndex);
          break;
        default:
          break;
      }
    };

    // close on outside click
    React.useEffect(() => {
      if (!isOpen) return;
      const onDocClick = (ev: MouseEvent) => {
        const target = ev.target as Node;
        const within =
          buttonRef.current?.contains(target) ||
          listRef.current?.contains(target);
        if (!within) updateOpen(false);
      };
      document.addEventListener("mousedown", onDocClick);
      return () => document.removeEventListener("mousedown", onDocClick);
    }, [isOpen, updateOpen]);

    const selectedOption = options.find((o) => o.value === selectedValue);
    const displayLabel = selectedOption?.label ?? placeholder;
    const isPlaceholder = !selectedOption;

    return (
      <div className={selectCustomContainer}>
        {label && <label className={selectCustomLabel}>{label}</label>}
        <div className={selectCustomWrapper}>
          <button
            id={id}
            ref={mergedRef}
            type="button"
            role="combobox"
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-controls={`${id}-listbox`}
            className={cn(selectCustomTrigger, className)}
            disabled={disabled}
            onClick={() => updateOpen(!isOpen)}
            onKeyDown={onKeyDown}
            {...rest}
          >
            <span
              className={selectCustomTriggerLabel}
              data-placeholder={isPlaceholder || undefined}
              style={
                isPlaceholder
                  ? { color: colors.neutral[500] as unknown as string }
                  : undefined
              }
            >
              {displayLabel}
            </span>
            <svg
              className={selectCustomChevon}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {isOpen && (
            <div className={selectCustomPopover} role="presentation">
              <ul
                id={`${id}-listbox`}
                role="listbox"
                aria-labelledby={id}
                className={selectCustomListbox}
                ref={listRef}
                tabIndex={-1}
              >
                {options.map((opt, idx) => {
                  const active = idx === activeIndex;
                  const selected = opt.value === selectedValue;
                  const itemId = `${id}-option-${idx}`;
                  return (
                    <li
                      id={itemId}
                      key={opt.value}
                      role="option"
                      aria-selected={selected}
                      aria-disabled={opt.disabled || undefined}
                      className={selectCustomOption({
                        active,
                        selected,
                        disabled: !!opt.disabled,
                      })}
                      onMouseEnter={() => setActiveIndex(idx)}
                      onMouseDown={(e) => {
                        // prevent button blur before we handle selection
                        e.preventDefault();
                      }}
                      onClick={() => commitSelection(idx)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          commitSelection(idx);
                        }
                      }}
                      tabIndex={-1}
                    >
                      <span>{opt.label}</span>
                      {selected && (
                        <svg
                          className={selectCustomCheck}
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            d="M20 6L9 17l-5-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  },
);

SelectCustom.displayName = "SelectCustom";
