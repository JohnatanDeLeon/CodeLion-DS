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
  define: {
    'process.env.NODE_ENV': '"production"',
    'process.argv': '[]',
    'process.platform': '"browser"',
    'process.env': '{}',
  },
  esbuildOptions: (options) => {
    options.banner = {
      js: '"use client"',
    };
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