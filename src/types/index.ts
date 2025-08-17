/**
 * Design System Types
 * Shared TypeScript types and interfaces
 */

/**
 * Base component props that all components should extend
 */
export interface BaseComponentProps {
  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Custom data attributes
   */
  [key: `data-${string}`]: string | number | boolean | undefined;

  /**
   * ARIA attributes for accessibility
   */
  [key: `aria-${string}`]: string | number | boolean | undefined;
}

/**
 * Props for components that can be polymorphic
 */
export interface PolymorphicProps<T extends React.ElementType = "div"> {
  /**
   * The underlying HTML element or React component to render
   */
  as?: T;
}

/**
 * Standard size variants used across components
 */
export type Size = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Standard color variants for semantic components
 */
export type Variant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info";

/**
 * Loading state interface
 */
export interface LoadingState {
  /**
   * Whether the component is in a loading state
   */
  loading?: boolean;

  /**
   * Optional loading text for screen readers
   */
  loadingText?: string;
}

/**
 * Disabled state interface
 */
export interface DisabledState {
  /**
   * Whether the component is disabled
   */
  disabled?: boolean;
}

/**
 * Common interactive component props
 */
export interface InteractiveProps extends LoadingState, DisabledState {
  /**
   * Click handler
   */
  onClick?: (event: React.MouseEvent) => void;

  /**
   * Focus handler
   */
  onFocus?: (event: React.FocusEvent) => void;

  /**
   * Blur handler
   */
  onBlur?: (event: React.FocusEvent) => void;
}

/**
 * Form field common props
 */
export interface FormFieldProps {
  /**
   * Field name for form submission
   */
  name?: string;

  /**
   * Whether the field is required
   */
  required?: boolean;

  /**
   * Error message to display
   */
  error?: string;

  /**
   * Help text to display
   */
  helpText?: string;

  /**
   * Field label
   */
  label?: string;

  /**
   * Placeholder text
   */
  placeholder?: string;
}

/**
 * Theme context type
 */
export interface ThemeContextType {
  /**
   * Current theme name
   */
  theme: "light" | "dark";

  /**
   * Function to toggle theme
   */
  toggleTheme: () => void;

  /**
   * Function to set specific theme
   */
  setTheme: (theme: "light" | "dark") => void;
}

/**
 * Design system responsive value type
 */
export type DSResponsiveValue<T> =
  | T
  | {
      xs?: T;
      sm?: T;
      md?: T;
      lg?: T;
      xl?: T;
      "2xl"?: T;
    };

/**
 * Component ref types for common HTML elements
 */
export type ButtonRef = React.Ref<HTMLButtonElement>;
export type InputRef = React.Ref<HTMLInputElement>;
export type TextareaRef = React.Ref<HTMLTextAreaElement>;
export type SelectRef = React.Ref<HTMLSelectElement>;
export type DivRef = React.Ref<HTMLDivElement>;
export type SpanRef = React.Ref<HTMLSpanElement>;

// Gradient system types
export * from "./gradient";

// Formatting system types
export * from "./formatting";