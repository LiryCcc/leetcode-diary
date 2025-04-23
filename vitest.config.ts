import { defineConfig } from 'vitest/config';

const vitestConfig = defineConfig({
  test: {
    // ...
    testTimeout: 300000
  }
});
export default vitestConfig;
