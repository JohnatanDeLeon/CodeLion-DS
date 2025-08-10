import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './.storybook/**/*.{js,ts,jsx,tsx}',
    './docs/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // Use minimal Tailwind utilities to complement vanilla-extract
      // Focus on utilities not covered by our design tokens
      
      // Animation utilities
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideInFromTop: {
          '0%': { transform: 'translateY(-8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInFromBottom: {
          '0%': { transform: 'translateY(8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInFromLeft: {
          '0%': { transform: 'translateX(-8px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInFromRight: {
          '0%': { transform: 'translateX(8px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-out',
        'fade-out': 'fadeOut 150ms ease-in',
        'slide-in-from-top': 'slideInFromTop 200ms ease-out',
        'slide-in-from-bottom': 'slideInFromBottom 200ms ease-out',
        'slide-in-from-left': 'slideInFromLeft 200ms ease-out',
        'slide-in-from-right': 'slideInFromRight 200ms ease-out',
        'scale-in': 'scaleIn 200ms ease-out',
        'spin': 'spin 1s linear infinite',
      },

      // Focus utilities for accessibility
      outline: {
        none: 'none',
      },
      ringWidth: {
        DEFAULT: '2px',
      },
      ringOpacity: {
        DEFAULT: '0.5',
      },
      ringOffsetWidth: {
        DEFAULT: '2px',
      },

      // Screen reader utilities
      spacing: {
        'sr': '1px',
      },
    },
  },
  plugins: [
    // Custom plugin for accessibility utilities
    function({ addUtilities }) {
      addUtilities({
        '.sr-only': {
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: '0',
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          'white-space': 'nowrap',
          'border-width': '0',
        },
        '.not-sr-only': {
          position: 'static',
          width: 'auto',
          height: 'auto',
          padding: '0',
          margin: '0',
          overflow: 'visible',
          clip: 'auto',
          'white-space': 'normal',
        },
        '.focus-visible\\:focus-outline:focus-visible': {
          outline: '2px solid currentColor',
          'outline-offset': '2px',
        },
      });
    },
  ],
};

export default config;
