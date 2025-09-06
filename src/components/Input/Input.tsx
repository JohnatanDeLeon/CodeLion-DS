import React from "react";
import {
  inputContainer,
  inputWrapper,
  inputField,
  inputLeftIcon,
  inputRightIcon,
  inputLabel,
  inputLabelRequired,
  inputLabelError,
  inputHint,
  inputErrorMessage,
  inputErrorIcon,
  inputSuccessIcon,
  inputWarningIcon,
  inputSpinner,
  inputFullWidth,
  inputRecipe,
  inputSearchRecipe,
  inputWrapperRecipe,
  inputSearchIcon,
  inputSearchClearIcon,
} from "../../styles/recipes/input.css";
import { cn } from "../../utils";
import { aria } from "../../utils/a11y";
import { useInputMask } from "../../masking/useInputMask";
import { defaultRegistry } from "../../masking/registry";
// Ensure handlers are registered
import "../../masking/handlers";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: "search";
  size?: "sm" | "md" | "lg" | "xl";
  state?: "default" | "error" | "success" | "warning";
  fullWidth?: boolean;
  label?: string;
  helperText?: string;
  errorMessage?: string;
  successMessage?: string;
  warningMessage?: string;
  required?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  loading?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  helperClassName?: string;
  id?: string;
  name?: string;
  /** Optional mask configuration */
  mask?: { id: string; options?: unknown };
  /** Notified when the mask produces raw/formatted values */
  onValueChange?: (v: {
    raw: string;
    formatted: string;
    meta?: Record<string, unknown>;
  }) => void;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant,
      size = "lg",
      state = "default",
      label: labelText,
      helperText: helperTextProp,
      errorMessage,
      successMessage,
      warningMessage,
      required = false,
      icon,
      iconPosition = "right",
      loading = false,
      fullWidth = false,
      containerClassName,
      labelClassName,
      helperClassName,
      id: idProp,
      className,
      disabled,
      type = "text",
      onChange,
      onFocus,
      onBlur,
      mask,
      onValueChange,
      value: valueProp,
      defaultValue: defaultValueProp,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const id = idProp ?? generatedId;
    const helperTextId = `${id}-helper`;

    // initialize mask hook (mask may be undefined) - hook handles pass-through
    const maskHook = useInputMask({
      mask,
      registry: defaultRegistry,
      value: valueProp as string | undefined,
      defaultValue: defaultValueProp as string | undefined,
      onChange,
      onValueChange,
      inputRef: ref as React.Ref<HTMLInputElement> | undefined,
    });

    const maskedInputProps = maskHook.inputProps;

    // Search variant automatically shows search icon on the left
    const hasSearchIcon = variant === "search";
    const hasLeftIcon =
      !!(iconPosition === "left" && (icon || loading)) || hasSearchIcon;
    const hasRightIcon = !!(iconPosition === "right" && (icon || loading));
    const hasError = state === "error";
    const hasStateIcon =
      state === "error" || state === "success" || state === "warning";

    // Search clear functionality
    const currentValue = maskedInputProps.value || "";
    const hasSearchClearIcon = variant === "search" && currentValue.length > 0;

    const handleSearchClear = () => {
      if (disabled || loading) return;
      
      // Clear the input value
      const clearEvent = {
        target: { value: "" },
        currentTarget: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>;
      
      maskedInputProps.onChange?.(clearEvent);
      
      // Focus back to the input after clearing
      const inputElement = document.getElementById(id) as HTMLInputElement;
      if (inputElement) {
        inputElement.focus();
      }
    };

    const getDisplayMessage = () => {
      switch (state) {
        case "error":
          return errorMessage;
        case "success":
          return successMessage;
        case "warning":
          return warningMessage;
        default:
          return helperTextProp;
      }
    };

    const displayMessage = getDisplayMessage();

    // Provide ARIA attributes. If no visual label is provided, fall back to
    // an accessible name (preferring explicit `aria-label`, otherwise the
    // placeholder) so automated a11y checks and assistive tech can identify
    // the control.
    const explicitAriaLabel = (props as Record<string, unknown>)[
      "aria-label"
    ] as string | undefined;
    const placeholderText = props.placeholder;
    const nameProp = props.name;

    // If a visual label is provided prefer that. Otherwise pick an accessible
    // name from aria-label, placeholder, name/id or fall back to a conservative
    // default so automated checks have an accessible name.
    const fallbackAriaLabel =
      explicitAriaLabel ??
      (labelText
        ? undefined
        : (placeholderText ?? nameProp ?? id ?? "Input field"));

    const inputAriaAttributes = {
      ...aria.input({
        required,
        invalid: state === "error",
        describedBy: displayMessage ? helperTextId : undefined,
      }),
      "aria-describedby": displayMessage ? helperTextId : undefined,
      ...(fallbackAriaLabel ? { "aria-label": fallbackAriaLabel } : {}),
    } as const;

    // change handling delegated to mask hook (maskedInputProps) or native onChange passed via props

    // wrap masked onChange to respect disabled/loading states (previous behavior)
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled || loading) return;
      maskedInputProps.onChange?.(e);
    };

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      if (disabled || loading) return;
      onFocus?.(event);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      if (disabled || loading) return;
      onBlur?.(event);
    };

    const getInputFieldClasses = () => {
      const classes = [inputField];

      if (variant === "search") {
        // Para search variant, usar el recipe específico que evita conflictos
        classes.push(
          inputSearchRecipe({
            size,
            state,
            fullWidth: Boolean(fullWidth),
          }),
        );
      } else {
        // Para variantes normales, usar el recipe estándar con íconos
        const iconVariant =
          hasLeftIcon && hasRightIcon
            ? "both"
            : hasLeftIcon
              ? "left"
              : hasRightIcon
                ? "right"
                : "none";

        classes.push(
          inputRecipe({
            size,
            state,
            icons: iconVariant,
            errorRight: Boolean(hasError && hasRightIcon),
            fullWidth: Boolean(fullWidth),
          }),
        );
      }

      return cn(...classes, className);
    };

    const renderLoadingSpinner = () => (
      <svg
        className={inputSpinner}
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="img"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="2"
          opacity={0.25}
        />
        <path
          d="M22 12a10 10 0 0 1-10 10"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    );

    const renderSearchIcon = () => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="img"
      >
        <circle
          cx="11"
          cy="11"
          r="8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="m21 21-4.35-4.35"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );

    const renderSearchClearIcon = () => (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="button"
        tabIndex={0}
      >
        <line
          x1="18"
          y1="6"
          x2="6"
          y2="18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          x1="6"
          y1="6"
          x2="18"
          y2="18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );

    const renderIcon = () => {
      if (loading) return renderLoadingSpinner();
      if (icon) return icon;
      return null;
    };

    const renderLeftIcon = () => {
      if (hasSearchIcon && iconPosition !== "left") {
        // Search variant always shows search icon on the left (unless user explicitly set left icon)
        return renderSearchIcon();
      }
      return renderIcon();
    };

    const renderStateIcon = () => {
      if (state === "error") {
        return (
          <div className={inputErrorIcon} aria-hidden="true">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <circle cx="12" cy="16" r="1" />
            </svg>
          </div>
        );
      }

      if (state === "success") {
        return (
          <div className={inputSuccessIcon} aria-hidden="true">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        );
      }

      if (state === "warning") {
        return (
          <div className={inputWarningIcon} aria-hidden="true">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94A2 2 0 0 0 22.18 18L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12" y2="17" />
            </svg>
          </div>
        );
      }

      return null;
    };

    const getLabelClasses = () => {
      const classes = [inputLabel];
      if (required) classes.push(inputLabelRequired);
      if (state === "error") classes.push(inputLabelError);
      return cn(...classes, labelClassName);
    };

    return (
      <div
        className={cn(
          inputContainer,
          fullWidth && inputFullWidth,
          containerClassName,
        )}
      >
        {labelText && (
          <label htmlFor={id} className={getLabelClasses()}>
            {labelText}
          </label>
        )}

        <div className={cn(inputWrapper, inputWrapperRecipe)}>
          {hasLeftIcon && (
            <div
              className={hasSearchIcon ? inputSearchIcon : inputLeftIcon}
              aria-hidden="true"
            >
              {renderLeftIcon()}
            </div>
          )}

          <input
            /* ref/value/onChange may be provided by maskedInputProps */
            id={id}
            type={type}
            disabled={disabled || loading}
            className={getInputFieldClasses()}
            {...props}
            {...maskedInputProps}
            onChange={handleInputChange}
            {...inputAriaAttributes}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          {hasSearchClearIcon && (
            <div
              className={inputSearchClearIcon}
              onClick={handleSearchClear}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleSearchClear();
                }
              }}
              role="button"
              tabIndex={0}
              aria-label="Clear search"
              title="Clear search"
            >
              {renderSearchClearIcon()}
            </div>
          )}

          {hasRightIcon && !hasStateIcon && !hasSearchClearIcon && (
            <div className={inputRightIcon} aria-hidden="true">
              {renderIcon()}
            </div>
          )}

          {hasStateIcon && renderStateIcon()}
        </div>

        {displayMessage && (
          <div
            id={helperTextId}
            className={cn(
              state === "error" ? inputErrorMessage : inputHint,
              helperClassName,
            )}
            role={state === "error" ? "alert" : undefined}
          >
            {displayMessage}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
