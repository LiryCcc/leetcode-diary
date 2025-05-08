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
  const direction = [
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
    const s = queue.dequeue();
    if (v[s!.x][s!.y]) {
      continue;
    }
    if (s!.x == n - 1 && s!.y == m - 1) {
      break;
    }
    v[s!.x][s!.y] = 1;
    for (let i = 0; i < 4; i++) {
      const nx = s!.x + direction[i][0];
      const ny = s!.y + direction[i][1];
      if (nx < 0 || nx >= n || ny < 0 || ny >= m) {
        continue;
      }
      const dist = Math.max(distance[s!.x][s!.y], moveTime[nx][ny]) + ((s!.x + s!.y) % 2) + 1;
      if (distance[nx][ny] > dist) {
        distance[nx][ny] = dist;
        queue.enqueue({ x: nx, y: ny, dist: dist });
      }
    }
  }
  return distance[n - 1][m - 1];
}

export default minTimeToReach;
