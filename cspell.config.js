import { defineConfig } from 'cspell';

const cspellConfig = defineConfig({
  version: '0.2',
  useGitignore: true,
  ignorePaths: ['pnpm-lock.yaml'],
  words: ['nums', 'liry', 'datastructures', 'leetcode', 'Subarrays', 'psum', 'radash', 'arrs']
});

export default cspellConfig;
