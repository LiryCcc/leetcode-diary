import { describe, expect, it } from 'vitest';
import countSubarrays from './3392';
import { generateRandomArray } from './utils';

function solution(nums: number[]): number {
  const n = nums.length;
  let ans = 0;
  for (let i = 1; i < n - 1; ++i) {
    if (nums[i] === (nums[i - 1] + nums[i + 1]) * 2) {
      ++ans;
    }
  }
  return ans;
}

describe('countSubarrays', () => {
  it('should equal to solution', () => {
    const arr = generateRandomArray(100, -100, 100);
    expect(solution(arr)).toBe(countSubarrays(arr));
  });
});
