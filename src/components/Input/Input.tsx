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

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: "default" | "search" | "email";
  size?: "sm" | "md" | "lg";
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
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = "md",
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
      containerClassName,
      labelClassName,
      helperClassName,
      id: idProp,
      className,
      disabled,
      type = "text",
      onChange,
      onBlur,
      onFocus,
      fullWidth: _fullWidth,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const id = idProp ?? generatedId;
    const helperTextId = `${id}-helper`;

    const hasLeftIcon = iconPosition === "left" && (icon || loading);
    const hasRightIcon = iconPosition === "right" && (icon || loading);
    const hasError = state === "error";
    const hasStateIcon =
      state === "error" || state === "success" || state === "warning";

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

    const inputAriaAttributes = {
      ...aria.input({
        required,
        invalid: state === "error",
        describedBy: displayMessage ? helperTextId : undefined,
      }),
      "aria-describedby": displayMessage ? helperTextId : undefined,
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled || loading) return;
      onChange?.(event);
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
      if (size === "sm") classes.push(inputFieldSmall);
      if (size === "lg") classes.push(inputFieldLarge);

      if (state === "error") classes.push(inputFieldError);
      else if (state === "success") classes.push(inputFieldSuccess);
      else if (state === "warning") classes.push(inputFieldWarning);

      if (hasLeftIcon && hasRightIcon) {
        classes.push(inputFieldWithBothIcons);
      } else if (hasLeftIcon) {
        if (size === "sm") classes.push(inputFieldSmallWithLeftIcon);
        else if (size === "lg") classes.push(inputFieldLargeWithLeftIcon);
        else classes.push(inputFieldWithLeftIcon);
      } else if (hasRightIcon || hasStateIcon) {
        if (hasError && hasRightIcon) {
          classes.push(inputFieldWithErrorAndRightIcon);
        } else if (size === "sm") {
          classes.push(inputFieldSmallWithRightIcon);
        } else if (size === "lg") {
          classes.push(inputFieldLargeWithRightIcon);
        } else {
          classes.push(inputFieldWithRightIcon);
        }
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
          opacity="0.25"
        />
        <input
          id={fieldId}
          ref={ref}
          className={styles.inputField}
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          {...rest}
        />
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

    const getLabelClasses = () => {
      const classes = [inputLabel];
      if (required) classes.push(inputLabelRequired);
      if (state === "error") classes.push(inputLabelError);
      return cn(...classes, labelClassName);
    };

    return (
      <div className={cn(inputContainer, containerClassName)}>
        {labelText && (
          <label htmlFor={id} className={getLabelClasses()}>
            {labelText}
          </label>
        )}

        <div className={inputWrapper}>
          {hasLeftIcon && (
            <div className={inputLeftIcon} aria-hidden="true">
              {renderIcon()}
            </div>
          )}

          {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
          <input
            ref={ref}
            id={id}
            role="textbox"
            type={type}
            disabled={disabled || loading}
            className={getInputFieldClasses()}
            {...props}
            {...inputAriaAttributes}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          {hasRightIcon && !hasStateIcon && (
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
