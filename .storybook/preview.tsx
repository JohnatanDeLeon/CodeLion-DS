import React from 'react';
import type { Preview } from '@storybook/react-vite';
import '../src/styles/globals/reset.css';

const preview: Preview = {
  parameters: {
    // Global parameters
    actions: { argTypesRegex: '^on[A-Z].*' },
    
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
      expanded: true,
      sort: 'requiredFirst',
    },
    
    // Design tokens documentation
    docs: {
      toc: true,
      source: {
        state: 'open',
      },
    },
    
    // Accessibility testing
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            reviewOnFail: true,
          },
          {
            id: 'focus-order-semantics',
            reviewOnFail: true,
          },
          {
            id: 'keyboard',
            reviewOnFail: true,
          },
        ],
      },
      options: {
        checks: { 'color-contrast': { options: { noScroll: true } } },
        restoreScroll: true,
      },
    },
    
    // Backgrounds for testing components
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#0f172a',
        },
        {
          name: 'neutral',
          value: '#f8fafc',
        },
      ],
    },
    
    // Viewport sizes
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: { width: '320px', height: '568px' },
        },
        tablet: {
          name: 'Tablet',
          styles: { width: '768px', height: '1024px' },
        },
        desktop: {
          name: 'Desktop',
          styles: { width: '1280px', height: '720px' },
        },
        wide: {
          name: 'Wide',
          styles: { width: '1536px', height: '864px' },
        },
      },
    },
  },
  
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },
  
  // Global decorators
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'light';
      
      return (
        <div 
          className={theme}
          style={{
            padding: '1rem',
            minHeight: '100vh',
            backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff',
            color: theme === 'dark' ? '#f8fafc' : '#0f172a',
          }}
        >
          <Story />
        </div>
      );
    },
  ],
  
  // Story sorting
  options: {
    storySort: {
      order: [
        'Design System',
        ['Introduction', 'Design Tokens', 'Colors', 'Typography', 'Spacing'],
        'Components',
        ['Basic', 'Form', 'Navigation', 'Feedback', 'Layout'],
        '*',
      ],
    },
  },
};

export default preview;