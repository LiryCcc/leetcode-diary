// 给你一个二维 二进制 数组 grid。请你找出一个边在水平方向和竖直方向上、面积 最小 的矩形，并且满足 grid 中所有的 1 都在矩形的内部。

// 返回这个矩形可能的 最小 面积。

// 示例 1：

// 输入： grid = [[0,1,0],[1,0,1]]

// 输出： 6

// 解释：

// 这个最小矩形的高度为 2，宽度为 3，因此面积为 2 * 3 = 6。

// 示例 2：

// 输入： grid = [[0,0],[1,0]]

// 输出： 1

// 解释：

// 这个最小矩形的高度和宽度都是 1，因此面积为 1 * 1 = 1。

function minimumArea(grid: number[][]): number {
  let left = 1001;
  let right = -1;
  let top = 1001;
  let bottom = -1;
  for (let i = 0; i < grid.length; i++) {
    const l = grid[i].length;
    for (let j = 0; j < l; j++) {
      // j是水平的 i是垂直的
      if (grid[i][j] === 1) {
        top = top > i ? i : top;
        bottom = bottom < i ? i : bottom;
        left = j < left ? j : left;
        right = j > right ? j : right;
      }
    }
  }
  return (bottom - top + 1) * (right - left + 1);
}
console.log(
  minimumArea([
    [1, 0, 0],
    [1, 0, 0],
    [0, 0, 0],
  ])
);

export default minimumArea;
