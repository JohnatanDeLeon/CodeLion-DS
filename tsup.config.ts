import { defineConfig } from 'tsup';
import { vanillaExtractPlugin } from '@vanilla-extract/esbuild-plugin';

export default defineConfig({
  entry: {
    'index': 'src/index.ts',
    'styles': 'src/styles.ts',
    'reset': 'src/reset.ts'
  },
  format: ['esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  minify: true,
  target: 'esnext',
  splitting: false,
  treeshake: true,
  external: ['react', 'react-dom'],
  esbuildPlugins: [vanillaExtractPlugin()],
  define: {
    'process.env.NODE_ENV': '"production"',
    'process.argv': '[]',
    'process.platform': '"browser"',
    'process.env': '{}',
  },
  esbuildOptions: (options) => {
    // No banner directives to avoid warnings in output
    options.banner = {} as any;
    // Define process for browser compatibility
    options.define = {
      ...options.define,
      'process': JSON.stringify({
        env: { NODE_ENV: 'production' },
        argv: [],
        platform: 'browser'
      }),
    };
  },

});