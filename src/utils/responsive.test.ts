/**
 * Responsive Utilities Tests
 * Comprehensive test coverage for responsive design functions
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getMediaQuery,
  createResponsiveValue,
  resolveResponsiveValue,
  responsive,
  type ResponsiveValue,
} from './responsive';

// Mock the design system config
vi.mock('../styles/tokens', () => ({
  designSystemConfig: {
    breakpoints: {
      xs: '0px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
}));

describe('Responsive Utilities', () => {
  describe('getMediaQuery', () => {
    it('should generate media query for xs breakpoint', () => {
      const result = getMediaQuery('xs');
      expect(result).toBe('@media (min-width: 0px)');
    });

    it('should generate media query for sm breakpoint', () => {
      const result = getMediaQuery('sm');
      expect(result).toBe('@media (min-width: 640px)');
    });

    it('should generate media query for md breakpoint', () => {
      const result = getMediaQuery('md');
      expect(result).toBe('@media (min-width: 768px)');
    });

    it('should generate media query for lg breakpoint', () => {
      const result = getMediaQuery('lg');
      expect(result).toBe('@media (min-width: 1024px)');
    });

    it('should generate media query for xl breakpoint', () => {
      const result = getMediaQuery('xl');
      expect(result).toBe('@media (min-width: 1280px)');
    });

    it('should generate media query for 2xl breakpoint', () => {
      const result = getMediaQuery('2xl');
      expect(result).toBe('@media (min-width: 1536px)');
    });
  });

  describe('createResponsiveValue', () => {
    it('should create responsive values for single breakpoint', () => {
      const result = createResponsiveValue({
        md: '50%',
      });
      
      expect(result).toEqual({
        '@media (min-width: 768px)': '50%',
      });
    });

    it('should create responsive values for multiple breakpoints', () => {
      const result = createResponsiveValue({
        sm: '100%',
        md: '50%',
        lg: '33.333%',
      });
      
      expect(result).toEqual({
        '@media (min-width: 640px)': '100%',
        '@media (min-width: 768px)': '50%',
        '@media (min-width: 1024px)': '33.333%',
      });
    });

    it('should handle empty values object', () => {
      const result = createResponsiveValue({});
      expect(result).toEqual({});
    });

    it('should skip undefined values', () => {
      const result = createResponsiveValue({
        sm: '100%',
        md: undefined,
        lg: '33.333%',
      });
      
      expect(result).toEqual({
        '@media (min-width: 640px)': '100%',
        '@media (min-width: 1024px)': '33.333%',
      });
    });

    it('should handle all breakpoints', () => {
      const result = createResponsiveValue({
        xs: '100%',
        sm: '80%',
        md: '60%',
        lg: '40%',
        xl: '20%',
        '2xl': '10%',
      });
      
      expect(result).toEqual({
        '@media (min-width: 0px)': '100%',
        '@media (min-width: 640px)': '80%',
        '@media (min-width: 768px)': '60%',
        '@media (min-width: 1024px)': '40%',
        '@media (min-width: 1280px)': '20%',
        '@media (min-width: 1536px)': '10%',
      });
    });

    it('should work with different value types', () => {
      const stringValues = createResponsiveValue({
        sm: 'small',
        lg: 'large',
      });

      const numberValues = createResponsiveValue({
        sm: 16,
        lg: 24,
      });

      expect(stringValues).toEqual({
        '@media (min-width: 640px)': 'small',
        '@media (min-width: 1024px)': 'large',
      });

      expect(numberValues).toEqual({
        '@media (min-width: 640px)': 16,
        '@media (min-width: 1024px)': 24,
      });
    });
  });

  describe('resolveResponsiveValue', () => {
    it('should return static value when not responsive', () => {
      const result = resolveResponsiveValue('static-value');
      expect(result).toBe('static-value');
    });

    it('should return static number value', () => {
      const result = resolveResponsiveValue(42);
      expect(result).toBe(42);
    });

    it('should handle null value', () => {
      const result = resolveResponsiveValue(null);
      expect(result).toBe(null);
    });

    it('should resolve to largest available value when no breakpoint specified', () => {
      const responsiveValue: ResponsiveValue<string> = {
        sm: 'small',
        md: 'medium',
        xl: 'extra-large',
      };
      
      const result = resolveResponsiveValue(responsiveValue);
      expect(result).toBe('extra-large');
    });

    it('should resolve to current breakpoint value', () => {
      const responsiveValue: ResponsiveValue<string> = {
        sm: 'small',
        md: 'medium',
        lg: 'large',
      };
      
      const result = resolveResponsiveValue(responsiveValue, 'md');
      expect(result).toBe('medium');
    });

    it('should fallback to xs when current breakpoint not available', () => {
      const responsiveValue: ResponsiveValue<string> = {
        xs: 'extra-small',
        lg: 'large',
      };
      
      const result = resolveResponsiveValue(responsiveValue, 'md');
      expect(result).toBe('extra-small');
    });

    it('should fallback to first available value when xs not available', () => {
      const responsiveValue: ResponsiveValue<string> = {
        md: 'medium',
        lg: 'large',
      };
      
      const result = resolveResponsiveValue(responsiveValue, 'sm');
      expect(result).toBe('medium');
    });

    it('should handle empty responsive object', () => {
      const responsiveValue: ResponsiveValue<string> = {};
      
      const result = resolveResponsiveValue(responsiveValue);
      expect(result).toBeUndefined();
    });

    it('should work with different value types', () => {
      const numberValue: ResponsiveValue<number> = {
        sm: 16,
        lg: 24,
      };
      
      const booleanValue: ResponsiveValue<boolean> = {
        sm: true,
        lg: false,
      };
      
      expect(resolveResponsiveValue(numberValue, 'sm')).toBe(16);
      expect(resolveResponsiveValue(numberValue, 'lg')).toBe(24);
      expect(resolveResponsiveValue(booleanValue, 'sm')).toBe(true);
      expect(resolveResponsiveValue(booleanValue, 'lg')).toBe(false);
    });

    it('should handle complex responsive objects', () => {
      const responsiveValue: ResponsiveValue<object> = {
        sm: { width: '100%', height: 'auto' },
        lg: { width: '50%', height: '200px' },
      };
      
      const result = resolveResponsiveValue(responsiveValue, 'lg');
      expect(result).toEqual({ width: '50%', height: '200px' });
    });
  });

  describe('responsive', () => {
    describe('responsive.style', () => {
      it('should be an alias for createResponsiveValue', () => {
        expect(responsive.style).toBe(createResponsiveValue);
      });

      it('should work like createResponsiveValue', () => {
        const result = responsive.style({
          md: 'value1',
          lg: 'value2',
        });
        
        expect(result).toEqual({
          '@media (min-width: 768px)': 'value1',
          '@media (min-width: 1024px)': 'value2',
        });
      });
    });

    describe('responsive.spacing', () => {
      it('should create responsive spacing values', () => {
        const result = responsive.spacing({
          sm: '1rem',
          md: '2rem',
          lg: '3rem',
        });
        
        expect(result).toEqual({
          '@media (min-width: 640px)': '1rem',
          '@media (min-width: 768px)': '2rem',
          '@media (min-width: 1024px)': '3rem',
        });
      });

      it('should handle different spacing units', () => {
        const result = responsive.spacing({
          sm: '8px',
          md: '1rem',
          lg: '2em',
          xl: '3vh',
        });
        
        expect(result).toEqual({
          '@media (min-width: 640px)': '8px',
          '@media (min-width: 768px)': '1rem',
          '@media (min-width: 1024px)': '2em',
          '@media (min-width: 1280px)': '3vh',
        });
      });

      it('should handle empty spacing object', () => {
        const result = responsive.spacing({});
        expect(result).toEqual({});
      });
    });

    describe('responsive.fontSize', () => {
      it('should create responsive font size values', () => {
        const result = responsive.fontSize({
          sm: '14px',
          md: '16px',
          lg: '18px',
        });
        
        expect(result).toEqual({
          '@media (min-width: 640px)': '14px',
          '@media (min-width: 768px)': '16px',
          '@media (min-width: 1024px)': '18px',
        });
      });

      it('should handle different font size units', () => {
        const result = responsive.fontSize({
          sm: '0.875rem',
          md: '1rem',
          lg: '1.125rem',
          xl: '1.25rem',
        });
        
        expect(result).toEqual({
          '@media (min-width: 640px)': '0.875rem',
          '@media (min-width: 768px)': '1rem',
          '@media (min-width: 1024px)': '1.125rem',
          '@media (min-width: 1280px)': '1.25rem',
        });
      });

      it('should handle clamp() values for fluid typography', () => {
        const result = responsive.fontSize({
          md: 'clamp(1rem, 2.5vw, 1.5rem)',
          lg: 'clamp(1.125rem, 3vw, 2rem)',
        });
        
        expect(result).toEqual({
          '@media (min-width: 768px)': 'clamp(1rem, 2.5vw, 1.5rem)',
          '@media (min-width: 1024px)': 'clamp(1.125rem, 3vw, 2rem)',
        });
      });

      it('should handle empty fontSize object', () => {
        const result = responsive.fontSize({});
        expect(result).toEqual({});
      });
    });
  });

  describe('ResponsiveValue type', () => {
    it('should accept static values', () => {
      const staticString: ResponsiveValue<string> = 'static';
      const staticNumber: ResponsiveValue<number> = 42;
      const staticBoolean: ResponsiveValue<boolean> = true;
      
      expect(resolveResponsiveValue(staticString)).toBe('static');
      expect(resolveResponsiveValue(staticNumber)).toBe(42);
      expect(resolveResponsiveValue(staticBoolean)).toBe(true);
    });

    it('should accept responsive objects', () => {
      const responsiveString: ResponsiveValue<string> = {
        sm: 'small',
        lg: 'large',
      };
      
      const responsiveNumber: ResponsiveValue<number> = {
        md: 16,
        xl: 24,
      };
      
      expect(resolveResponsiveValue(responsiveString, 'sm')).toBe('small');
      expect(resolveResponsiveValue(responsiveNumber, 'md')).toBe(16);
    });

    it('should handle partial responsive objects', () => {
      const partialResponsive: ResponsiveValue<string> = {
        lg: 'large-only',
      };
      
      expect(resolveResponsiveValue(partialResponsive, 'lg')).toBe('large-only');
      expect(resolveResponsiveValue(partialResponsive, 'sm')).toBe('large-only');
    });
  });

  describe('Edge cases and error handling', () => {
    it('should handle undefined responsive values gracefully', () => {
      const responsiveValue: ResponsiveValue<string | undefined> = {
        sm: undefined,
        md: 'valid',
      };
      
      expect(resolveResponsiveValue(responsiveValue, 'md')).toBe('valid');
    });

    it('should work with complex nested objects', () => {
      interface ComplexStyle {
        padding: string;
        margin: string;
        border?: string;
      }
      
      const complexResponsive: ResponsiveValue<ComplexStyle> = {
        sm: {
          padding: '1rem',
          margin: '0.5rem',
        },
        lg: {
          padding: '2rem',
          margin: '1rem',
          border: '1px solid black',
        },
      };
      
      const result = resolveResponsiveValue(complexResponsive, 'lg');
      expect(result).toEqual({
        padding: '2rem',
        margin: '1rem',
        border: '1px solid black',
      });
    });

    it('should maintain consistency across all utility functions', () => {
      const testValues = {
        sm: '1rem',
        md: '2rem',
        lg: '3rem',
      };
      
      // Test that all responsive utilities produce consistent structure
      const styleResult = responsive.style(testValues);
      const spacingResult = responsive.spacing(testValues);
      const fontResult = responsive.fontSize(testValues);
      const directResult = createResponsiveValue(testValues);
      
      const expectedStructure = {
        '@media (min-width: 640px)': '1rem',
        '@media (min-width: 768px)': '2rem',
        '@media (min-width: 1024px)': '3rem',
      };
      
      expect(styleResult).toEqual(expectedStructure);
      expect(spacingResult).toEqual(expectedStructure);
      expect(fontResult).toEqual(expectedStructure);
      expect(directResult).toEqual(expectedStructure);
    });
  });
});
