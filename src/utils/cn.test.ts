/**
 * CSS Class Utilities Tests
 * Comprehensive test coverage for class name manipulation functions
 */

import { describe, it, expect } from 'vitest';
import { cn, cnx, mergeStyles, createVariants } from './cn';

describe('CSS Class Utilities', () => {
  describe('cn', () => {
    it('should merge basic class names', () => {
      const result = cn('class1', 'class2');
      expect(result).toBe('class1 class2');
    });

    it('should handle conditional classes', () => {
      const result = cn('base', true && 'conditional', false && 'hidden');
      expect(result).toBe('base conditional');
    });

    it('should handle undefined and null values', () => {
      const result = cn('base', undefined, null, 'valid');
      expect(result).toBe('base valid');
    });

    it('should handle empty strings', () => {
      const result = cn('base', '', 'valid');
      expect(result).toBe('base valid');
    });

    it('should handle arrays of classes', () => {
      const result = cn(['class1', 'class2'], 'class3');
      expect(result).toBe('class1 class2 class3');
    });

    it('should handle objects with boolean values', () => {
      const result = cn({
        base: true,
        active: true,
        disabled: false,
        hidden: false,
      });
      expect(result).toBe('base active');
    });

    it('should handle mixed input types', () => {
      const result = cn(
        'base',
        ['array-class1', 'array-class2'],
        {
          'object-class': true,
          'hidden-class': false,
        },
        true && 'conditional',
        undefined,
        null
      );
      expect(result).toBe('base array-class1 array-class2 object-class conditional');
    });

    it('should return empty string for no arguments', () => {
      const result = cn();
      expect(result).toBe('');
    });

    it('should preserve duplicate classes (clsx behavior)', () => {
      const result = cn('base', 'base', 'unique');
      expect(result).toBe('base base unique');
    });

    it('should handle complex conditional logic', () => {
      const isActive = true;
      const isDisabled = false;
      const size = 'large';
      
      const result = cn(
        'btn',
        isActive && 'btn-active',
        !isDisabled && 'btn-enabled',
        size === 'large' && 'btn-lg'
      );
      expect(result).toBe('btn btn-active btn-enabled btn-lg');
    });
  });

  describe('cnx', () => {
    it('should handle basic object with boolean values', () => {
      const result = cnx({
        'base-class': true,
        'active-class': true,
        'disabled-class': false,
      });
      expect(result).toBe('base-class active-class');
    });

    it('should handle empty object', () => {
      const result = cnx({});
      expect(result).toBe('');
    });

    it('should handle object with all false values', () => {
      const result = cnx({
        'class1': false,
        'class2': false,
        'class3': false,
      });
      expect(result).toBe('');
    });

    it('should handle object with all true values', () => {
      const result = cnx({
        'class1': true,
        'class2': true,
        'class3': true,
      });
      expect(result).toBe('class1 class2 class3');
    });

    it('should handle undefined values', () => {
      const result = cnx({
        'class1': true,
        'class2': undefined,
        'class3': false,
        'class4': true,
      });
      expect(result).toBe('class1 class4');
    });

    it('should work with component state', () => {
      const isActive = true;
      const isLoading = false;
      const hasError = undefined;
      
      const result = cnx({
        'btn-base': true,
        'btn-active': isActive,
        'btn-loading': isLoading,
        'btn-error': hasError,
      });
      expect(result).toBe('btn-base btn-active');
    });

    it('should handle class names with special characters', () => {
      const result = cnx({
        'class-with-dash': true,
        'class_with_underscore': true,
        'classWithCamelCase': false,
        'class.with.dots': true,
      });
      expect(result).toBe('class-with-dash class_with_underscore class.with.dots');
    });
  });

  describe('mergeStyles', () => {
    it('should merge vanilla-extract class with Tailwind classes', () => {
      const veClass = 'vanilla-extract-button';
      const result = mergeStyles(veClass, 'focus:ring-2', 'hover:bg-blue-500');
      expect(result).toBe('vanilla-extract-button focus:ring-2 hover:bg-blue-500');
    });

    it('should handle empty vanilla-extract class', () => {
      const result = mergeStyles('', 'tailwind-class');
      expect(result).toBe('tailwind-class');
    });

    it('should handle no additional classes', () => {
      const veClass = 'vanilla-extract-button';
      const result = mergeStyles(veClass);
      expect(result).toBe('vanilla-extract-button');
    });

    it('should handle conditional Tailwind classes', () => {
      const veClass = 'vanilla-extract-button';
      const isActive = true;
      const isDisabled = false;
      
      const result = mergeStyles(
        veClass,
        isActive && 'ring-2',
        !isDisabled && 'cursor-pointer'
      );
      expect(result).toBe('vanilla-extract-button ring-2 cursor-pointer');
    });

    it('should handle arrays of Tailwind classes', () => {
      const veClass = 'vanilla-extract-button';
      const result = mergeStyles(
        veClass,
        ['focus:ring-2', 'focus:ring-blue-500'],
        'hover:bg-blue-600'
      );
      expect(result).toBe('vanilla-extract-button focus:ring-2 focus:ring-blue-500 hover:bg-blue-600');
    });

    it('should handle objects with Tailwind classes', () => {
      const veClass = 'vanilla-extract-button';
      const result = mergeStyles(
        veClass,
        {
          'focus:ring-2': true,
          'focus:ring-red-500': false,
          'hover:bg-blue-500': true,
        }
      );
      expect(result).toBe('vanilla-extract-button focus:ring-2 hover:bg-blue-500');
    });

    it('should handle complex mixed scenarios', () => {
      const veClass = 'vanilla-extract-complex';
      const isActive = true;
      const size = 'large';
      
      const result = mergeStyles(
        veClass,
        'base-styles',
        ['array-class1', 'array-class2'],
        {
          'active-styles': isActive,
          'inactive-styles': !isActive,
        },
        size === 'large' && 'large-styles'
      );
      expect(result).toBe('vanilla-extract-complex base-styles array-class1 array-class2 active-styles large-styles');
    });
  });

  describe('createVariants', () => {
    it('should create a basic variant function', () => {
      const buttonVariants = createVariants('btn-base', {
        variant: {
          primary: 'btn-primary',
          secondary: 'btn-secondary',
        },
        size: {
          sm: 'btn-sm',
          md: 'btn-md',
          lg: 'btn-lg',
        },
      });

      expect(typeof buttonVariants).toBe('function');
    });

    it('should return base class with no variants', () => {
      const buttonVariants = createVariants('btn-base', {
        variant: {
          primary: 'btn-primary',
          secondary: 'btn-secondary',
        },
      });

      const result = buttonVariants({});
      expect(result).toBe('btn-base');
    });

    it('should apply single variant', () => {
      const buttonVariants = createVariants('btn-base', {
        variant: {
          primary: 'btn-primary',
          secondary: 'btn-secondary',
        },
      });

      const result = buttonVariants({ variant: 'primary' });
      expect(result).toBe('btn-base btn-primary');
    });

    it('should apply multiple variants', () => {
      const buttonVariants = createVariants('btn-base', {
        variant: {
          primary: 'btn-primary',
          secondary: 'btn-secondary',
        },
        size: {
          sm: 'btn-sm',
          md: 'btn-md',
          lg: 'btn-lg',
        },
      });

      const result = buttonVariants({ variant: 'primary', size: 'lg' });
      expect(result).toBe('btn-base btn-primary btn-lg');
    });

    it('should handle invalid variant values', () => {
      const buttonVariants = createVariants('btn-base', {
        variant: {
          primary: 'btn-primary',
          secondary: 'btn-secondary',
        },
      });

      // @ts-expect-error - Testing invalid variant
      const result = buttonVariants({ variant: 'invalid' });
      expect(result).toBe('btn-base');
    });

    it('should merge with additional className', () => {
      const buttonVariants = createVariants('btn-base', {
        variant: {
          primary: 'btn-primary',
        },
      });

      const result = buttonVariants({ variant: 'primary', className: 'custom-class' });
      expect(result).toBe('btn-base btn-primary custom-class');
    });

    it('should handle empty variants object', () => {
      const buttonVariants = createVariants('btn-base', {});

      const result = buttonVariants({ className: 'custom-class' });
      expect(result).toBe('btn-base custom-class');
    });

    it('should work with complex variant structures', () => {
      const cardVariants = createVariants('card-base', {
        variant: {
          default: 'card-default',
          outlined: 'card-outlined',
          elevated: 'card-elevated',
        },
        size: {
          sm: 'card-sm',
          md: 'card-md',
          lg: 'card-lg',
        },
        color: {
          white: 'card-white',
          gray: 'card-gray',
          blue: 'card-blue',
        },
      });

      const result = cardVariants({
        variant: 'elevated',
        size: 'lg',
        color: 'blue',
        className: 'shadow-xl',
      });
      
      expect(result).toBe('card-base card-elevated card-lg card-blue shadow-xl');
    });

    it('should handle partial variant application', () => {
      const buttonVariants = createVariants('btn-base', {
        variant: {
          primary: 'btn-primary',
          secondary: 'btn-secondary',
        },
        size: {
          sm: 'btn-sm',
          md: 'btn-md',
        },
        disabled: {
          true: 'btn-disabled',
          false: 'btn-enabled',
        },
      });

      const result = buttonVariants({ variant: 'primary', disabled: 'true' });
      expect(result).toBe('btn-base btn-primary btn-disabled');
    });

    it('should maintain type safety for variant keys', () => {
      const alertVariants = createVariants('alert-base', {
        status: {
          info: 'alert-info',
          warning: 'alert-warning',
          error: 'alert-error',
          success: 'alert-success',
        },
      });

      // These should work without TypeScript errors
      const result1 = alertVariants({ status: 'info' });
      const result2 = alertVariants({ status: 'warning' });
      const result3 = alertVariants({ status: 'error' });
      const result4 = alertVariants({ status: 'success' });

      expect(result1).toBe('alert-base alert-info');
      expect(result2).toBe('alert-base alert-warning');
      expect(result3).toBe('alert-base alert-error');
      expect(result4).toBe('alert-base alert-success');
    });

    it('should handle empty base class', () => {
      const variants = createVariants('', {
        type: {
          a: 'type-a',
          b: 'type-b',
        },
      });

      const result = variants({ type: 'a' });
      expect(result).toBe('type-a');
    });

    it('should handle undefined in className prop', () => {
      const buttonVariants = createVariants('btn-base', {
        variant: {
          primary: 'btn-primary',
        },
      });

      const result = buttonVariants({ variant: 'primary', className: undefined });
      expect(result).toBe('btn-base btn-primary');
    });
  });
});
