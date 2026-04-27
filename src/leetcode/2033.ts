export const minOperations = (grid: number[][], x: number): number => {
  const nums: number[] = [];
  const m = grid.length;
  const n = grid[0].length;
  const base = grid[0][0];

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if ((grid[i][j] - base) % x !== 0) {
        return -1;
      }
      nums.push(grid[i][j]);
    }
  }

  const sortedNums = nums.toSorted((a, b) => a - b);
  const choose = sortedNums[Math.floor(sortedNums.length / 2)];
  return sortedNums.reduce((acc, num) => acc + Math.abs(num - choose) / x, 0);
};
