import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: true,
  },
  typescript: {
    reactDocgen: false,
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