import { defineConfig } from 'vitest/config';

const vitestConfig = defineConfig({
  test: {
    // ...
    testTimeout: 3000000
  }
});
export default vitestConfig;
