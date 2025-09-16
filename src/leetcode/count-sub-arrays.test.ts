import { describe, expect, it } from 'vitest';
import countSubArrays from './count-sub-arrays.ts';
function solution(nums: number[], minK: number, maxK: number): number {
  let ans = 0,
    minI = -1,
    maxI = -1,
    i0 = -1;
  for (let i = 0; i < nums.length; i++) {
    const x = nums[i];
    if (x === minK) {
      minI = i; // 最近的 minK 位置
    }
    if (x === maxK) {
      maxI = i; // 最近的 maxK 位置
    }
    if (x < minK || x > maxK) {
      i0 = i; // 子数组不能包含 nums[i0]
    }
    ans += Math.max(Math.min(minI, maxI) - i0, 0);
  }
  return ans;
}

function generateRandomArray(length: number, min: number, max: number) {
  const result = [];
  for (let i = 0; i < length; i++) {
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    result.push(randomNum);
  }
  return result;
}

describe('countSubArrays', () => {
  it('should return correct count for random array', () => {
    const arr = generateRandomArray(10000, 1, 1000000);
    expect(solution(arr, 1, 100000)).toBe(countSubArrays(arr, 1, 100000));
  });
});
