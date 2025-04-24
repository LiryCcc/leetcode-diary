import { describe, expect, it } from 'vitest';
import countCompleteSubarrays from './2799';

function solution(nums: number[]): number {
  let res = 0;
  let cnt = new Map<number, number>();
  const n = nums.length;
  let right = 0;
  const distinct = new Set(nums).size;

  for (let left = 0; left < n; left++) {
    if (left > 0) {
      const remove = nums[left - 1];
      cnt.set(remove, cnt.get(remove)! - 1);
      if (cnt.get(remove) === 0) {
        cnt.delete(remove);
      }
    }
    while (right < n && cnt.size < distinct) {
      const add = nums[right];
      cnt.set(add, (cnt.get(add) || 0) + 1);
      right++;
    }
    if (cnt.size === distinct) {
      res += n - right + 1;
    }
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
  it('should return the number of subarrays with distinct elements', () => {
    for (let i = 0; i < 1000; i++) {
      const randomArray = generateRandomArray(1000, 1, 300);
      expect(solution(randomArray)).toBe(countCompleteSubarrays(randomArray));
    }
  });
});
