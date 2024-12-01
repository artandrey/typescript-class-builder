import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    testTimeout: 15000,
    hookTimeout: 25000,
    alias: {
      '~lib': path.resolve(__dirname, './src/lib'),
    },
  },
});
