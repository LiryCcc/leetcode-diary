import { describe, expect, it } from 'vitest';
import zeroFilledSubarray from './2348.ts';

const generateArr = (length: number): number[] => {
  const res: number[] = [];
  for (let i = 0; i < length; i++) {
    res.push(Math.random() > 0.5 ? 1 : 0);
  }
  return res;
};

function solution(nums: number[]): number {
  let [ans, cnt] = [0, 0];
  for (const x of nums) {
    if (!x) {
      ans += ++cnt;
    } else {
      cnt = 0;
    }
  }
  return ans;
}

describe('2348 leetcode cases', () => {
  for (let i = 0; i < 100; i++) {
    // new Promise(() =>
    it(`2348对拍${i}`, () => {
      const arr = generateArr(100000);
      // console.log(JSON.stringify(arr));
      expect(solution(arr)).toBe(zeroFilledSubarray(arr));
    });
    // );
  }
});
