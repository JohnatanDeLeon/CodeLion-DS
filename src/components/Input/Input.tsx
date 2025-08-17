import React from "react";
import {
  inputContainer,
  inputWrapper,
  inputField,
  inputFieldWithLeftIcon,
  inputFieldWithRightIcon,
  inputFieldWithBothIcons,
  inputFieldWithErrorAndRightIcon,
  inputFieldError,
  inputFieldSuccess,
  inputFieldWarning,
  inputFieldSmall,
  inputFieldLarge,
  inputFieldSmallWithLeftIcon,
  inputFieldSmallWithRightIcon,
  inputFieldLargeWithLeftIcon,
  inputFieldLargeWithRightIcon,
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
} from "../../styles/recipes/input.css";
import { cn } from "../../utils";
import { aria } from "../../utils/a11y";
import { useInputFormat } from "../../hooks/useInputFormat";
import type { FormattedInputProps } from "../../types/formatting";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">, FormattedInputProps {
  /**
   * Visual style variant of the input
   */
  variant?: "default" | "search" | "email";

  /**
   * Size of the input
   */
  size?: "sm" | "md" | "lg";

  /**
   * Visual state of the input
   */
  state?: "default" | "error" | "success" | "warning";

  /**
   * Whether the input should take full width of its container
   */
  fullWidth?: boolean;

  /**
   * Label text for the input
   */
  label?: string;

  /**
   * Helper text displayed below the input
   */
  helperText?: string;

  /**
   * Error message displayed below the input (overrides helperText when state is error)
   */
  errorMessage?: string;

  /**
   * Success message displayed below the input (overrides helperText when state is success)
   */
  successMessage?: string;

  /**
   * Warning message displayed below the input (overrides helperText when state is warning)
   */
  warningMessage?: string;

  /**
   * Whether the input is required
   */
  required?: boolean;

  /**
   * Icon to display inside the input
   */
  icon?: React.ReactNode;

  /**
   * Position of the icon
   */
  iconPosition?: "left" | "right";

  /**
   * Loading state - shows loading spinner in icon position
   */
  loading?: boolean;

  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;

  /**
   * Additional CSS classes for the label
   */
  labelClassName?: string;

  /**
   * Additional CSS classes for the helper text
   */
  helperClassName?: string;

  /**
   * Unique identifier for the input (used for accessibility)
   */
  id?: string;

  /**
   * Name attribute for form submission
   */
  name?: string;

  /**
   * Callback fired when the value changes
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Callback fired when the input loses focus
   */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;

  /**
   * Callback fired when the input gains focus
   */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

/**
 * Input Component
 *
 * Versatile input component with proper icon-placeholder spacing.
 * Implements direct CSS classes to solve icon overlap issues.
 * Follows WCAG 2.1 AA accessibility guidelines.
 *
 * @example
 * ```tsx
 * <Input
 *   label="Email Address"
 *   type="email"
 *   placeholder="you@example.com"
 *   icon={<MailIcon />}
 *   iconPosition="left"
 * />
 * ```
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = "default",
      size = "md",
      state = "default",
      fullWidth = true,
      label: labelText,
      helperText: helperTextProp,
      errorMessage,
      successMessage,
      warningMessage,
      required = false,
      icon,
      iconPosition = "right",
      loading = false,
      containerClassName,
      labelClassName,
      helperClassName,
      id: idProp,
      className,
      disabled,
      type = "text",
      // Nuevas props de formateo
      format,
      formatEvents,
      showFormatIndicator = false,
      formatIndicatorStyle = "subtle",
      ...props
    },
    ref,
  ) => {
    // Generate unique ID if not provided
    const id = idProp || React.useId();
    const helperTextId = `${id}-helper`;

    // Hook de formateo (opcional)
    const formatting = format ? useInputFormat({
      config: format,
      initialValue: props.defaultValue?.toString() || props.value?.toString() || "",
      immediate: true,
    }) : null;

    // Determinar valores según si hay formateo o no
    const inputValue = formatting ? formatting.formattedValue : props.value;
    const inputPlaceholder = formatting 
      ? formatting.getFormattedPlaceholder() 
      : props.placeholder;

    // Determine icon presence and positioning
    const hasLeftIcon = iconPosition === "left" && (icon || loading);
    const hasRightIcon = iconPosition === "right" && (icon || loading);
    const hasError = state === "error";
    const hasStateIcon = state === "error" || state === "success" || state === "warning";
    
    // Mostrar indicador de formato si está configurado
    const hasFormatIndicator = showFormatIndicator && formatting;

    // Determine the message to display based on state
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

    // Generate ARIA attributes
    const a11yDescription = formatting ? formatting.getA11yDescription() : "";
    const fullDescription = [displayMessage, a11yDescription].filter(Boolean).join(". ");
    
    // Determinar inputmode según el tipo de formato
    const getInputMode = (): "search" | "email" | "tel" | "text" | "url" | "none" | "numeric" | "decimal" | undefined => {
      if (!format) return undefined;
      
      switch (format.type) {
        case "phone":
        case "phone-international":
          return "tel";
        case "credit-card":
        case "credit-card-cvv":
          return "numeric";
        case "currency":
        case "currency-no-cents":
          return "decimal";
        default:
          return undefined;
      }
    };

    // Determinar autocomplete según el tipo de formato
    const getAutoComplete = (): string | undefined => {
      if (!format) return undefined;
      
      switch (format.type) {
        case "phone":
        case "phone-international":
          return "tel";
        case "credit-card":
          return "cc-number";
        case "credit-card-expiry":
          return "cc-exp";
        case "credit-card-cvv":
          return "cc-csc";
        default:
          return undefined;
      }
    };
    
    const inputAriaAttributes = {
      ...aria.input({
        required,
        invalid: state === "error" || (formatting?.isValid === false),
        describedBy: fullDescription ? helperTextId : undefined,
      }),
      "aria-describedby": fullDescription ? helperTextId : undefined,
      inputMode: getInputMode(),
      autoComplete: getAutoComplete(),
    };

    // Build input field classes - SOLUCIÓN ESPECÍFICA PARA SOLAPAMIENTO
    const getInputFieldClasses = () => {
      const classes = [inputField];
      
      // Agregar clase base según tamaño
      if (size === "sm") {
        classes.push(inputFieldSmall);
      } else if (size === "lg") {
        classes.push(inputFieldLarge);
      }
      
      // Agregar clases de estado
      if (state === "error") {
        classes.push(inputFieldError);
      } else if (state === "success") {
        classes.push(inputFieldSuccess);
      } else if (state === "warning") {
        classes.push(inputFieldWarning);
      }
      
      // CLAVES: Clases específicas para evitar solapamiento ícono-placeholder
      if (hasLeftIcon && hasRightIcon) {
        classes.push(inputFieldWithBothIcons);
      } else if (hasLeftIcon) {
        if (size === "sm") {
          classes.push(inputFieldSmallWithLeftIcon);
        } else if (size === "lg") {
          classes.push(inputFieldLargeWithLeftIcon);
        } else {
          classes.push(inputFieldWithLeftIcon); // 44px padding-left
        }
      } else if (hasRightIcon || hasStateIcon) {
        if (hasError && hasRightIcon) {
          classes.push(inputFieldWithErrorAndRightIcon); // 48px padding-right
        } else if (size === "sm") {
          classes.push(inputFieldSmallWithRightIcon);
        } else if (size === "lg") {
          classes.push(inputFieldLargeWithRightIcon);
        } else {
          classes.push(inputFieldWithRightIcon); // 44px padding-right
        }
      }
      
      return cn(...classes, className);
    };

    // Render loading spinner
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
          opacity="0.25"
        />
        <path
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          fill="currentColor"
        />
      </svg>
    );

    // Render icon or loading spinner
    const renderIcon = () => {
      if (loading) {
        return renderLoadingSpinner();
      }
      return icon;
    };

    // Render format indicator
    const renderFormatIndicator = () => {
      if (!hasFormatIndicator || !formatting) return null;
      
      const indicatorClass = cn(
        "absolute top-1 right-1 text-xs font-medium px-2 py-0.5 rounded-sm transition-all duration-200",
        formatIndicatorStyle === "subtle" && "bg-neutral-100 text-neutral-500",
        formatIndicatorStyle === "prominent" && "bg-primary-100 text-primary-600",
        formatting.isComplete && "bg-success-100 text-success-600",
        !formatting.isValid && "bg-error-100 text-error-600"
      );
      
      const getIndicatorText = () => {
        if (!formatting.isValid) return "❌";
        if (formatting.isComplete) return "✓";
        const currentLength = formatting.rawValue.length;
        const pattern = format?.pattern || (format?.type ? { maxLength: undefined } : undefined);
        const maxLength = pattern?.maxLength;
        return maxLength ? `${currentLength}/${maxLength}` : `${currentLength}`;
      };
      
      return (
        <div className={indicatorClass} aria-hidden="true">
          {getIndicatorText()}
        </div>
      );
    };

    // Render state icons
    const renderStateIcon = () => {
      if (state === "error") {
        return (
          <div className={inputErrorIcon}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </div>
        );
      } else if (state === "success") {
        return (
          <div className={inputSuccessIcon}>
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
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22,4 12,14.01 9,11.01" />
            </svg>
          </div>
        );
      } else if (state === "warning") {
        return (
          <div className={inputWarningIcon}>
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
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              <path d="M12 9v4" />
              <path d="m12 17 .01 0" />
            </svg>
          </div>
        );
      }
      return null;
    };

    // Build label classes
    const getLabelClasses = () => {
      const classes = [inputLabel];
      if (required) {
        classes.push(inputLabelRequired);
      }
      if (state === "error") {
        classes.push(inputLabelError);
      }
      return cn(...classes, labelClassName);
    };

    // Manejador de cambios que respeta el estado disabled
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled || loading) {
        return; // No permitir cambios si está disabled o loading
      }
      
      if (formatting) {
        formatting.handleChange(event);
      } else if (props.onChange) {
        props.onChange(event);
      }
    };

    // Manejador de pegado que respeta el estado disabled
    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
      if (disabled || loading) {
        event.preventDefault();
        return;
      }
      
      if (formatting) {
        formatting.handlePaste(event);
      } else if (props.onPaste) {
        props.onPaste(event);
      }
    };

    // Manejador de teclas que respeta el estado disabled
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled || loading) {
        // Permitir solo teclas de navegación básicas
        const allowedKeys = ['Tab', 'Escape', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
        if (!allowedKeys.includes(event.key)) {
          event.preventDefault();
          return;
        }
      }
      
      if (formatting) {
        formatting.handleKeyDown(event);
      } else if (props.onKeyDown) {
        props.onKeyDown(event);
      }
    };

    // Manejador de selección que respeta el estado disabled
    const handleSelect = (event: React.SyntheticEvent<HTMLInputElement>) => {
      if (formatting) {
        formatting.handleSelect(event);
      } else if (props.onSelect) {
        props.onSelect(event);
      }
    };

    return (
      <div className={cn(inputContainer, containerClassName)}>
        {/* Label */}
        {labelText && (
          <label htmlFor={id} className={getLabelClasses()}>
            {labelText}
          </label>
        )}

        {/* Input wrapper - Posicionamiento relativo para íconos absolutos */}
        <div className={inputWrapper}>
          {/* Left icon - Posición absoluta a 16px del borde izquierdo */}
          {hasLeftIcon && (
            <div className={inputLeftIcon} aria-hidden="true">
              {renderIcon()}
            </div>
          )}

          {/* Input field con padding específico para evitar solapamiento */}
          <input
            ref={ref}
            id={id}
            type={type}
            value={inputValue}
            placeholder={inputPlaceholder}
            className={getInputFieldClasses()}
            disabled={disabled || loading}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            onSelect={handleSelect}
            onBlur={props.onBlur}
            onFocus={props.onFocus}
            {...inputAriaAttributes}
            {...(formatting ? {} : props)} // Solo pasar props extras si no hay formateo
            data-testid={(props as any)['data-testid']} // Asegurar propagación de data-testid
          />

          {/* Right icon - Solo si no hay ícono de estado */}
          {hasRightIcon && !hasStateIcon && (
            <div className={inputRightIcon} aria-hidden="true">
              {renderIcon()}
            </div>
          )}

          {/* State icons (error, success, warning) */}
          {hasStateIcon && renderStateIcon()}
          
          {/* Format indicator */}
          {hasFormatIndicator && renderFormatIndicator()}
        </div>

        {/* Helper text / Error message */}
        {fullDescription && (
          <div
            id={helperTextId}
            className={cn(
              state === "error" ? inputErrorMessage : inputHint,
              helperClassName,
            )}
            role={state === "error" ? "alert" : undefined}
          >
            {fullDescription}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";