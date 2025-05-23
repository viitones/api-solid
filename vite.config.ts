import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';
export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    coverage: {
      include: ['src/**/*.{ts,tsx}'],
      reportsDirectory: 'coverage',
    },
  },
});
