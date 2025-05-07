import { PriorityQueue } from 'datastructures-js';

function minTimeToReach(moveTime: number[][]): number {
  interface State {
    x: number;
    y: number;
    dist: number;
  }
  const [n, m] = [moveTime.length, moveTime[0].length];
  const distance: number[][] = Array.from({ length: n }, () => Array(m).fill(1145141919810));
  const v: number[][] = Array.from({ length: n }, () => Array(m).fill(0));
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1]
  ];
  const queue = new PriorityQueue<State>((a, b) => {
    return a.dist - b.dist;
  });
  distance[0][0] = 0;
  queue.enqueue({ x: 0, y: 0, dist: 0 });
  while (!queue.isEmpty()) {
    const s = queue.dequeue()!;
    if (!v[s!.x][s!.y]) {
      v[s!.x][s!.y] = 1;
      for (const [dx, dy] of directions) {
        const nx = s.x + dx;
        const ny = s.y + dy;
        if (nx < 0 || nx >= n || ny < 0 || ny >= m) {
          continue;
        }
        const dist = Math.max(distance[s.x][s.y], moveTime[nx][ny]) + 1;
        if (distance[nx][ny] > dist) {
          distance[nx][ny] = dist;
          queue.enqueue({ x: nx, y: ny, dist });
        }
      }
    }
  }
  return distance[n - 1][m - 1];
}

export default minTimeToReach;
