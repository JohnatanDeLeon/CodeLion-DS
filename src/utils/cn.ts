import { clsx, type ClassValue } from 'clsx';

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
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

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
export function cnx(classes: Record<string, boolean | undefined>): string {
  return cn(
    Object.entries(classes)
      .filter(([, condition]) => condition)
      .map(([className]) => className)
  );
}

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
export function mergeStyles(
  vanillaExtractClass: string,
  ...tailwindClasses: ClassValue[]
): string {
  return cn(vanillaExtractClass, ...tailwindClasses);
}

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
export function createVariants<T extends Record<string, Record<string, string>>>(
  baseClass: string,
  variants: T
) {
  return function(
    props: {
      [K in keyof T]?: keyof T[K];
    } & { className?: string }
  ): string {
    const variantClasses = Object.entries(variants)
      .map(([key, variantMap]) => {
        const selectedVariant = props[key as keyof typeof props];
        return selectedVariant ? variantMap[selectedVariant as string] : '';
      })
      .filter(Boolean);

    return cn(baseClass, ...variantClasses, props.className);
  };
}