/**
 * Accessibility utilities for design system components
 * Helpers for WCAG 2.1 AA compliance
 */

/**
 * Screen reader only styles
 * Hides content visually but keeps it accessible to screen readers
 */
export const srOnly = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: '0',
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  borderWidth: '0',
} as const;

/**
 * Focus visible styles for keyboard navigation
 * Provides consistent focus indicators across components
 */
export const focusVisible = {
  outline: '2px solid transparent',
  outlineOffset: '2px',
  ':focus-visible': {
    outline: '2px solid currentColor',
    outlineOffset: '2px',
  },
} as const;

/**
 * Focus ring styles using box-shadow
 * Alternative to outline for better control
 */
export const focusRing = (color = 'rgb(59 130 246)', opacity = 0.5) => ({
  ':focus': {
    outline: '2px solid transparent',
    outlineOffset: '2px',
  },
  ':focus-visible': {
    outline: '2px solid transparent',
    outlineOffset: '2px',
    boxShadow: `0 0 0 2px ${color}${Math.round(opacity * 255).toString(16)}`,
  },
});

/**
 * Generates ARIA attributes for common patterns
 */
export const aria = {
  /**
   * Button ARIA attributes
   */
  button: (props: {
    pressed?: boolean;
    expanded?: boolean;
    disabled?: boolean;
    describedBy?: string;
    labelledBy?: string;
  }) => {
    const attributes: Record<string, string | boolean | undefined> = {
      role: 'button',
    };
    
    // Handle tabIndex separately as it can be a number
    if (props.disabled) {
      (attributes as any).tabIndex = -1;
    } else {
      (attributes as any).tabIndex = 0;
    }

    if (props.pressed !== undefined) attributes['aria-pressed'] = props.pressed;
    if (props.expanded !== undefined) attributes['aria-expanded'] = props.expanded;
    if (props.disabled) attributes['aria-disabled'] = true;
    if (props.describedBy) attributes['aria-describedby'] = props.describedBy;
    if (props.labelledBy) attributes['aria-labelledby'] = props.labelledBy;

    return attributes;
  },

  /**
   * Input ARIA attributes
   */
  input: (props: {
    required?: boolean;
    invalid?: boolean;
    describedBy?: string;
    labelledBy?: string;
    placeholder?: string;
  }) => {
    const attributes: Record<string, string | boolean | undefined> = {};

    if (props.required) attributes['aria-required'] = true;
    if (props.invalid) attributes['aria-invalid'] = true;
    if (props.describedBy) attributes['aria-describedby'] = props.describedBy;
    if (props.labelledBy) attributes['aria-labelledby'] = props.labelledBy;

    return attributes;
  },

  /**
   * Menu/Dropdown ARIA attributes
   */
  menu: (props: {
    expanded?: boolean;
    hasPopup?: boolean;
    controls?: string;
    activeDescendant?: string;
  }) => {
    const attributes: Record<string, string | boolean | undefined> = {
      role: 'menu',
    };

    if (props.expanded !== undefined) attributes['aria-expanded'] = props.expanded;
    if (props.hasPopup) attributes['aria-haspopup'] = true;
    if (props.controls) attributes['aria-controls'] = props.controls;
    if (props.activeDescendant) attributes['aria-activedescendant'] = props.activeDescendant;

    return attributes;
  },

  /**
   * Dialog/Modal ARIA attributes
   */
  dialog: (props: {
    labelledBy?: string;
    describedBy?: string;
    modal?: boolean;
  }) => {
    const attributes: Record<string, string | boolean | undefined> = {
      role: 'dialog',
    };

    if (props.labelledBy) attributes['aria-labelledby'] = props.labelledBy;
    if (props.describedBy) attributes['aria-describedby'] = props.describedBy;
    if (props.modal) attributes['aria-modal'] = true;

    return attributes;
  },
};

/**
 * Color contrast utilities
 * Helpers for ensuring WCAG AA compliance
 */
export const contrast = {
  /**
   * Calculate relative luminance of a color
   * Used for contrast ratio calculations
   */
  getLuminance: (r: number, g: number, b: number): number => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  },

  /**
   * Calculate contrast ratio between two colors
   * Returns ratio that should be >= 4.5 for AA compliance
   */
  getContrastRatio: (color1: [number, number, number], color2: [number, number, number]): number => {
    const lum1 = contrast.getLuminance(...color1);
    const lum2 = contrast.getLuminance(...color2);
    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);
    return (lighter + 0.05) / (darker + 0.05);
  },

  /**
   * Check if color combination meets WCAG AA standards
   */
  meetsAA: (color1: [number, number, number], color2: [number, number, number]): boolean => {
    return contrast.getContrastRatio(color1, color2) >= 4.5;
  },

  /**
   * Check if color combination meets WCAG AAA standards
   */
  meetsAAA: (color1: [number, number, number], color2: [number, number, number]): boolean => {
    return contrast.getContrastRatio(color1, color2) >= 7;
  },
};

/**
 * Keyboard navigation utilities
 */
export const keyboard = {
  /**
   * Standard keyboard event handlers
   */
  handlers: {
    onEnterOrSpace: (callback: () => void) => (event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        callback();
      }
    },

    onEscape: (callback: () => void) => (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        callback();
      }
    },

    onArrowKeys: (callbacks: {
      up?: () => void;
      down?: () => void;
      left?: () => void;
      right?: () => void;
    }) => (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          callbacks.up?.();
          break;
        case 'ArrowDown':
          event.preventDefault();
          callbacks.down?.();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          callbacks.left?.();
          break;
        case 'ArrowRight':
          event.preventDefault();
          callbacks.right?.();
          break;
      }
    },
  },

  /**
   * Focus management utilities
   */
  focus: {
    /**
     * Get all focusable elements within a container
     */
    getFocusableElements: (container: HTMLElement): HTMLElement[] => {
      const focusableSelectors = [
        'button:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        'a[href]',
        '[tabindex]:not([tabindex="-1"])',
        '[contenteditable="true"]',
      ].join(', ');

      return Array.from(container.querySelectorAll(focusableSelectors));
    },

    /**
     * Trap focus within a container (for modals, dropdowns)
     */
    trapFocus: (container: HTMLElement) => {
      const focusableElements = keyboard.focus.getFocusableElements(container);
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const handleTabKey = (event: KeyboardEvent) => {
        if (event.key !== 'Tab') return;

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement?.focus();
          }
        }
      };

      container.addEventListener('keydown', handleTabKey);

      return () => {
        container.removeEventListener('keydown', handleTabKey);
      };
    },
  },
};

/**
 * Announcement utilities for screen readers
 */
export const announce = {
  /**
   * Create a live region for screen reader announcements
   */
  createLiveRegion: (level: 'polite' | 'assertive' = 'polite'): HTMLElement => {
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', level);
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.style.cssText = Object.entries(srOnly)
      .map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`)
      .join('; ');
    
    document.body.appendChild(liveRegion);
    return liveRegion;
  },

  /**
   * Announce message to screen readers
   */
  message: (message: string, level: 'polite' | 'assertive' = 'polite'): void => {
    const liveRegion = announce.createLiveRegion(level);
    liveRegion.textContent = message;
    
    // Clean up after announcement
    setTimeout(() => {
      document.body.removeChild(liveRegion);
    }, 1000);
  },
};