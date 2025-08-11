import React$1 from 'react';
import { ClassValue } from 'clsx';

interface ButtonProps extends React$1.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Visual style variant of the button
     */
    variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'gradient';
    /**
     * Size of the button
     */
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'icon';
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
    children: React$1.ReactNode;
    /**
     * Additional CSS classes
     */
    className?: string;
    /**
     * Click handler
     */
    onClick?: (event: React$1.MouseEvent<HTMLButtonElement>) => void;
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
declare const Button: React$1.ForwardRefExoticComponent<ButtonProps & React$1.RefAttributes<HTMLButtonElement>>;

/**
 * Utility function to merge CSS classes
 * Combines clsx functionality for conditional classes
 *
 * @param inputs - Class values to merge
 * @returns Merged class string
 *
 * @example
 * ```tsx
 * cn('base-class', isActive && 'active-class', className)
 * ```
 */
declare function cn(...inputs: ClassValue[]): string;
/**
 * Type-safe utility for creating conditional class objects
 * Useful for component variants and states
 *
 * @param classes - Object with condition -> class mappings
 * @returns Merged class string
 *
 * @example
 * ```tsx
 * const buttonClasses = cnx({
 *   'btn-base': true,
 *   'btn-primary': variant === 'primary',
 *   'btn-disabled': disabled,
 * });
 * ```
 */
declare function cnx(classes: Record<string, boolean | undefined>): string;
/**
 * Utility for merging Tailwind classes with vanilla-extract styles
 * Ensures proper class precedence
 *
 * @param vanillaExtractClass - Class from vanilla-extract
 * @param tailwindClasses - Additional Tailwind utility classes
 * @returns Merged class string
 *
 * @example
 * ```tsx
 * mergeStyles(buttonStyles({ variant: 'primary' }), 'focus:ring-2 focus:ring-offset-2')
 * ```
 */
declare function mergeStyles(vanillaExtractClass: string, ...tailwindClasses: ClassValue[]): string;
/**
 * Creates a style variant utility function
 * Useful for creating component style variants with TypeScript support
 *
 * @param baseClass - Base class string
 * @param variants - Variant configuration object
 * @returns Function that accepts variant props and returns class string
 *
 * @example
 * ```tsx
 * const buttonVariants = createVariants('btn-base', {
 *   variant: {
 *     primary: 'btn-primary',
 *     secondary: 'btn-secondary',
 *   },
 *   size: {
 *     sm: 'btn-sm',
 *     md: 'btn-md',
 *   }
 * });
 *
 * // Usage
 * buttonVariants({ variant: 'primary', size: 'md' })
 * ```
 */
declare function createVariants<T extends Record<string, Record<string, string>>>(baseClass: string, variants: T): (props: { [K in keyof T]?: keyof T[K]; } & {
    className?: string;
}) => string;

/**
 * Design System Tokens
 * Centralized design tokens with TypeScript support
 */

/**
 * Design system configuration
 */
declare const designSystemConfig: {
    readonly name: "@johnatandeleon/design-system";
    readonly version: "0.1.0";
    readonly themes: {
        readonly light: "light";
        readonly dark: "dark";
    };
    readonly breakpoints: {
        readonly xs: "320px";
        readonly sm: "640px";
        readonly md: "768px";
        readonly lg: "1024px";
        readonly xl: "1280px";
        readonly '2xl': "1536px";
    };
    readonly zIndex: {
        readonly hide: -1;
        readonly auto: "auto";
        readonly base: 0;
        readonly docked: 10;
        readonly dropdown: 1000;
        readonly sticky: 1100;
        readonly banner: 1200;
        readonly overlay: 1300;
        readonly modal: 1400;
        readonly popover: 1500;
        readonly skipLink: 1600;
        readonly toast: 1700;
        readonly tooltip: 1800;
    };
};

/**
 * Responsive utilities for design system components
 */
/**
 * Get media query for a specific breakpoint
 *
 * @param breakpoint - Breakpoint name
 * @returns CSS media query string
 *
 * @example
 * ```tsx
 * const mediaQuery = getMediaQuery('md'); // '@media (min-width: 768px)'
 * ```
 */
declare function getMediaQuery(breakpoint: keyof typeof designSystemConfig.breakpoints): string;
/**
 * Creates responsive value utilities
 * Maps breakpoints to values for responsive design
 *
 * @example
 * ```tsx
 * const responsiveWidth = createResponsiveValue({
 *   xs: '100%',
 *   md: '50%',
 *   lg: '33.333%'
 * });
 * ```
 */
declare function createResponsiveValue<T>(values: Partial<Record<keyof typeof designSystemConfig.breakpoints, T>>): Record<string, T>;
/**
 * Type helper for responsive props
 */
type ResponsiveValue<T> = T | Partial<Record<keyof typeof designSystemConfig.breakpoints, T>>;
/**
 * Utility to resolve responsive values
 *
 * @param value - Responsive value or static value
 * @returns Resolved value for current context
 */
declare function resolveResponsiveValue<T>(value: ResponsiveValue<T>, currentBreakpoint?: keyof typeof designSystemConfig.breakpoints): T;
/**
 * Hook-like utility for responsive values (for use in vanilla-extract)
 */
declare const responsive: {
    /**
     * Creates a responsive style object
     */
    readonly style: typeof createResponsiveValue;
    /**
     * Creates responsive spacing
     */
    readonly spacing: (values: Partial<Record<keyof typeof designSystemConfig.breakpoints, string>>) => Record<string, string>;
    /**
     * Creates responsive typography
     */
    readonly fontSize: (values: Partial<Record<keyof typeof designSystemConfig.breakpoints, string>>) => Record<string, string>;
};

/**
 * Accessibility utilities for design system components
 * Helpers for WCAG 2.1 AA compliance
 */
/**
 * Screen reader only styles
 * Hides content visually but keeps it accessible to screen readers
 */
declare const srOnly: {
    readonly position: "absolute";
    readonly width: "1px";
    readonly height: "1px";
    readonly padding: "0";
    readonly margin: "-1px";
    readonly overflow: "hidden";
    readonly clip: "rect(0, 0, 0, 0)";
    readonly whiteSpace: "nowrap";
    readonly borderWidth: "0";
};
/**
 * Focus visible styles for keyboard navigation
 * Provides consistent focus indicators across components
 */
declare const focusVisible: {
    readonly outline: "2px solid transparent";
    readonly outlineOffset: "2px";
    readonly ':focus-visible': {
        readonly outline: "2px solid currentColor";
        readonly outlineOffset: "2px";
    };
};
/**
 * Focus ring styles using box-shadow
 * Alternative to outline for better control
 */
declare const focusRing: (color?: string, opacity?: number) => {
    ':focus': {
        outline: string;
        outlineOffset: string;
    };
    ':focus-visible': {
        outline: string;
        outlineOffset: string;
        boxShadow: string;
    };
};
/**
 * Generates ARIA attributes for common patterns
 */
declare const aria: {
    /**
     * Button ARIA attributes
     */
    button: (props: {
        pressed?: boolean;
        expanded?: boolean;
        disabled?: boolean;
        describedBy?: string;
        labelledBy?: string;
    }) => Record<string, string | boolean | undefined>;
    /**
     * Input ARIA attributes
     */
    input: (props: {
        required?: boolean;
        invalid?: boolean;
        describedBy?: string;
        labelledBy?: string;
        placeholder?: string;
    }) => Record<string, string | boolean | undefined>;
    /**
     * Menu/Dropdown ARIA attributes
     */
    menu: (props: {
        expanded?: boolean;
        hasPopup?: boolean;
        controls?: string;
        activeDescendant?: string;
    }) => Record<string, string | boolean | undefined>;
    /**
     * Dialog/Modal ARIA attributes
     */
    dialog: (props: {
        labelledBy?: string;
        describedBy?: string;
        modal?: boolean;
    }) => Record<string, string | boolean | undefined>;
};
/**
 * Color contrast utilities
 * Helpers for ensuring WCAG AA compliance
 */
declare const contrast: {
    /**
     * Calculate relative luminance of a color
     * Used for contrast ratio calculations
     */
    getLuminance: (r: number, g: number, b: number) => number;
    /**
     * Calculate contrast ratio between two colors
     * Returns ratio that should be >= 4.5 for AA compliance
     */
    getContrastRatio: (color1: [number, number, number], color2: [number, number, number]) => number;
    /**
     * Check if color combination meets WCAG AA standards
     */
    meetsAA: (color1: [number, number, number], color2: [number, number, number]) => boolean;
    /**
     * Check if color combination meets WCAG AAA standards
     */
    meetsAAA: (color1: [number, number, number], color2: [number, number, number]) => boolean;
};
/**
 * Keyboard navigation utilities
 */
declare const keyboard: {
    /**
     * Standard keyboard event handlers
     */
    handlers: {
        onEnterOrSpace: (callback: () => void) => (event: KeyboardEvent) => void;
        onEscape: (callback: () => void) => (event: KeyboardEvent) => void;
        onArrowKeys: (callbacks: {
            up?: () => void;
            down?: () => void;
            left?: () => void;
            right?: () => void;
        }) => (event: KeyboardEvent) => void;
    };
    /**
     * Focus management utilities
     */
    focus: {
        /**
         * Get all focusable elements within a container
         */
        getFocusableElements: (container: HTMLElement) => HTMLElement[];
        /**
         * Trap focus within a container (for modals, dropdowns)
         */
        trapFocus: (container: HTMLElement) => () => void;
    };
};
/**
 * Announcement utilities for screen readers
 */
declare const announce: {
    /**
     * Create a live region for screen reader announcements
     */
    createLiveRegion: (level?: "polite" | "assertive") => HTMLElement;
    /**
     * Announce message to screen readers
     */
    message: (message: string, level?: "polite" | "assertive") => void;
};

/**
 * Design System Types
 * Shared TypeScript types and interfaces
 */
/**
 * Base component props that all components should extend
 */
interface BaseComponentProps {
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
interface PolymorphicProps<T extends React.ElementType = 'div'> {
    /**
     * The underlying HTML element or React component to render
     */
    as?: T;
}
/**
 * Standard size variants used across components
 */
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
/**
 * Standard color variants for semantic components
 */
type Variant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
/**
 * Loading state interface
 */
interface LoadingState {
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
interface DisabledState {
    /**
     * Whether the component is disabled
     */
    disabled?: boolean;
}
/**
 * Common interactive component props
 */
interface InteractiveProps extends LoadingState, DisabledState {
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
interface FormFieldProps {
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
interface ThemeContextType {
    /**
     * Current theme name
     */
    theme: 'light' | 'dark';
    /**
     * Function to toggle theme
     */
    toggleTheme: () => void;
    /**
     * Function to set specific theme
     */
    setTheme: (theme: 'light' | 'dark') => void;
}
/**
 * Design system responsive value type
 */
type DSResponsiveValue<T> = T | {
    xs?: T;
    sm?: T;
    md?: T;
    lg?: T;
    xl?: T;
    '2xl'?: T;
};
/**
 * Component ref types for common HTML elements
 */
type ButtonRef = React.Ref<HTMLButtonElement>;
type InputRef = React.Ref<HTMLInputElement>;
type TextareaRef = React.Ref<HTMLTextAreaElement>;
type SelectRef = React.Ref<HTMLSelectElement>;
type DivRef = React.Ref<HTMLDivElement>;
type SpanRef = React.Ref<HTMLSpanElement>;

export { type BaseComponentProps, Button, type ButtonProps, type ButtonRef, type DSResponsiveValue, type DisabledState, type DivRef, type FormFieldProps, type InputRef, type InteractiveProps, type LoadingState, type PolymorphicProps, type ResponsiveValue, type SelectRef, type Size, type SpanRef, type TextareaRef, type ThemeContextType, type Variant, announce, aria, cn, cnx, contrast, createResponsiveValue, createVariants, focusRing, focusVisible, getMediaQuery, keyboard, mergeStyles, resolveResponsiveValue, responsive, srOnly };
