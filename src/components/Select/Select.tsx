import React from "react";
import { cn } from "../../utils";
import { colors } from "../../styles/tokens";
import {
  selectContainer,
  selectWrapper,
  selectTriggerLabel,
  selectPopover,
  selectListbox,
  selectListboxScrollable,
  selectOption,
  selectCheck,
  selectLabel,
  selectChevron,
  selectRecipe,
} from "../../styles/recipes/select.css";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

// Unified Select props (parity with previous Select + extra for forms)
export interface SelectProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  variant?: "default";
  uiSize?: "sm" | "md" | "lg" | "xl";
  state?: "default" | "error" | "success" | "warning";
  fullWidth?: boolean;
  label?: string;
  helperText?: string;
  errorMessage?: string;
  successMessage?: string;
  warningMessage?: string;
  required?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  helperClassName?: string;
  id?: string;

  name?: string; // hidden input for form posting
  placeholder?: string;
  options?: SelectOption[]; // alternatively inferred from children <option>
  children?: React.ReactNode;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  // Enable vertical scroll when options are many. If true, adds max-height and overflow.
  scroll?: boolean;
  // Optional max height when scroll is enabled (e.g., "20rem" or number in px). Defaults to 16rem.
  maxListHeight?: string | number;
  // Customizable colors
  focusRingColor?: string; // ring color when focused/opened
  optionHoverBgColor?: string; // option hover background
  optionHoverTextColor?: string; // option hover text color
  optionTextColor?: string; // default option text color
  checkIconColor?: string; // check icon color for selected option
  selectedOptionBgColor?: string; // selected option background color
  selectedOptionTextColor?: string; // selected option text color
}

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      variant = "default",
      uiSize = "lg",
      state = "default",
      fullWidth = false,
      label,
      helperText,
      errorMessage,
      successMessage,
      warningMessage,
      required,
      containerClassName,
      labelClassName,
      helperClassName,
      name,
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
      children,
      scroll,
      maxListHeight,
      focusRingColor,
      optionHoverBgColor,
      optionHoverTextColor,
      optionTextColor,
      checkIconColor,
      selectedOptionBgColor,
      selectedOptionTextColor,
      ...rest
    },
    ref,
  ) => {
    void variant; // reserved for future variants
    const internalId = React.useId();
    const id = idProp ?? internalId;

    // Compute helper message to display under control
    const displayMessage =
      state === "error"
        ? errorMessage
        : state === "success"
          ? successMessage
          : state === "warning"
            ? warningMessage
            : helperText;

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

    // Build options from props.options or from children <option>
    const computedOptions: SelectOption[] = React.useMemo(() => {
      if (options && options.length) return options;
      const fromChildren: SelectOption[] = [];
      React.Children.forEach(children, (child) => {
        if (!React.isValidElement(child)) return;
        if (child.type === "option") {
          const props = child.props as {
            value?: string;
            disabled?: boolean;
            children?: React.ReactNode;
          };
          const val = (props.value ?? "").toString();
          const lbl = (props.children ?? String(val)) as string;
          const dis = !!props.disabled;
          fromChildren.push({
            value: String(val),
            label: String(lbl),
            disabled: dis,
          });
        }
      });
      return fromChildren;
    }, [options, children]);

    const [activeIndex, setActiveIndex] = React.useState<number>(() => {
      const idx = computedOptions.findIndex((o) => o.value === selectedValue);
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
      const opt = computedOptions[index];
      if (!opt || opt.disabled) return;
      if (!isControlled) setUncontrolledValue(opt.value);
      onChange?.(opt.value);
      updateOpen(false);
      // return focus to trigger for a11y
      setTimeout(() => buttonRef.current?.focus(), 0);
    };

    const moveActive = (delta: number) => {
      const len = computedOptions.length;
      let next = activeIndex;
      for (let i = 0; i < len; i++) {
        next = (next + delta + len) % len;
        if (!computedOptions[next]?.disabled) break;
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
          setActiveIndex(computedOptions.length - 1);
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

    const selectedOption = computedOptions.find(
      (o) => o.value === selectedValue,
    );
    const displayLabel = selectedOption?.label ?? placeholder;
    const isPlaceholder = !selectedOption;

    const labelId = `${id}-label`;

    // Inline CSS variables for customizable colors
    type CSSVarStyle = React.CSSProperties & {
      [key: `--${string}`]: string | number;
    };
    const cssVars: CSSVarStyle = {} as CSSVarStyle;
    if (focusRingColor) cssVars["--select-focus-ring-color"] = focusRingColor;
    if (optionHoverBgColor)
      cssVars["--select-option-hover-bg"] = optionHoverBgColor;
    if (optionHoverTextColor)
      cssVars["--select-option-hover-color"] = optionHoverTextColor;
    if (optionTextColor)
      cssVars["--select-option-text-color"] = optionTextColor;
    if (checkIconColor) cssVars["--select-check-color"] = checkIconColor;
    if (selectedOptionBgColor)
      cssVars["--select-option-selected-bg"] = selectedOptionBgColor;
    if (selectedOptionTextColor)
      cssVars["--select-option-selected-color"] = selectedOptionTextColor;

    return (
      <div className={cn(selectContainer, containerClassName)} style={cssVars}>
        {label && (
          <label id={labelId} className={cn(selectLabel, labelClassName)}>
            {label}
            {required ? " *" : null}
          </label>
        )}
        <div className={selectWrapper}>
          <button
            id={id}
            ref={mergedRef}
            type="button"
            role="combobox"
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-controls={`${id}-listbox`}
            aria-labelledby={label ? labelId : undefined}
            aria-label={label || undefined}
            className={cn(
              selectRecipe({ uiSize, state, fullWidth }),
              className,
            )}
            disabled={disabled}
            aria-required={required || undefined}
            aria-invalid={state === "error" || undefined}
            onClick={() => updateOpen(!isOpen)}
            onKeyDown={onKeyDown}
            {...rest}
          >
            <span
              className={selectTriggerLabel}
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
              className={selectChevron}
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
            <div className={selectPopover} role="presentation">
              <ul
                id={`${id}-listbox`}
                role="listbox"
                aria-labelledby={id}
                className={cn(selectListbox, scroll && selectListboxScrollable)}
                style={
                  scroll && maxListHeight
                    ? {
                        maxHeight:
                          typeof maxListHeight === "number"
                            ? `${maxListHeight}px`
                            : maxListHeight,
                      }
                    : undefined
                }
                data-scroll={scroll ? "true" : undefined}
                ref={listRef}
                tabIndex={-1}
              >
                {computedOptions.map((opt, idx) => {
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
                      className={selectOption({
                        active,
                        selected,
                        disabled: !!opt.disabled,
                      })}
                      onMouseEnter={() => setActiveIndex(idx)}
                      onMouseDown={(e) => {
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
                          className={selectCheck}
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

        {name && (
          <input type="hidden" name={name} value={selectedValue ?? ""} />
        )}

        {displayMessage && (
          <div
            className={cn(helperClassName)}
            role={state === "error" ? "alert" : undefined}
          >
            {displayMessage}
          </div>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";
