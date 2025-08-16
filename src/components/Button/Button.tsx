import React from "react";
import {
  button,
  spinner,
  gradientCustomClass,
} from "../../styles/recipes/button.css";
import { cn } from "../../utils";
import { useGradient } from "../../hooks/useGradient";
import type { GradientProps } from "../../types/gradient";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual style variant of the button
   */
  variant?: "primary" | "secondary" | "ghost" | "destructive" | "gradient";

  /**
   * Size of the button
   */
  size?: "sm" | "md" | "lg" | "xl" | "icon";

  /**
   * Whether the button should take full width of its container
   */
  fullWidth?: boolean;

  /**
   * Loading state - shows loading indicator and disables interaction
   */
  loading?: boolean;

  /**
   * Content to render inside the button
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Gradient configuration (only applies when variant="gradient")
   * Can be a simple object with startColor/endColor or advanced configuration
   *
   * @example
   * // Simple gradient
   * gradient={{ startColor: "#ff6b6b", endColor: "#ee5a52" }}
   *
   * @example
   * // Advanced gradient with full control
   * gradient={{
   *   gradient: {
   *     default: { direction: 135, stops: [{ color: "#ff6b6b", position: 0 }] },
   *     hover: { direction: 135, stops: [{ color: "#ee5a52", position: 0 }] }
   *   }
   * }}
   */
  gradient?: GradientProps;

  /**
   * Click handler
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * Button Component
 *
 * Versatile button component with multiple variants, sizes, and states.
 * Follows WCAG 2.1 AA accessibility guidelines.
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   Click me
 * </Button>
 * ```
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      loading = false,
      disabled,
      className,
      children,
      gradient,
      onClick,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const internalRef = React.useRef<HTMLButtonElement | null>(null);

    // Use gradient hook for custom gradient functionality
    const gradientStyles = useGradient(
      variant === "gradient" ? gradient : undefined,
      {
        cssPropertyPrefix: "gradient",
        generateCustomProperties: true,
      },
    );

    const setRefs = (node: HTMLButtonElement | null) => {
      internalRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref)
        (ref as React.MutableRefObject<HTMLButtonElement | null>).current =
          node;
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (loading || disabled) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    };

    // Combine custom gradient styles with any user-provided styles
    const combinedStyle = React.useMemo(() => {
      const baseStyle = props.style || {};
      const gradientStyle = gradientStyles
        ? {
            background: gradientStyles.background,
            ...gradientStyles.customProperties,
          }
        : {};

      return { ...baseStyle, ...gradientStyle };
    }, [props.style, gradientStyles]);

    return (
      <button
        ref={setRefs}
        type={type}
        className={cn(
          button({
            variant,
            size,
            fullWidth,
            loading,
          }),
          // Add gradient custom class when using custom gradients
          gradientStyles?.className && gradientCustomClass,
          className,
        )}
        style={combinedStyle}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        onClick={handleClick}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            if (!disabled && !loading) internalRef.current?.click();
          } else if (event.key === " ") {
            // Prevent page scroll; actual click will be fired on keyup for Space
            event.preventDefault();
          }
        }}
        onKeyUp={(event) => {
          if (event.key === " ") {
            event.preventDefault();
            if (!disabled && !loading) internalRef.current?.click();
          }
        }}
        {...props}
      >
        {loading && (
          <svg
            role="img"
            className={spinner}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              opacity="0.25"
            />
            <path
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              fill="currentColor"
            />
          </svg>
        )}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
