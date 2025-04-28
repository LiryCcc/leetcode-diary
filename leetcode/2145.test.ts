import { describe, expect, it } from 'vitest';
import numberOfArrays from './2145';

const solution = function (differences: number[], lower: number, upper: number): number {
  let x = 0,
    y = 0,
    cur = 0;
  for (const d of differences) {
    cur += d;
    x = Math.min(x, cur);
    y = Math.max(y, cur);
    if (y - x > upper - lower) {
      return 0;
    }
  }
  return upper - lower - (y - x) + 1;
};

const random = () => {
  return Math.floor(Math.random() * 100000);
};

const randomArray = (length: number, _lower: number, _upper: number): number[] => {
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(random());
  }
  return arr;
};

describe('统计隐藏数组数目', () => {
  // 随便写几个用例
  it('和官方题解一致', () => {
    const arrs: number[][] = [];
    for (let i = 0; i < 1000; i++) {
      arrs.push(randomArray(random(), random(), random()));
    }
    for (const arr of arrs) {
      const [upper, lower] = [random(), random()].sort((a, b) => b - a);
      expect(solution(arr, upper, lower)).toEqual(numberOfArrays(arr, upper, lower));
    }
  });
});
