import { defineConfig } from 'tsup';

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
  esbuildOptions: (options) => {
    options.banner = {
      js: '"use client"',
    };
  },
});