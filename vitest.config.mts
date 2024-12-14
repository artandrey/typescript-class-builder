import path from 'path';
import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    testTimeout: 15000,
    hookTimeout: 25000,
    alias: {
      '~lib': path.resolve(__dirname, './src/lib'),
    },
    benchmark: {
      include: ['src/tests/benchmarks/**/*.bench.ts'],
      outputJson: './.benchmarks/prototype-results.json',
      compare: './.benchmarks/proxy-results.json',
    },
  },
  plugins: [
    swc.vite({
      jsc: {
        parser: {
          syntax: 'typescript',
          decorators: true,
        },
      },
    }),
  ],
});
