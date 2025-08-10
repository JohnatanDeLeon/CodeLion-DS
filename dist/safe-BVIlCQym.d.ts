import React from 'react';
import { ClassValue } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'gradient';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    loading?: boolean;
    children: React.ReactNode;
}
declare const ButtonInline: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

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

export { ButtonInline as B, cnx as a, createVariants as b, cn as c, type ButtonProps as d, mergeStyles as m };
