const D = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0]
] as const;

function containsCycle(grid: string[][]): boolean {
  const m = grid.length;
  const n = grid[0].length;
  const visited: boolean[][] = Array.from({ length: m }, () => Array(n).fill(false));

  const dfs = (x: number, y: number, px: number, py: number): boolean => {
    visited[x][y] = true;

    for (const [dx, dy] of D) {
      const ni = x + dx;
      const nj = y + dy;

      if (ni >= 0 && ni < m && nj >= 0 && nj < n && grid[ni][nj] === grid[x][y]) {
        if (ni === px && nj === py) continue;

        if (visited[ni][nj] || dfs(ni, nj, x, y)) {
          return true;
        }
      }
    }
    return false;
  };

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (!visited[i][j] && dfs(i, j, -1, -1)) {
        return true;
      }
    }
  }

  return false;
}

export default containsCycle;
