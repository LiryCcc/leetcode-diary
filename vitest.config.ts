import { defineConfig } from 'vitest/config';

const vitestConfig = defineConfig({
  test: {
    // ...
    testTimeout: 30000000
  }
});
export default vitestConfig;
