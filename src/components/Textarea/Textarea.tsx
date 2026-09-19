import React from "react";
import {
  inputContainer,
  inputErrorMessage,
  inputFullWidth,
  inputHint,
  inputLabel,
  inputLabelError,
  inputLabelRequired,
} from "../../styles/recipes/input.css";
import { textareaRecipe } from "../../styles/recipes/textarea.css";
import { cn } from "../../utils";

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  /** Visible label, associated with the field. */
  label?: string;
  /** Hint shown under the field while there is no error. */
  helperText?: string;
  /** Message shown under the field when `state` is "error". */
  errorMessage?: string;
  /** Validation state. "error" marks the field invalid for assistive tech. */
  state?: "default" | "error";
  /** Padding and font size, matching the Input sizes. */
  size?: "sm" | "md" | "lg";
  /** Stretch to the width of the container. */
  fullWidth?: boolean;
  /** Marks the field as required, visually and for assistive tech. */
  required?: boolean;
  /** Class for the outer container. */
  containerClassName?: string;
}

/**
 * Multi-line text field with the same anatomy as Input: label, field and a
 * message that is announced when it is an error.
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      helperText,
      errorMessage,
      state = "default",
      size = "md",
      fullWidth = false,
      required = false,
      containerClassName,
      className,
      id: idProp,
      rows = 4,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const id = idProp ?? generatedId;
    const messageId = `${id}-helper`;
    const hasError = state === "error";
    const message = hasError ? errorMessage : helperText;

    return (
      <div
        className={cn(
          inputContainer,
          fullWidth && inputFullWidth,
          containerClassName,
        )}
      >
        {label && (
          <label
            htmlFor={id}
            className={cn(
              inputLabel,
              required && inputLabelRequired,
              hasError && inputLabelError,
            )}
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          rows={rows}
          required={required}
          aria-required={required || undefined}
          aria-invalid={hasError || undefined}
          aria-describedby={message ? messageId : undefined}
          className={cn(textareaRecipe({ size, state, fullWidth }), className)}
          {...props}
        />
        {message && (
          <div
            id={messageId}
            className={hasError ? inputErrorMessage : inputHint}
            role={hasError ? "alert" : undefined}
          >
            {message}
          </div>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
