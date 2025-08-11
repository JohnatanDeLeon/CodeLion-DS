declare module 'jest-axe' {
  import type { AxeResults } from 'axe-core';

  export const axe: (container: HTMLElement) => Promise<AxeResults>;
  export const toHaveNoViolations: () => {
    pass: boolean;
    message: () => string;
  };
}

declare module 'vitest' {
  interface Assertion<T = any> {
    toHaveNoViolations(): void;
  }
  interface AsymmetricMatchersContaining {
    toHaveNoViolations(): void;
  }
}

export {};

