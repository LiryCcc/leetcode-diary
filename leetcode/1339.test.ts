import { describe, expect } from 'vitest';
import countLargestGroup from './1339';

function solution(n: number): number {
  const hashMap: { [key: number]: number } = {};
  let maxValue = 0;
  for (let i = 1; i <= n; ++i) {
    let key = 0,
      i0 = i;
    while (i0) {
      key += i0 % 10;
      i0 = Math.floor(i0 / 10);
    }
    hashMap[key] = (hashMap[key] || 0) + 1;
    maxValue = Math.max(maxValue, hashMap[key]);
  }

  let count = 0;
  for (const value of Object.values(hashMap)) {
    if (value === maxValue) {
      count++;
    }
  }
  return count;
}

describe('对拍', () => {
  // 原题最大10000
  for (let i = 1; i <= 10000; i++) {
    new Promise<void>((resolve) => {
      expect(solution(i)).toBe(countLargestGroup(i));
      resolve();
    });
  }
});
