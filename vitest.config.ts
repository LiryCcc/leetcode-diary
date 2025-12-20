import { defineConfig } from 'vitest/config';

const vitestConfig = defineConfig({
  test: {
    // ...
    testTimeout: 30000000,
    pool: 'threads'
  }
});
export default vitestConfig;
