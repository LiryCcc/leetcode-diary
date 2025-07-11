import { describe, expect, it } from 'vitest';
import numRabbits from './781';

// 这是题解代码
function solution(answers: number[]): number {
  const count: Map<number, number> = new Map();
  for (const y of answers) {
    count.set(y, (count.get(y) || 0) + 1);
  }
  let ans = 0;
  for (const [y, x] of count) {
    ans += Math.floor((x + y) / (y + 1)) * (y + 1);
  }
  return ans;
}

// 生成随机长度数组，且每个数组的元素都是正整数
function generateRandomArray(length: number): number[] {
  const array: number[] = [];
  for (let i = 0; i < length; i++) {
    array.push(Math.floor(Math.random() * 10) + 1);
  }
  return array;
}

describe('test', () => {
  it('test', () => {
    for (let i = 0; i < 100; i++) {
      const arr = generateRandomArray(Math.floor(Math.random() * 10) + 1);
      expect(numRabbits(arr)).toBe(solution(arr));
    }
  });
});
