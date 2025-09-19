import { describe, expect, it } from 'vitest';
import minimumArea from './3195.ts';
import { generateRandom2DArray } from './utils.ts';

function solution(grid: number[][]): number {
  const n = grid.length,
    m = grid[0].length;
  let min_i = n,
    max_i = 0;
  let min_j = m,
    max_j = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (grid[i][j] === 1) {
        min_i = Math.min(min_i, i);
        max_i = Math.max(max_i, i);
        min_j = Math.min(min_j, j);
        max_j = Math.max(max_j, j);
      }
    }
  }
  return (max_i - min_i + 1) * (max_j - min_j + 1);
}

describe('3195', () => {
  for (let i = 0; i < 15; i++) {
    it('对拍', () => {
      const ca = generateRandom2DArray(1000, 1000, 0, 1);
      expect(solution(ca)).toBe(minimumArea(ca));
    });
  }
});
