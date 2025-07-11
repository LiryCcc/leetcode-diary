import { PriorityQueue } from 'datastructures-js';
import { describe, expect, it } from 'vitest';
import minTimeToReach from './3341';
import { generateRandom2DArray } from './utils';

interface State {
  x: number;
  y: number;
  dist: number;
}

function solution(moveTime: number[][]): number {
  const n = moveTime.length;
  const m = moveTime[0].length;
  const d: number[][] = Array.from({ length: n }, () => Array(m).fill(Infinity));
  const v: boolean[][] = Array.from({ length: n }, () => Array(m).fill(false));
  const dirs: [number, number][] = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1]
  ];
  const q = new PriorityQueue<State>((a, b) => a.dist - b.dist);

  d[0][0] = 0;
  q.enqueue({ x: 0, y: 0, dist: 0 });
  while (!q.isEmpty()) {
    const s = q.dequeue()!;
    if (v[s!.x][s!.y]) {
      continue;
    }
    v[s.x][s.y] = true;
    for (const [dx, dy] of dirs) {
      const nx = s.x + dx;
      const ny = s.y + dy;
      if (nx < 0 || nx >= n || ny < 0 || ny >= m) {
        continue;
      }
      const dist = Math.max(d[s.x][s.y], moveTime[nx][ny]) + 1;
      if (d[nx][ny] > dist) {
        d[nx][ny] = dist;
        q.enqueue({ x: nx, y: ny, dist });
      }
    }
  }

  return d[n - 1][m - 1];
}

describe('对拍', () => {
  it('对拍', () => {
    for (let i = 0; i < 100; i++) {
      const randomArray = generateRandom2DArray(50, 50, 0, 1000000000);
      expect(solution(randomArray)).toEqual(minTimeToReach(randomArray));
    }
  });
});
