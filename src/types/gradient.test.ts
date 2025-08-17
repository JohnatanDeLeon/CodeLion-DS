/**
 * Gradient Types Tests
 * Comprehensive test coverage for gradient type definitions and type guards
 */

import { describe, it, expect } from 'vitest';
import {
  isSimpleGradient,
  isAdvancedGradient,
  type GradientDirection,
  type GradientStop,
  type GradientConfig,
  type GradientStateConfig,
  type SimpleGradientProps,
  type AdvancedGradientProps,
  type GradientProps,
  type GradientStyles,
  type GradientHookOptions,
  type OptionalGradientProps,
  type RequiredGradientProps,
  type ResponsiveValue,
} from './gradient';

describe('Gradient Types', () => {
  describe('isSimpleGradient', () => {
    it('should return true for valid simple gradient props', () => {
      const simpleGradient: SimpleGradientProps = {
        startColor: '#ff0000',
        endColor: '#00ff00',
      };
      
      expect(isSimpleGradient(simpleGradient)).toBe(true);
    });

    it('should return true for simple gradient with direction', () => {
      const simpleGradient: SimpleGradientProps = {
        startColor: '#ff0000',
        endColor: '#00ff00',
        direction: 'to-bottom',
      };
      
      expect(isSimpleGradient(simpleGradient)).toBe(true);
    });

    it('should return true for simple gradient with hover colors', () => {
      const simpleGradient: SimpleGradientProps = {
        startColor: '#ff0000',
        endColor: '#00ff00',
        hoverStartColor: '#cc0000',
        hoverEndColor: '#00cc00',
      };
      
      expect(isSimpleGradient(simpleGradient)).toBe(true);
    });

    it('should return true for simple gradient with numeric direction', () => {
      const simpleGradient: SimpleGradientProps = {
        startColor: '#ff0000',
        endColor: '#00ff00',
        direction: 45,
      };
      
      expect(isSimpleGradient(simpleGradient)).toBe(true);
    });

    it('should return false for advanced gradient props', () => {
      const advancedGradient: AdvancedGradientProps = {
        gradient: {
          default: {
            stops: [
              { color: '#ff0000', position: 0 },
              { color: '#00ff00', position: 100 },
            ],
          },
        },
      };
      
      expect(isSimpleGradient(advancedGradient)).toBe(false);
    });

    it('should return false for objects without startColor', () => {
      const invalidGradient = {
        endColor: '#00ff00',
        direction: 'to-bottom',
      };
      
      expect(isSimpleGradient(invalidGradient as any)).toBe(false);
    });

    it('should return false for objects without endColor', () => {
      const invalidGradient = {
        startColor: '#ff0000',
        direction: 'to-bottom',
      };
      
      expect(isSimpleGradient(invalidGradient as any)).toBe(false);
    });

    it('should return false for empty objects', () => {
      expect(isSimpleGradient({} as any)).toBe(false);
    });

    it('should return false for null or undefined', () => {
      expect(isSimpleGradient(null as any)).toBe(false);
      expect(isSimpleGradient(undefined as any)).toBe(false);
    });
  });

  describe('isAdvancedGradient', () => {
    it('should return true for valid advanced gradient props', () => {
      const advancedGradient: AdvancedGradientProps = {
        gradient: {
          default: {
            stops: [
              { color: '#ff0000', position: 0 },
              { color: '#00ff00', position: 100 },
            ],
          },
        },
      };
      
      expect(isAdvancedGradient(advancedGradient)).toBe(true);
    });

    it('should return true for advanced gradient with all states', () => {
      const advancedGradient: AdvancedGradientProps = {
        gradient: {
          default: {
            stops: [
              { color: '#ff0000', position: 0 },
              { color: '#00ff00', position: 100 },
            ],
          },
          hover: {
            stops: [
              { color: '#cc0000', position: 0 },
              { color: '#00cc00', position: 100 },
            ],
          },
          active: {
            stops: [
              { color: '#990000', position: 0 },
              { color: '#009900', position: 100 },
            ],
          },
          focus: {
            stops: [
              { color: '#ff3333', position: 0 },
              { color: '#33ff33', position: 100 },
            ],
          },
          disabled: {
            stops: [
              { color: '#cccccc', position: 0 },
              { color: '#999999', position: 100 },
            ],
          },
        },
      };
      
      expect(isAdvancedGradient(advancedGradient)).toBe(true);
    });

    it('should return true for advanced gradient with direction and fallback', () => {
      const advancedGradient: AdvancedGradientProps = {
        gradient: {
          default: {
            direction: 'to-bottom-right',
            stops: [
              { color: '#ff0000' },
              { color: '#00ff00', position: 50 },
              { color: '#0000ff' },
            ],
            fallback: '#666666',
          },
        },
      };
      
      expect(isAdvancedGradient(advancedGradient)).toBe(true);
    });

    it('should return false for simple gradient props', () => {
      const simpleGradient: SimpleGradientProps = {
        startColor: '#ff0000',
        endColor: '#00ff00',
      };
      
      expect(isAdvancedGradient(simpleGradient)).toBe(false);
    });

    it('should return false for objects without gradient property', () => {
      const invalidGradient = {
        startColor: '#ff0000',
        endColor: '#00ff00',
      };
      
      expect(isAdvancedGradient(invalidGradient as any)).toBe(false);
    });

    it('should return false for empty objects', () => {
      expect(isAdvancedGradient({} as any)).toBe(false);
    });

    it('should return false for null or undefined', () => {
      expect(isAdvancedGradient(null as any)).toBe(false);
      expect(isAdvancedGradient(undefined as any)).toBe(false);
    });
  });

  describe('Type compatibility', () => {
    it('should accept both simple and advanced gradients as GradientProps', () => {
      const simpleGradient: GradientProps = {
        startColor: '#ff0000',
        endColor: '#00ff00',
      };

      const advancedGradient: GradientProps = {
        gradient: {
          default: {
            stops: [
              { color: '#ff0000', position: 0 },
              { color: '#00ff00', position: 100 },
            ],
          },
        },
      };

      // Test that both types are compatible
      expect(typeof simpleGradient).toBe('object');
      expect(typeof advancedGradient).toBe('object');
    });

    it('should handle OptionalGradientProps correctly', () => {
      interface TestProps {
        title: string;
        disabled?: boolean;
      }

      const propsWithOptionalGradient: OptionalGradientProps<TestProps> = {
        title: 'Test Component',
        disabled: false,
        gradient: {
          startColor: '#ff0000',
          endColor: '#00ff00',
        },
      };

      const propsWithoutGradient: OptionalGradientProps<TestProps> = {
        title: 'Test Component',
        disabled: true,
      };

      expect(propsWithOptionalGradient.title).toBe('Test Component');
      expect(propsWithOptionalGradient.gradient).toBeDefined();
      expect(propsWithoutGradient.title).toBe('Test Component');
      expect(propsWithoutGradient.gradient).toBeUndefined();
    });

    it('should handle RequiredGradientProps correctly', () => {
      interface TestProps {
        title: string;
        disabled?: boolean;
      }

      const propsWithRequiredGradient: RequiredGradientProps<TestProps> = {
        title: 'Test Component',
        disabled: false,
        gradient: {
          startColor: '#ff0000',
          endColor: '#00ff00',
        },
      };

      expect(propsWithRequiredGradient.title).toBe('Test Component');
      expect(propsWithRequiredGradient.gradient).toBeDefined();
    });
  });

  describe('GradientDirection type', () => {
    it('should accept string direction values', () => {
      const directions: GradientDirection[] = [
        'to-top',
        'to-bottom',
        'to-left',
        'to-right',
        'to-top-left',
        'to-top-right',
        'to-bottom-left',
        'to-bottom-right',
      ];

      directions.forEach(direction => {
        expect(typeof direction).toBe('string');
      });
    });

    it('should accept numeric direction values', () => {
      const numericDirections: GradientDirection[] = [
        0,
        45,
        90,
        135,
        180,
        225,
        270,
        315,
        360,
      ];

      numericDirections.forEach(direction => {
        expect(typeof direction).toBe('number');
      });
    });
  });

  describe('GradientStop type', () => {
    it('should work with color only', () => {
      const stop: GradientStop = {
        color: '#ff0000',
      };

      expect(stop.color).toBe('#ff0000');
      expect(stop.position).toBeUndefined();
    });

    it('should work with color and position', () => {
      const stop: GradientStop = {
        color: 'rgb(255, 0, 0)',
        position: 50,
      };

      expect(stop.color).toBe('rgb(255, 0, 0)');
      expect(stop.position).toBe(50);
    });

    it('should work with various color formats', () => {
      const stops: GradientStop[] = [
        { color: '#ff0000' },
        { color: 'rgb(255, 0, 0)' },
        { color: 'rgba(255, 0, 0, 0.5)' },
        { color: 'hsl(0, 100%, 50%)' },
        { color: 'hsla(0, 100%, 50%, 0.8)' },
        { color: 'red' },
        { color: 'var(--primary-color)' },
      ];

      stops.forEach(stop => {
        expect(typeof stop.color).toBe('string');
      });
    });
  });

  describe('GradientConfig type', () => {
    it('should work with minimal configuration', () => {
      const config: GradientConfig = {
        stops: [
          { color: '#ff0000' },
          { color: '#00ff00' },
        ],
      };

      expect(config.stops).toHaveLength(2);
      expect(config.direction).toBeUndefined();
      expect(config.fallback).toBeUndefined();
    });

    it('should work with full configuration', () => {
      const config: GradientConfig = {
        direction: 'to-bottom-right',
        stops: [
          { color: '#ff0000', position: 0 },
          { color: '#ffff00', position: 25 },
          { color: '#00ff00', position: 50 },
          { color: '#00ffff', position: 75 },
          { color: '#0000ff', position: 100 },
        ],
        fallback: '#666666',
      };

      expect(config.direction).toBe('to-bottom-right');
      expect(config.stops).toHaveLength(5);
      expect(config.fallback).toBe('#666666');
    });

    it('should work with numeric direction', () => {
      const config: GradientConfig = {
        direction: 135,
        stops: [
          { color: '#ff0000' },
          { color: '#00ff00' },
        ],
      };

      expect(config.direction).toBe(135);
      expect(typeof config.direction).toBe('number');
    });
  });

  describe('GradientStyles type', () => {
    it('should contain required background property', () => {
      const styles: GradientStyles = {
        background: 'linear-gradient(135deg, #ff0000 0%, #00ff00 100%)',
        customProperties: {},
      };

      expect(styles.background).toBeDefined();
      expect(styles.customProperties).toBeDefined();
    });

    it('should work with custom properties and className', () => {
      const styles: GradientStyles = {
        background: 'linear-gradient(to-right, var(--gradient-start), var(--gradient-end))',
        customProperties: {
          '--gradient-start': '#ff0000',
          '--gradient-end': '#00ff00',
          '--gradient-hover-start': '#cc0000',
          '--gradient-hover-end': '#00cc00',
        },
        className: 'gradient-button',
      };

      expect(Object.keys(styles.customProperties)).toHaveLength(4);
      expect(styles.className).toBe('gradient-button');
    });
  });

  describe('GradientHookOptions type', () => {
    it('should work with default values', () => {
      const options: GradientHookOptions = {};

      expect(options.hoverDarkenAmount).toBeUndefined();
      expect(options.activeDarkenAmount).toBeUndefined();
      expect(options.generateCustomProperties).toBeUndefined();
      expect(options.cssPropertyPrefix).toBeUndefined();
    });

    it('should work with custom values', () => {
      const options: GradientHookOptions = {
        hoverDarkenAmount: 0.2,
        activeDarkenAmount: 0.3,
        generateCustomProperties: false,
        cssPropertyPrefix: 'custom-gradient',
      };

      expect(options.hoverDarkenAmount).toBe(0.2);
      expect(options.activeDarkenAmount).toBe(0.3);
      expect(options.generateCustomProperties).toBe(false);
      expect(options.cssPropertyPrefix).toBe('custom-gradient');
    });

    it('should work with partial configuration', () => {
      const options: GradientHookOptions = {
        hoverDarkenAmount: 0.1,
        generateCustomProperties: true,
      };

      expect(options.hoverDarkenAmount).toBe(0.1);
      expect(options.generateCustomProperties).toBe(true);
      expect(options.activeDarkenAmount).toBeUndefined();
      expect(options.cssPropertyPrefix).toBeUndefined();
    });
  });

  describe('Type guard behavior in realistic scenarios', () => {
    it('should correctly identify simple gradient in component props', () => {
      function processGradient(gradient: GradientProps) {
        if (isSimpleGradient(gradient)) {
          return `Simple: ${gradient.startColor} to ${gradient.endColor}`;
        } else if (isAdvancedGradient(gradient)) {
          return `Advanced: ${gradient.gradient.default.stops.length} stops`;
        }
        return 'Unknown';
      }

      const simple: GradientProps = {
        startColor: '#ff0000',
        endColor: '#00ff00',
      };

      const advanced: GradientProps = {
        gradient: {
          default: {
            stops: [
              { color: '#ff0000' },
              { color: '#ffff00' },
              { color: '#00ff00' },
            ],
          },
        },
      };

      expect(processGradient(simple)).toBe('Simple: #ff0000 to #00ff00');
      expect(processGradient(advanced)).toBe('Advanced: 3 stops');
    });

    it('should work with union types correctly', () => {
      function getGradientType(gradient: SimpleGradientProps | AdvancedGradientProps): string {
        if ('startColor' in gradient && 'endColor' in gradient) {
          return 'simple';
        } else if ('gradient' in gradient) {
          return 'advanced';
        }
        return 'unknown';
      }

      const simple: SimpleGradientProps = {
        startColor: '#ff0000',
        endColor: '#00ff00',
      };

      const advanced: AdvancedGradientProps = {
        gradient: {
          default: {
            stops: [{ color: '#ff0000' }, { color: '#00ff00' }],
          },
        },
      };

      expect(getGradientType(simple)).toBe('simple');
      expect(getGradientType(advanced)).toBe('advanced');
    });
  });
});
