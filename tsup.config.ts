import { readFile, writeFile } from 'node:fs/promises';
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
  // Every component is interactive or composes one that is (Button keeps a
  // ref, Input keeps state), so the whole bundle is a client module. Without
  // the directive, a React Server Component that imports the library fails to
  // build in Next.js App Router.
  //
  // It is prepended after the build instead of passed as a banner: the
  // treeshake pass runs rollup, which strips module-level directives.
  onSuccess: async () => {
    const entry = 'dist/index.js';
    const code = await readFile(entry, 'utf8');
    if (code.startsWith('"use client";')) return;
    await writeFile(entry, `"use client";\n${code}`);
    // One line was added on top: a leading ";" in the mappings is exactly one
    // empty generated line, so the sourcemap keeps pointing at the right code.
    const map = JSON.parse(await readFile(`${entry}.map`, 'utf8'));
    map.mappings = `;${map.mappings}`;
    await writeFile(`${entry}.map`, JSON.stringify(map));
  },
});
