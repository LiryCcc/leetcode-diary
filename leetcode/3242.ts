const dirs = [
  [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1]
  ],
  [
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1]
  ]
];

class NeighborSum {
  private grid: number[][];
  private pos: { [key: number]: [number, number] };
  constructor(grid: number[][]) {
    this.grid = grid;
    this.pos = {};
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        this.pos[grid[i][j]] = [i, j];
      }
    }
  }

  adjacentSum(value: number): number {
    return this.getSum(value, 0);
  }

  diagonalSum(value: number): number {
    return this.getSum(value, 1);
  }

  getSum(value: number, idx: number): number {
    const [x, y] = this.pos[value];
    let sum = 0;
    for (const [dx, dy] of dirs[idx]) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && nx < this.grid.length && ny >= 0 && ny < this.grid[0].length) {
        sum += this.grid[nx][ny];
      }
    }
    return sum;
  }
}

export default NeighborSum;
