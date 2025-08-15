import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-links',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    defaultName: 'Documentation',
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  viteFinal: async (config) => {
    // Ensure vanilla-extract works in Storybook
    const { vanillaExtractPlugin } = await import('@vanilla-extract/vite-plugin');
    
    config.plugins = config.plugins || [];
    config.plugins.push(vanillaExtractPlugin());

    return config;
  },
};

export default config;