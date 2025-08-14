import { cpus } from 'node:os';
import { defineConfig } from 'vitest/config';

const vitestConfig = defineConfig({
  test: {
    // ...
    testTimeout: 30000000,
    pool: 'threads',
    poolOptions: {
      threads: {
        minThreads: cpus().length,
        maxThreads: cpus().length
      }
    }
  }
});
export default vitestConfig;
