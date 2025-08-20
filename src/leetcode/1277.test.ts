import { describe, expect, it } from 'vitest';
import countSquares from './1277';

function solution(matrix: number[][]): number {
  const m = matrix.length,
    n = matrix[0].length;
  const f: number[][] = new Array(m).fill(0).map(() => new Array(n).fill(0));
  let ans = 0;
  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      if (i === 0 || j === 0) {
        f[i][j] = matrix[i][j];
      } else if (matrix[i][j] === 0) {
        f[i][j] = 0;
      } else {
        f[i][j] = Math.min(f[i][j - 1], f[i - 1][j], f[i - 1][j - 1]) + 1;
      }
      ans += f[i][j];
    }
  }
  return ans;
}

describe('1277 ', () => {
  it('leetcode case 1', () => {
    const case1: [number[][], number] = [
      [
        [0, 1, 1, 1],
        [1, 1, 1, 1],
        [0, 1, 1, 1]
      ],
      15
    ] as const;
    expect(countSquares(case1[0])).toBe(case1[1]);
  });
  it('leetcode case 2', () => {
    const case2: [number[][], number] = [
      [
        [1, 0, 1],
        [1, 1, 0],
        [1, 1, 0]
      ],
      7
    ];
    expect(countSquares(case2[0])).toBe(case2[1]);
  });

  for (let i = 0; i < 100; i++) {
    it(`对拍 ${(i + 1).toString()}`, () => {
      const c: number[][] = [];
      for (let _ = 0; i < 100; i++) {
        const cc: number[] = [];
        for (let __ = 0; i < 100; i++) {
          cc.push(Math.random() > 0.5 ? 1 : 0);
        }
        c.push(cc);
      }
      expect(countSquares(c)).toBe(solution(c));
    });
  }
});
