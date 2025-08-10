import React, { forwardRef } from 'react';
import { cn } from '../../utils';

// Inline styles for Button variants - funcional guarantee
const buttonStyles = {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '6px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    fontWeight: '500',
    transition: 'all 0.2s ease-in-out',
    whiteSpace: 'nowrap' as const,
    textDecoration: 'none',
    outline: 'none',
  },
  variants: {
    primary: {
      backgroundColor: '#2563EB',
      color: '#FFFFFF',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    },
    primaryHover: {
      backgroundColor: '#1D4ED8',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      transform: 'translateY(-1px)',
    },
    secondary: {
      backgroundColor: '#E5E7EB',
      color: '#374151',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    },
    secondaryHover: {
      backgroundColor: '#D1D5DB',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      transform: 'translateY(-1px)',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: '#374151',
    },
    ghostHover: {
      backgroundColor: '#F3F4F6',
      color: '#111827',
    },
    destructive: {
      backgroundColor: '#DC2626',
      color: '#FFFFFF',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    },
    destructiveHover: {
      backgroundColor: '#B91C1C',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      transform: 'translateY(-1px)',
    },
    gradient: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: '#FFFFFF',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    },
    gradientHover: {
      background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      transform: 'translateY(-1px)',
    },
  },
  sizes: {
    sm: {
      height: '32px',
      padding: '0 12px',
      fontSize: '14px',
    },
    md: {
      height: '40px', 
      padding: '0 16px',
      fontSize: '16px',
    },
    lg: {
      height: '48px',
      padding: '0 20px',
      fontSize: '18px',
    },
    xl: {
      height: '56px',
      padding: '0 24px',
      fontSize: '20px',
    },
  },
  disabled: {
    pointerEvents: 'none' as const,
    opacity: 0.6,
    cursor: 'not-allowed',
  }
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  children: React.ReactNode;
}

export const ButtonInline = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading = false, disabled, children, ...props }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const [isActive, setIsActive] = React.useState(false);

    // Merge styles
    const mergedStyles = {
      ...buttonStyles.base,
      ...buttonStyles.variants[variant],
      ...buttonStyles.sizes[size],
      ...(disabled && buttonStyles.disabled),
      ...(isHovered && !disabled && buttonStyles.variants[`${variant}Hover` as keyof typeof buttonStyles.variants]),
      ...(isActive && !disabled && { transform: 'translateY(0)' }),
      ...(loading && { cursor: 'wait' }),
    };

    return (
      <button
        className={cn(className)}
        ref={ref}
        disabled={disabled || loading}
        style={mergedStyles}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={() => setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
        aria-busy={loading}
        aria-disabled={disabled}
        {...props}
      >
        {loading && (
          <span 
            style={{
              display: 'inline-block',
              width: '16px',
              height: '16px',
              border: '2px solid transparent',
              borderTop: '2px solid currentColor',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          />
        )}
        {children}
      </button>
    );
  }
);

ButtonInline.displayName = 'ButtonInline';
