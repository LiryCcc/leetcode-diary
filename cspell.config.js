import { defineConfig } from 'cspell';

const cspellConfig = defineConfig({
  version: '0.2',
  useGitignore: true,
  ignorePaths: ['pnpm-lock.yaml', '*3541*'],
  words: ['nums', 'liry', 'datastructures', 'leetcode', 'Subarrays', 'psum', 'radash', 'arrs', 'aeiou', 'overscan']
});

export default cspellConfig;
