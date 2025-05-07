import { describe, expect, it } from 'vitest';
import buildArray from './1920';
import { generateRandomArray } from './utils';

function solution(nums: number[]): number[] {
  const n = nums.length;
  const ans: number[] = [];
  for (let i = 0; i < n; ++i) {
    ans.push(nums[nums[i]]);
  }
  return ans;
}

describe('与题解一致', () => {
  it('test', () => {
    for (let i = 0; i < 100; i++) {
      const arr = generateRandomArray(100, 0, 100);
      expect(solution(arr)).toEqual(buildArray(arr));
    }
  });
});
