import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Add custom matchers
expect.extend(matchers);

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock HTMLElement.scrollIntoView
HTMLElement.prototype.scrollIntoView = vi.fn();

// Mock HTMLElement.focus
HTMLElement.prototype.focus = vi.fn();

// Mock HTMLElement.blur
HTMLElement.prototype.blur = vi.fn();

// Mock CSS.supports
if (!CSS.supports) {
  CSS.supports = vi.fn().mockReturnValue(true);
}

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn().mockResolvedValue(undefined),
    readText: vi.fn().mockResolvedValue(''),
  },
});

// Global test utilities
global.testUtils = {
  // Helper to wait for next tick
  nextTick: () => new Promise(resolve => setTimeout(resolve, 0)),
  
  // Helper to create mock refs
  createMockRef: <T>(value: T) => ({ current: value }),
  
  // Helper for accessibility testing
  axeRules: {
    // Common rules to disable in tests when appropriate
    'color-contrast': { enabled: false },
    'duplicate-id': { enabled: false },
  },
};

// Type augmentation for global test utilities
declare global {
  namespace globalThis {
    var testUtils: {
      nextTick: () => Promise<void>;
      createMockRef: <T>(value: T) => { current: T };
      axeRules: Record<string, { enabled: boolean }>;
    };
  }
}