# Getting Started

Welcome to the @company/design-system! This comprehensive React design system provides a complete set of components, design tokens, and utilities for building consistent, accessible applications.

## Installation

```bash
npm install @company/design-system
# or
yarn add @company/design-system
# or
pnpm add @company/design-system
```

## Peer Dependencies

Make sure you have the required peer dependencies installed:

```bash
npm install react react-dom
```

## Quick Start

### 1. Import CSS Reset

First, import the CSS reset in your application's root file (e.g., `main.tsx` or `App.tsx`):

```tsx
import '@company/design-system/styles';
```

### 2. Use Components

Import and use components as needed:

```tsx
import { Button } from '@company/design-system';

function App() {
  return (
    <div>
      <Button variant="primary" onClick={() => console.log('Clicked!')}>
        Get Started
      </Button>
    </div>
  );
}
```

### 3. Use Design Tokens

Access design tokens for custom components:

```tsx
import { colors, spacing, typography } from '@company/design-system';

// Use in your custom styles
const customStyles = {
  backgroundColor: colors.primary[500],
  padding: spacing[4],
  fontSize: typography.fontSize.base,
};
```

## TypeScript Support

The design system is built with TypeScript and provides full type safety:

```tsx
import { Button, ButtonProps } from '@company/design-system';

// All props are fully typed
const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
```

## Accessibility

All components follow WCAG 2.1 AA guidelines and include:

- Proper ARIA attributes
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Focus management

## Bundle Size

The design system is optimized for tree shaking. Only import what you use:

```tsx
// ✅ Good - only imports Button
import { Button } from '@company/design-system';

// ❌ Avoid - imports everything
import * as DesignSystem from '@company/design-system';
```

## Customization

### Using Design Tokens

```tsx
import { tokens, createVariants } from '@company/design-system';

// Create custom variants using design tokens
const myButton = createVariants('my-button', {
  variant: {
    custom: `bg-${tokens.colors.primary[600]} text-white`,
  },
});
```

### Extending Components

```tsx
import { Button, ButtonProps } from '@company/design-system';

interface CustomButtonProps extends ButtonProps {
  icon?: React.ReactNode;
}

export const CustomButton: React.FC<CustomButtonProps> = ({ 
  icon, 
  children, 
  ...props 
}) => {
  return (
    <Button {...props}>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </Button>
  );
};
```

## Next Steps

- Browse the [Storybook documentation](./storybook-static/index.html) for component examples
- Check out [Design Tokens](./design-tokens.md) for customization options
- See [Component Guidelines](./components.md) for usage best practices