import React$1 from 'react';
import * as _vanilla_extract_recipes from '@vanilla-extract/recipes';
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
 * Design System Colors
 * Comprehensive color palette with semantic variations
 */
declare const colors: {
    primary: {
        50: `var(--${string})`;
        100: `var(--${string})`;
        200: `var(--${string})`;
        300: `var(--${string})`;
        400: `var(--${string})`;
        500: `var(--${string})`;
        600: `var(--${string})`;
        700: `var(--${string})`;
        800: `var(--${string})`;
        900: `var(--${string})`;
        950: `var(--${string})`;
    };
    neutral: {
        0: `var(--${string})`;
        25: `var(--${string})`;
        50: `var(--${string})`;
        100: `var(--${string})`;
        200: `var(--${string})`;
        300: `var(--${string})`;
        400: `var(--${string})`;
        500: `var(--${string})`;
        600: `var(--${string})`;
        700: `var(--${string})`;
        800: `var(--${string})`;
        900: `var(--${string})`;
        950: `var(--${string})`;
    };
    success: {
        50: `var(--${string})`;
        100: `var(--${string})`;
        200: `var(--${string})`;
        300: `var(--${string})`;
        400: `var(--${string})`;
        500: `var(--${string})`;
        600: `var(--${string})`;
        700: `var(--${string})`;
        800: `var(--${string})`;
        900: `var(--${string})`;
        950: `var(--${string})`;
    };
    error: {
        50: `var(--${string})`;
        100: `var(--${string})`;
        200: `var(--${string})`;
        300: `var(--${string})`;
        400: `var(--${string})`;
        500: `var(--${string})`;
        600: `var(--${string})`;
        700: `var(--${string})`;
        800: `var(--${string})`;
        900: `var(--${string})`;
        950: `var(--${string})`;
    };
    warning: {
        50: `var(--${string})`;
        100: `var(--${string})`;
        200: `var(--${string})`;
        300: `var(--${string})`;
        400: `var(--${string})`;
        500: `var(--${string})`;
        600: `var(--${string})`;
        700: `var(--${string})`;
        800: `var(--${string})`;
        900: `var(--${string})`;
        950: `var(--${string})`;
    };
    info: {
        50: `var(--${string})`;
        100: `var(--${string})`;
        200: `var(--${string})`;
        300: `var(--${string})`;
        400: `var(--${string})`;
        500: `var(--${string})`;
        600: `var(--${string})`;
        700: `var(--${string})`;
        800: `var(--${string})`;
        900: `var(--${string})`;
        950: `var(--${string})`;
    };
    white: `var(--${string})`;
    black: `var(--${string})`;
    transparent: `var(--${string})`;
};
/**
 * Color gradients for enhanced visual appeal
 */
declare const gradients: {
    readonly primary: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)";
    readonly success: "linear-gradient(135deg, #10b981 0%, #059669 100%)";
    readonly error: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)";
    readonly warning: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)";
    readonly info: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)";
    readonly neutral: "linear-gradient(135deg, #64748b 0%, #475569 100%)";
};
/**
 * TypeScript types for color tokens
 */
type ColorToken = keyof typeof colors;
type ColorScale = keyof typeof colors.primary;
type PrimaryColor = keyof typeof colors.primary;
type NeutralColor = keyof typeof colors.neutral;
type SemanticColor = 'success' | 'error' | 'warning' | 'info';
type GradientType = keyof typeof gradients;

/**
 * Design System Spacing Scale
 * Consistent spacing values following 8px grid system
 */
declare const spacing: {
    0: `var(--${string})`;
    0.5: `var(--${string})`;
    1: `var(--${string})`;
    1.5: `var(--${string})`;
    2: `var(--${string})`;
    2.5: `var(--${string})`;
    3: `var(--${string})`;
    3.5: `var(--${string})`;
    4: `var(--${string})`;
    5: `var(--${string})`;
    6: `var(--${string})`;
    7: `var(--${string})`;
    8: `var(--${string})`;
    9: `var(--${string})`;
    10: `var(--${string})`;
    11: `var(--${string})`;
    12: `var(--${string})`;
    14: `var(--${string})`;
    16: `var(--${string})`;
    18: `var(--${string})`;
    20: `var(--${string})`;
    24: `var(--${string})`;
    28: `var(--${string})`;
    32: `var(--${string})`;
    36: `var(--${string})`;
    40: `var(--${string})`;
    44: `var(--${string})`;
    48: `var(--${string})`;
    52: `var(--${string})`;
    56: `var(--${string})`;
    60: `var(--${string})`;
    64: `var(--${string})`;
    72: `var(--${string})`;
    80: `var(--${string})`;
    96: `var(--${string})`;
};
/**
 * Semantic spacing aliases for common use cases
 */
declare const semanticSpacing: {
    readonly xs: `var(--${string})`;
    readonly sm: `var(--${string})`;
    readonly md: `var(--${string})`;
    readonly lg: `var(--${string})`;
    readonly xl: `var(--${string})`;
    readonly '2xl': `var(--${string})`;
    readonly '3xl': `var(--${string})`;
    readonly sectionGap: `var(--${string})`;
    readonly containerPadding: `var(--${string})`;
    readonly cardPadding: `var(--${string})`;
    readonly buttonPadding: `var(--${string})`;
    readonly inputPadding: `var(--${string})`;
    readonly iconSpacing: `var(--${string})`;
};
/**
 * TypeScript types for spacing tokens
 */
type SpacingToken = keyof typeof spacing;
type SemanticSpacingToken = keyof typeof semanticSpacing;

/**
 * Design System Typography Scale
 * Optimized for readability and visual hierarchy
 */
declare const typography: {
    fontFamily: {
        sans: `var(--${string})`;
        mono: `var(--${string})`;
        display: `var(--${string})`;
    };
    fontSize: {
        xs: `var(--${string})`;
        sm: `var(--${string})`;
        base: `var(--${string})`;
        lg: `var(--${string})`;
        xl: `var(--${string})`;
        '2xl': `var(--${string})`;
        '3xl': `var(--${string})`;
        '4xl': `var(--${string})`;
        '5xl': `var(--${string})`;
        '6xl': `var(--${string})`;
        '7xl': `var(--${string})`;
        '8xl': `var(--${string})`;
        '9xl': `var(--${string})`;
    };
    fontWeight: {
        thin: `var(--${string})`;
        extralight: `var(--${string})`;
        light: `var(--${string})`;
        normal: `var(--${string})`;
        medium: `var(--${string})`;
        semibold: `var(--${string})`;
        bold: `var(--${string})`;
        extrabold: `var(--${string})`;
        black: `var(--${string})`;
    };
    lineHeight: {
        none: `var(--${string})`;
        tight: `var(--${string})`;
        snug: `var(--${string})`;
        normal: `var(--${string})`;
        relaxed: `var(--${string})`;
        loose: `var(--${string})`;
    };
    letterSpacing: {
        tighter: `var(--${string})`;
        tight: `var(--${string})`;
        normal: `var(--${string})`;
        wide: `var(--${string})`;
        wider: `var(--${string})`;
        widest: `var(--${string})`;
    };
};
/**
 * Pre-composed text styles for common use cases
 */
declare const textStyles: {
    readonly displayLarge: {
        readonly fontSize: `var(--${string})`;
        readonly fontWeight: `var(--${string})`;
        readonly lineHeight: `var(--${string})`;
        readonly letterSpacing: `var(--${string})`;
    };
    readonly displayMedium: {
        readonly fontSize: `var(--${string})`;
        readonly fontWeight: `var(--${string})`;
        readonly lineHeight: `var(--${string})`;
        readonly letterSpacing: `var(--${string})`;
    };
    readonly displaySmall: {
        readonly fontSize: `var(--${string})`;
        readonly fontWeight: `var(--${string})`;
        readonly lineHeight: `var(--${string})`;
        readonly letterSpacing: `var(--${string})`;
    };
    readonly headingLarge: {
        readonly fontSize: `var(--${string})`;
        readonly fontWeight: `var(--${string})`;
        readonly lineHeight: `var(--${string})`;
        readonly letterSpacing: `var(--${string})`;
    };
    readonly headingMedium: {
        readonly fontSize: `var(--${string})`;
        readonly fontWeight: `var(--${string})`;
        readonly lineHeight: `var(--${string})`;
        readonly letterSpacing: `var(--${string})`;
    };
    readonly headingSmall: {
        readonly fontSize: `var(--${string})`;
        readonly fontWeight: `var(--${string})`;
        readonly lineHeight: `var(--${string})`;
        readonly letterSpacing: `var(--${string})`;
    };
    readonly bodyLarge: {
        readonly fontSize: `var(--${string})`;
        readonly fontWeight: `var(--${string})`;
        readonly lineHeight: `var(--${string})`;
        readonly letterSpacing: `var(--${string})`;
    };
    readonly bodyMedium: {
        readonly fontSize: `var(--${string})`;
        readonly fontWeight: `var(--${string})`;
        readonly lineHeight: `var(--${string})`;
        readonly letterSpacing: `var(--${string})`;
    };
    readonly bodySmall: {
        readonly fontSize: `var(--${string})`;
        readonly fontWeight: `var(--${string})`;
        readonly lineHeight: `var(--${string})`;
        readonly letterSpacing: `var(--${string})`;
    };
    readonly buttonLarge: {
        readonly fontSize: `var(--${string})`;
        readonly fontWeight: `var(--${string})`;
        readonly lineHeight: `var(--${string})`;
        readonly letterSpacing: `var(--${string})`;
    };
    readonly buttonMedium: {
        readonly fontSize: `var(--${string})`;
        readonly fontWeight: `var(--${string})`;
        readonly lineHeight: `var(--${string})`;
        readonly letterSpacing: `var(--${string})`;
    };
    readonly buttonSmall: {
        readonly fontSize: `var(--${string})`;
        readonly fontWeight: `var(--${string})`;
        readonly lineHeight: `var(--${string})`;
        readonly letterSpacing: `var(--${string})`;
    };
    readonly labelLarge: {
        readonly fontSize: `var(--${string})`;
        readonly fontWeight: `var(--${string})`;
        readonly lineHeight: `var(--${string})`;
        readonly letterSpacing: `var(--${string})`;
    };
    readonly labelMedium: {
        readonly fontSize: `var(--${string})`;
        readonly fontWeight: `var(--${string})`;
        readonly lineHeight: `var(--${string})`;
        readonly letterSpacing: `var(--${string})`;
    };
    readonly labelSmall: {
        readonly fontSize: `var(--${string})`;
        readonly fontWeight: `var(--${string})`;
        readonly lineHeight: `var(--${string})`;
        readonly letterSpacing: `var(--${string})`;
    };
};
/**
 * TypeScript types for typography tokens
 */
type FontFamily = keyof typeof typography.fontFamily;
type FontSize = keyof typeof typography.fontSize;
type FontWeight = keyof typeof typography.fontWeight;
type LineHeight = keyof typeof typography.lineHeight;
type LetterSpacing = keyof typeof typography.letterSpacing;
type TextStyle = keyof typeof textStyles;

/**
 * Design System Effects
 * Shadows, borders, animations, and visual effects
 */
declare const effects: {
    shadow: {
        none: `var(--${string})`;
        xs: `var(--${string})`;
        sm: `var(--${string})`;
        base: `var(--${string})`;
        md: `var(--${string})`;
        lg: `var(--${string})`;
        xl: `var(--${string})`;
        '2xl': `var(--${string})`;
        inner: `var(--${string})`;
    };
    borderRadius: {
        none: `var(--${string})`;
        xs: `var(--${string})`;
        sm: `var(--${string})`;
        base: `var(--${string})`;
        md: `var(--${string})`;
        lg: `var(--${string})`;
        xl: `var(--${string})`;
        '2xl': `var(--${string})`;
        '3xl': `var(--${string})`;
        full: `var(--${string})`;
    };
    borderWidth: {
        0: `var(--${string})`;
        1: `var(--${string})`;
        2: `var(--${string})`;
        4: `var(--${string})`;
        8: `var(--${string})`;
    };
    ring: {
        none: `var(--${string})`;
        sm: `var(--${string})`;
        base: `var(--${string})`;
        md: `var(--${string})`;
        lg: `var(--${string})`;
    };
    blur: {
        none: `var(--${string})`;
        xs: `var(--${string})`;
        sm: `var(--${string})`;
        base: `var(--${string})`;
        md: `var(--${string})`;
        lg: `var(--${string})`;
        xl: `var(--${string})`;
        '2xl': `var(--${string})`;
        '3xl': `var(--${string})`;
    };
};
/**
 * Semantic shadow presets for components
 */
declare const componentShadows: {
    readonly card: `var(--${string})`;
    readonly cardHover: `var(--${string})`;
    readonly button: `var(--${string})`;
    readonly buttonHover: `var(--${string})`;
    readonly dropdown: `var(--${string})`;
    readonly modal: `var(--${string})`;
    readonly tooltip: `var(--${string})`;
    readonly popover: `var(--${string})`;
};
/**
 * Animation timing and easing functions
 */
declare const animation: {
    readonly duration: {
        readonly fast: "150ms";
        readonly normal: "250ms";
        readonly slow: "350ms";
        readonly slower: "500ms";
        readonly slowest: "750ms";
    };
    readonly easing: {
        readonly linear: "linear";
        readonly ease: "ease";
        readonly easeIn: "cubic-bezier(0.4, 0, 1, 1)";
        readonly easeOut: "cubic-bezier(0, 0, 0.2, 1)";
        readonly easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)";
        readonly spring: "cubic-bezier(0.175, 0.885, 0.32, 1.275)";
        readonly bouncy: "cubic-bezier(0.68, -0.55, 0.265, 1.55)";
    };
};
/**
 * Glow effects for focus states and highlights
 */
declare const glowEffects: {
    readonly primary: "0 0 0 3px rgb(14 165 233 / 0.15), 0 0 20px rgb(14 165 233 / 0.1)";
    readonly success: "0 0 0 3px rgb(16 185 129 / 0.15), 0 0 20px rgb(16 185 129 / 0.1)";
    readonly error: "0 0 0 3px rgb(239 68 68 / 0.15), 0 0 20px rgb(239 68 68 / 0.1)";
    readonly warning: "0 0 0 3px rgb(245 158 11 / 0.15), 0 0 20px rgb(245 158 11 / 0.1)";
    readonly info: "0 0 0 3px rgb(59 130 246 / 0.15), 0 0 20px rgb(59 130 246 / 0.1)";
};
/**
 * TypeScript types for effect tokens
 */
type ShadowToken = keyof typeof effects.shadow;
type BorderRadiusToken = keyof typeof effects.borderRadius;
type BorderWidthToken = keyof typeof effects.borderWidth;
type BlurToken = keyof typeof effects.blur;
type ComponentShadow = keyof typeof componentShadows;
type AnimationDuration = keyof typeof animation.duration;
type AnimationEasing = keyof typeof animation.easing;
type GlowEffect = keyof typeof glowEffects;

/**
 * Design System Tokens
 * Centralized design tokens with TypeScript support
 */

/**
 * Combined tokens object for easier access
 */
declare const tokens: {
    readonly colors: {
        primary: {
            50: `var(--${string})`;
            100: `var(--${string})`;
            200: `var(--${string})`;
            300: `var(--${string})`;
            400: `var(--${string})`;
            500: `var(--${string})`;
            600: `var(--${string})`;
            700: `var(--${string})`;
            800: `var(--${string})`;
            900: `var(--${string})`;
            950: `var(--${string})`;
        };
        neutral: {
            0: `var(--${string})`;
            25: `var(--${string})`;
            50: `var(--${string})`;
            100: `var(--${string})`;
            200: `var(--${string})`;
            300: `var(--${string})`;
            400: `var(--${string})`;
            500: `var(--${string})`;
            600: `var(--${string})`;
            700: `var(--${string})`;
            800: `var(--${string})`;
            900: `var(--${string})`;
            950: `var(--${string})`;
        };
        success: {
            50: `var(--${string})`;
            100: `var(--${string})`;
            200: `var(--${string})`;
            300: `var(--${string})`;
            400: `var(--${string})`;
            500: `var(--${string})`;
            600: `var(--${string})`;
            700: `var(--${string})`;
            800: `var(--${string})`;
            900: `var(--${string})`;
            950: `var(--${string})`;
        };
        error: {
            50: `var(--${string})`;
            100: `var(--${string})`;
            200: `var(--${string})`;
            300: `var(--${string})`;
            400: `var(--${string})`;
            500: `var(--${string})`;
            600: `var(--${string})`;
            700: `var(--${string})`;
            800: `var(--${string})`;
            900: `var(--${string})`;
            950: `var(--${string})`;
        };
        warning: {
            50: `var(--${string})`;
            100: `var(--${string})`;
            200: `var(--${string})`;
            300: `var(--${string})`;
            400: `var(--${string})`;
            500: `var(--${string})`;
            600: `var(--${string})`;
            700: `var(--${string})`;
            800: `var(--${string})`;
            900: `var(--${string})`;
            950: `var(--${string})`;
        };
        info: {
            50: `var(--${string})`;
            100: `var(--${string})`;
            200: `var(--${string})`;
            300: `var(--${string})`;
            400: `var(--${string})`;
            500: `var(--${string})`;
            600: `var(--${string})`;
            700: `var(--${string})`;
            800: `var(--${string})`;
            900: `var(--${string})`;
            950: `var(--${string})`;
        };
        white: `var(--${string})`;
        black: `var(--${string})`;
        transparent: `var(--${string})`;
    };
    readonly gradients: {
        readonly primary: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)";
        readonly success: "linear-gradient(135deg, #10b981 0%, #059669 100%)";
        readonly error: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)";
        readonly warning: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)";
        readonly info: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)";
        readonly neutral: "linear-gradient(135deg, #64748b 0%, #475569 100%)";
    };
    readonly spacing: {
        0: `var(--${string})`;
        0.5: `var(--${string})`;
        1: `var(--${string})`;
        1.5: `var(--${string})`;
        2: `var(--${string})`;
        2.5: `var(--${string})`;
        3: `var(--${string})`;
        3.5: `var(--${string})`;
        4: `var(--${string})`;
        5: `var(--${string})`;
        6: `var(--${string})`;
        7: `var(--${string})`;
        8: `var(--${string})`;
        9: `var(--${string})`;
        10: `var(--${string})`;
        11: `var(--${string})`;
        12: `var(--${string})`;
        14: `var(--${string})`;
        16: `var(--${string})`;
        18: `var(--${string})`;
        20: `var(--${string})`;
        24: `var(--${string})`;
        28: `var(--${string})`;
        32: `var(--${string})`;
        36: `var(--${string})`;
        40: `var(--${string})`;
        44: `var(--${string})`;
        48: `var(--${string})`;
        52: `var(--${string})`;
        56: `var(--${string})`;
        60: `var(--${string})`;
        64: `var(--${string})`;
        72: `var(--${string})`;
        80: `var(--${string})`;
        96: `var(--${string})`;
    };
    readonly semanticSpacing: {
        readonly xs: `var(--${string})`;
        readonly sm: `var(--${string})`;
        readonly md: `var(--${string})`;
        readonly lg: `var(--${string})`;
        readonly xl: `var(--${string})`;
        readonly '2xl': `var(--${string})`;
        readonly '3xl': `var(--${string})`;
        readonly sectionGap: `var(--${string})`;
        readonly containerPadding: `var(--${string})`;
        readonly cardPadding: `var(--${string})`;
        readonly buttonPadding: `var(--${string})`;
        readonly inputPadding: `var(--${string})`;
        readonly iconSpacing: `var(--${string})`;
    };
    readonly typography: {
        fontFamily: {
            sans: `var(--${string})`;
            mono: `var(--${string})`;
            display: `var(--${string})`;
        };
        fontSize: {
            xs: `var(--${string})`;
            sm: `var(--${string})`;
            base: `var(--${string})`;
            lg: `var(--${string})`;
            xl: `var(--${string})`;
            '2xl': `var(--${string})`;
            '3xl': `var(--${string})`;
            '4xl': `var(--${string})`;
            '5xl': `var(--${string})`;
            '6xl': `var(--${string})`;
            '7xl': `var(--${string})`;
            '8xl': `var(--${string})`;
            '9xl': `var(--${string})`;
        };
        fontWeight: {
            thin: `var(--${string})`;
            extralight: `var(--${string})`;
            light: `var(--${string})`;
            normal: `var(--${string})`;
            medium: `var(--${string})`;
            semibold: `var(--${string})`;
            bold: `var(--${string})`;
            extrabold: `var(--${string})`;
            black: `var(--${string})`;
        };
        lineHeight: {
            none: `var(--${string})`;
            tight: `var(--${string})`;
            snug: `var(--${string})`;
            normal: `var(--${string})`;
            relaxed: `var(--${string})`;
            loose: `var(--${string})`;
        };
        letterSpacing: {
            tighter: `var(--${string})`;
            tight: `var(--${string})`;
            normal: `var(--${string})`;
            wide: `var(--${string})`;
            wider: `var(--${string})`;
            widest: `var(--${string})`;
        };
    };
    readonly textStyles: {
        readonly displayLarge: {
            readonly fontSize: `var(--${string})`;
            readonly fontWeight: `var(--${string})`;
            readonly lineHeight: `var(--${string})`;
            readonly letterSpacing: `var(--${string})`;
        };
        readonly displayMedium: {
            readonly fontSize: `var(--${string})`;
            readonly fontWeight: `var(--${string})`;
            readonly lineHeight: `var(--${string})`;
            readonly letterSpacing: `var(--${string})`;
        };
        readonly displaySmall: {
            readonly fontSize: `var(--${string})`;
            readonly fontWeight: `var(--${string})`;
            readonly lineHeight: `var(--${string})`;
            readonly letterSpacing: `var(--${string})`;
        };
        readonly headingLarge: {
            readonly fontSize: `var(--${string})`;
            readonly fontWeight: `var(--${string})`;
            readonly lineHeight: `var(--${string})`;
            readonly letterSpacing: `var(--${string})`;
        };
        readonly headingMedium: {
            readonly fontSize: `var(--${string})`;
            readonly fontWeight: `var(--${string})`;
            readonly lineHeight: `var(--${string})`;
            readonly letterSpacing: `var(--${string})`;
        };
        readonly headingSmall: {
            readonly fontSize: `var(--${string})`;
            readonly fontWeight: `var(--${string})`;
            readonly lineHeight: `var(--${string})`;
            readonly letterSpacing: `var(--${string})`;
        };
        readonly bodyLarge: {
            readonly fontSize: `var(--${string})`;
            readonly fontWeight: `var(--${string})`;
            readonly lineHeight: `var(--${string})`;
            readonly letterSpacing: `var(--${string})`;
        };
        readonly bodyMedium: {
            readonly fontSize: `var(--${string})`;
            readonly fontWeight: `var(--${string})`;
            readonly lineHeight: `var(--${string})`;
            readonly letterSpacing: `var(--${string})`;
        };
        readonly bodySmall: {
            readonly fontSize: `var(--${string})`;
            readonly fontWeight: `var(--${string})`;
            readonly lineHeight: `var(--${string})`;
            readonly letterSpacing: `var(--${string})`;
        };
        readonly buttonLarge: {
            readonly fontSize: `var(--${string})`;
            readonly fontWeight: `var(--${string})`;
            readonly lineHeight: `var(--${string})`;
            readonly letterSpacing: `var(--${string})`;
        };
        readonly buttonMedium: {
            readonly fontSize: `var(--${string})`;
            readonly fontWeight: `var(--${string})`;
            readonly lineHeight: `var(--${string})`;
            readonly letterSpacing: `var(--${string})`;
        };
        readonly buttonSmall: {
            readonly fontSize: `var(--${string})`;
            readonly fontWeight: `var(--${string})`;
            readonly lineHeight: `var(--${string})`;
            readonly letterSpacing: `var(--${string})`;
        };
        readonly labelLarge: {
            readonly fontSize: `var(--${string})`;
            readonly fontWeight: `var(--${string})`;
            readonly lineHeight: `var(--${string})`;
            readonly letterSpacing: `var(--${string})`;
        };
        readonly labelMedium: {
            readonly fontSize: `var(--${string})`;
            readonly fontWeight: `var(--${string})`;
            readonly lineHeight: `var(--${string})`;
            readonly letterSpacing: `var(--${string})`;
        };
        readonly labelSmall: {
            readonly fontSize: `var(--${string})`;
            readonly fontWeight: `var(--${string})`;
            readonly lineHeight: `var(--${string})`;
            readonly letterSpacing: `var(--${string})`;
        };
    };
    readonly effects: {
        shadow: {
            none: `var(--${string})`;
            xs: `var(--${string})`;
            sm: `var(--${string})`;
            base: `var(--${string})`;
            md: `var(--${string})`;
            lg: `var(--${string})`;
            xl: `var(--${string})`;
            '2xl': `var(--${string})`;
            inner: `var(--${string})`;
        };
        borderRadius: {
            none: `var(--${string})`;
            xs: `var(--${string})`;
            sm: `var(--${string})`;
            base: `var(--${string})`;
            md: `var(--${string})`;
            lg: `var(--${string})`;
            xl: `var(--${string})`;
            '2xl': `var(--${string})`;
            '3xl': `var(--${string})`;
            full: `var(--${string})`;
        };
        borderWidth: {
            0: `var(--${string})`;
            1: `var(--${string})`;
            2: `var(--${string})`;
            4: `var(--${string})`;
            8: `var(--${string})`;
        };
        ring: {
            none: `var(--${string})`;
            sm: `var(--${string})`;
            base: `var(--${string})`;
            md: `var(--${string})`;
            lg: `var(--${string})`;
        };
        blur: {
            none: `var(--${string})`;
            xs: `var(--${string})`;
            sm: `var(--${string})`;
            base: `var(--${string})`;
            md: `var(--${string})`;
            lg: `var(--${string})`;
            xl: `var(--${string})`;
            '2xl': `var(--${string})`;
            '3xl': `var(--${string})`;
        };
    };
    readonly componentShadows: {
        readonly card: `var(--${string})`;
        readonly cardHover: `var(--${string})`;
        readonly button: `var(--${string})`;
        readonly buttonHover: `var(--${string})`;
        readonly dropdown: `var(--${string})`;
        readonly modal: `var(--${string})`;
        readonly tooltip: `var(--${string})`;
        readonly popover: `var(--${string})`;
    };
    readonly animation: {
        readonly duration: {
            readonly fast: "150ms";
            readonly normal: "250ms";
            readonly slow: "350ms";
            readonly slower: "500ms";
            readonly slowest: "750ms";
        };
        readonly easing: {
            readonly linear: "linear";
            readonly ease: "ease";
            readonly easeIn: "cubic-bezier(0.4, 0, 1, 1)";
            readonly easeOut: "cubic-bezier(0, 0, 0.2, 1)";
            readonly easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)";
            readonly spring: "cubic-bezier(0.175, 0.885, 0.32, 1.275)";
            readonly bouncy: "cubic-bezier(0.68, -0.55, 0.265, 1.55)";
        };
    };
    readonly glowEffects: {
        readonly primary: "0 0 0 3px rgb(14 165 233 / 0.15), 0 0 20px rgb(14 165 233 / 0.1)";
        readonly success: "0 0 0 3px rgb(16 185 129 / 0.15), 0 0 20px rgb(16 185 129 / 0.1)";
        readonly error: "0 0 0 3px rgb(239 68 68 / 0.15), 0 0 20px rgb(239 68 68 / 0.1)";
        readonly warning: "0 0 0 3px rgb(245 158 11 / 0.15), 0 0 20px rgb(245 158 11 / 0.1)";
        readonly info: "0 0 0 3px rgb(59 130 246 / 0.15), 0 0 20px rgb(59 130 246 / 0.1)";
    };
};
/**
 * Design system configuration
 */
declare const designSystemConfig: {
    readonly name: "@company/design-system";
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
 * Additional derived types
 */
type ThemeName = keyof typeof designSystemConfig.themes;
type Breakpoint = keyof typeof designSystemConfig.breakpoints;
type ZIndexLevel = keyof typeof designSystemConfig.zIndex;

/**
 * Button Recipe
 * Comprehensive button styles with variants and states
 */
declare const button: _vanilla_extract_recipes.RuntimeFn<{
    variant: {
        primary: ({
            backgroundColor: `var(--${string})`;
            color: `var(--${string})`;
            boxShadow: `var(--${string})`;
            selectors?: undefined;
        } | {
            selectors: {
                '&:hover:not(:disabled)': {
                    backgroundColor: `var(--${string})`;
                    boxShadow: `var(--${string})`;
                };
                '&:active:not(:disabled)': {
                    backgroundColor: `var(--${string})`;
                };
                '&:focus-visible': {
                    boxShadow: `0 0 0 2px var(--${string})40`;
                };
            };
            backgroundColor?: undefined;
            color?: undefined;
            boxShadow?: undefined;
        })[];
        secondary: ({
            backgroundColor: `var(--${string})`;
            color: `var(--${string})`;
            border: `1px solid var(--${string})`;
            boxShadow: `var(--${string})`;
            selectors?: undefined;
        } | {
            selectors: {
                '&:hover:not(:disabled)': {
                    backgroundColor: `var(--${string})`;
                    borderColor: `var(--${string})`;
                    boxShadow: `var(--${string})`;
                };
                '&:active:not(:disabled)': {
                    backgroundColor: `var(--${string})`;
                };
                '&:focus-visible': {
                    boxShadow: `0 0 0 2px var(--${string})40`;
                    borderColor: `var(--${string})`;
                };
            };
            backgroundColor?: undefined;
            color?: undefined;
            border?: undefined;
            boxShadow?: undefined;
        })[];
        ghost: ({
            backgroundColor: "transparent";
            color: `var(--${string})`;
            selectors?: undefined;
        } | {
            selectors: {
                '&:hover:not(:disabled)': {
                    backgroundColor: `var(--${string})`;
                };
                '&:active:not(:disabled)': {
                    backgroundColor: `var(--${string})`;
                };
                '&:focus-visible': {
                    boxShadow: `0 0 0 2px var(--${string})40`;
                };
            };
            backgroundColor?: undefined;
            color?: undefined;
        })[];
        destructive: ({
            backgroundColor: `var(--${string})`;
            color: `var(--${string})`;
            boxShadow: `var(--${string})`;
            selectors?: undefined;
        } | {
            selectors: {
                '&:hover:not(:disabled)': {
                    backgroundColor: `var(--${string})`;
                    boxShadow: `var(--${string})`;
                };
                '&:active:not(:disabled)': {
                    backgroundColor: `var(--${string})`;
                };
                '&:focus-visible': {
                    boxShadow: `0 0 0 2px var(--${string})40`;
                };
            };
            backgroundColor?: undefined;
            color?: undefined;
            boxShadow?: undefined;
        })[];
        gradient: ({
            background: `linear-gradient(135deg, var(--${string}) 0%, var(--${string}) 100%)`;
            color: `var(--${string})`;
            boxShadow: `var(--${string})`;
            selectors?: undefined;
        } | {
            selectors: {
                '&:hover:not(:disabled)': {
                    background: `linear-gradient(135deg, var(--${string}) 0%, var(--${string}) 100%)`;
                    boxShadow: `var(--${string})`;
                };
                '&:active:not(:disabled)': {
                    background: `linear-gradient(135deg, var(--${string}) 0%, var(--${string}) 100%)`;
                };
                '&:focus-visible': {
                    boxShadow: `0 0 0 2px var(--${string})40, 0 0 20px var(--${string})20`;
                };
            };
            background?: undefined;
            color?: undefined;
            boxShadow?: undefined;
        })[];
    };
    size: {
        sm: {
            height: "2rem";
            paddingLeft: `var(--${string})`;
            paddingRight: `var(--${string})`;
            fontSize: `var(--${string})`;
            borderRadius: `var(--${string})`;
        };
        md: {
            height: "2.5rem";
            paddingLeft: `var(--${string})`;
            paddingRight: `var(--${string})`;
            fontSize: `var(--${string})`;
        };
        lg: {
            height: "3rem";
            paddingLeft: `var(--${string})`;
            paddingRight: `var(--${string})`;
            fontSize: `var(--${string})`;
            borderRadius: `var(--${string})`;
        };
        xl: {
            height: "3.5rem";
            paddingLeft: `var(--${string})`;
            paddingRight: `var(--${string})`;
            fontSize: `var(--${string})`;
            borderRadius: `var(--${string})`;
        };
        icon: {
            width: "2.5rem";
            height: "2.5rem";
            padding: "0";
        };
    };
    fullWidth: {
        true: {
            width: "100%";
        };
    };
    loading: {
        true: {
            pointerEvents: "none";
            opacity: number;
        };
    };
}>;

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

export { type AnimationDuration, type AnimationEasing, type BaseComponentProps, type BlurToken, type BorderRadiusToken, type BorderWidthToken, type Breakpoint, Button, type ButtonProps, type ButtonRef, type ColorScale, type ColorToken, type ComponentShadow, type DSResponsiveValue, type DisabledState, type DivRef, type FontFamily, type FontSize, type FontWeight, type FormFieldProps, type GlowEffect, type GradientType, type InputRef, type InteractiveProps, type LetterSpacing, type LineHeight, type LoadingState, type NeutralColor, type PolymorphicProps, type PrimaryColor, type ResponsiveValue, type SelectRef, type SemanticColor, type SemanticSpacingToken, type ShadowToken, type Size, type SpacingToken, type SpanRef, type TextStyle, type TextareaRef, type ThemeContextType, type ThemeName, type Variant, type ZIndexLevel, animation, announce, aria, button, cn, cnx, colors, componentShadows, contrast, createResponsiveValue, createVariants, designSystemConfig, effects, focusRing, focusVisible, getMediaQuery, glowEffects, gradients, keyboard, mergeStyles, resolveResponsiveValue, responsive, semanticSpacing, spacing, srOnly, textStyles, tokens, typography };
