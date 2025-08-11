# Getting Started

Welcome to the @johnatandeleon/design-system! This comprehensive React design system provides a complete set of components, design tokens, and utilities for building consistent, accessible applications.

## Installation

```bash
npm install @johnatandeleon/design-system
# or
yarn add @johnatandeleon/design-system
# or
pnpm add @johnatandeleon/design-system
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
import '@johnatandeleon/design-system/styles';
```

### 2. Use Components

Import and use components as needed:

```tsx
import { Button } from '@johnatandeleon/design-system';

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
import { colors, spacing, typography } from '@johnatandeleon/design-system/styles';

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
import { Button, ButtonProps } from '@johnatandeleon/design-system';

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
import { Button } from '@johnatandeleon/design-system';

// ❌ Avoid - imports everything
import * as DesignSystem from '@johnatandeleon/design-system';
```

## Customization

### Using Design Tokens

```tsx
import { tokens, createVariants } from '@johnatandeleon/design-system/styles';

// Create custom variants using design tokens
const myButton = createVariants('my-button', {
  variant: {
    custom: `bg-${tokens.colors.primary[600]} text-white`,
  },
});
```

### Extending Components

```tsx
import { Button, ButtonProps } from '@johnatandeleon/design-system';

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