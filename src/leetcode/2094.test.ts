import { describe, expect, it } from 'vitest';
import findEvenNumbers from './2094.ts';
import { generateRandomArray } from './utils.ts';

const solution = (digits: number[]): number[] => {
  const nums = new Set<number>();
  const n = digits.length;
  // 遍历三个数位的下标
  for (let i = 0; i < n; ++i) {
    for (let j = 0; j < n; ++j) {
      for (let k = 0; k < n; ++k) {
        // 判断是否满足目标偶数的条件
        if (i === j || j === k || i === k) {
          continue;
        }
        const num = digits[i] * 100 + digits[j] * 10 + digits[k];
        if (num >= 100 && num % 2 === 0) {
          nums.add(num);
        }
      }
    }
  }
  // 转化为升序排序的数组
  const res = Array.from(nums).sort((a, b) => a - b);
  return res;
};

describe('对拍', () => {
  for (let i = 0; i < 100; i++) {
    it('2094', () => {
      const arr = generateRandomArray(100, 0, 9);
      // .filter((item) => item % 2 === 1);
      expect(solution(arr)).toEqual(findEvenNumbers(arr));
    });
  }
});
