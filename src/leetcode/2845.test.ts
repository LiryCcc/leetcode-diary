import { describe, expect, it } from 'vitest';
import countInterestingSubarrays from './2845.ts';

function solution(nums: number[], modulo: number, k: number): number {
  const n = nums.length;
  const cnt = new Map<number, number>();
  let res = 0;
  let prefix = 0;
  cnt.set(0, 1);
  for (let i = 0; i < n; i++) {
    prefix += nums[i] % modulo === k ? 1 : 0;
    res += cnt.get((prefix - k + modulo) % modulo) || 0;
    cnt.set(prefix % modulo, (cnt.get(prefix % modulo) || 0) + 1);
  }
  return res;
}

function generateRandomArray(length: number, min: number, max: number) {
  const result = [];
  for (let i = 0; i < length; i++) {
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    result.push(randomNum);
  }
  return result;
}

describe('solution', () => {
  it('should return 0 when nums is [4,3,1,2] and modulo is 5 and k is 0', () => {
    const arr = generateRandomArray(1000, 1, 1000);
    expect(solution(arr, 12, 3)).toBe(countInterestingSubarrays(arr, 12, 3));
  });
});
