import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    vanillaExtractPlugin(),
  ],
  
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'DesignSystem',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    sourcemap: true,
    minify: 'esbuild',
    target: 'esnext',
  },

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@/components': resolve(__dirname, 'src/components'),
      '@/styles': resolve(__dirname, 'src/styles'),
      '@/utils': resolve(__dirname, 'src/utils'),
      '@/types': resolve(__dirname, 'src/types'),
    },
  },

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        // Dependencies and build output
        'node_modules/',
        'dist/',
        'storybook-static/',
        '.storybook/',
        
        // Test files
        'tests/',
        '**/*.test.{ts,tsx}',
        '**/*.stories.{ts,tsx}',
        
        // Configuration files
        '**/*.config.*',
        '.eslintrc.*',
        '.prettierrc.*',
        'playwright.config.ts',
        
        // Style-only files (no business logic)
        'src/reset.ts',
        'src/styles.ts',
        'src/styles/index.ts',
        '**/*.css.ts',
        
        // Type definition files
        '**/*.d.ts',
        
        // Index files (only re-exports)
        'src/index.ts',
        'src/components/index.ts',
        'src/hooks/index.ts',
        'src/utils/index.ts',
        'src/types/index.ts',
        'src/styles/tokens/index.ts',
      ],
      
      // Include only source files with business logic
      include: [
        'src/**/*.{ts,tsx}',
      ],
      
      // Coverage thresholds for quality assurance
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
  },
});