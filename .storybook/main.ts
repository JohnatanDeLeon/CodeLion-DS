import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  // Keep JS/TS "stories" globs separate from MDX files. Placing mdx inside the
  // same extension alternation causes `.stories.mdx` files to be matched as
  // story files and sometimes triggers the "No matching indexer" error when
  // a docs-only MDX file exists alongside a docs page import. We match
  // `.stories.*` JS/TS files and all `*.mdx` files separately.
  stories: [
    // Regular JS/TS story files
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
    // All MDX docs, but exclude files that end with `.stories.mdx` using an
    // extglob — Storybook treats `*.stories.mdx` as story entries and expects
    // CSF exports; our docs pages are plain MDX (e.g. `masks.mdx`).
    '../src/**/!(*.stories).mdx',
  ],
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