# @codelion/design-system

## 1.0.0

### Major Changes

- 🦁 **CodeLion DS v1.0.0 - Initial Release**

  The first official release of CodeLion Design System! A powerful, type-safe
  React component library built for modern applications.

  ## ✨ Features
  - 🎭 **vanilla-extract CSS-in-JS** with zero runtime overhead
  - 🔧 **Full TypeScript support** with comprehensive type definitions
  - ♿ **WCAG 2.1 AA accessibility** built-in with automated testing
  - 📦 **Tree-shakeable components** for optimal bundle size
  - 🎨 **Comprehensive design tokens** system
  - 📚 **Interactive Storybook documentation**

  ## 🎯 Initial Components
  - **Button** - 5 variants (primary, secondary, ghost, destructive, gradient),
    multiple sizes, loading states
  - **Design Tokens** - Complete color palette, spacing scale, typography
    system, effects
  - **Utilities** - Accessibility helpers, responsive utilities, class name
    merging

  ## 🚀 Getting Started

  ```bash
  npm install @codelion/design-system@^1.0.0
  ```

  ```tsx
  import { Button } from '@codelion/design-system';
  import '@codelion/design-system/styles';

  <Button variant="primary" size="md" loading={false}>
    Roar with power! 🦁
  </Button>;
  ```

  Ready to build amazing interfaces that roar with power and elegance! 🦁✨
