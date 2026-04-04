/**
 * 给你一个 m x n 的网格图，其中 (0, 0) 是最左上角的格子，(m - 1, n - 1) 是最右下角的格子。
 * 给你一个整数数组 startPos ，startPos = [startRow, startCol] 表示 初始 有一个 机器人 在格子 (startRow, startCol) 处。
 * 同时给你一个整数数组 homePos ，homePos = [homeRow, homeCol] 表示机器人的 家 在格子 (homeRow, homeCol) 处。

机器人需要回家。每一步它可以往四个方向移动：上，下，左，右，同时机器人不能移出边界。每一步移动都有一定代价。
再给你两个下标从 0 开始的额整数数组：长度为 m 的数组 rowCosts  和长度为 n 的数组 colCosts 。

如果机器人往 上 或者往 下 移动到第 r 行 的格子，那么代价为 rowCosts[r] 。
如果机器人往 左 或者往 右 移动到第 c 列 的格子，那么代价为 colCosts[c] 。
请你返回机器人回家需要的 最小总代价 。



示例 1：



输入：startPos = [1, 0], homePos = [2, 3], rowCosts = [5, 4, 3], colCosts = [8, 2, 6, 7]
输出：18
解释：一个最优路径为：
从 (1, 0) 开始
-> 往下走到 (2, 0) 。代价为 rowCosts[2] = 3 。
-> 往右走到 (2, 1) 。代价为 colCosts[1] = 2 。
-> 往右走到 (2, 2) 。代价为 colCosts[2] = 6 。
-> 往右走到 (2, 3) 。代价为 colCosts[3] = 7 。
总代价为 3 + 2 + 6 + 7 = 18
示例 2：

输入：startPos = [0, 0], homePos = [0, 0], rowCosts = [5], colCosts = [26]
输出：0
解释：机器人已经在家了，所以不需要移动。总代价为 0 。
 */

export const minCost = (startPos: number[], homePos: number[], rowCosts: number[], colCosts: number[]): number => {
  const [row1, col1] = startPos;
  const [row2, col2] = homePos;
  const { abs } = Math;

  /**
   * 所有行的i及对应的代价
   * length是步数
   */
  const rowSum = Array.from<number, number>({ length: abs(row2 - row1) }, (_, i) =>
    row2 >= row1 ? row1 + 1 + i : row2 + i
  ).reduce((sum, i) => sum + rowCosts[i], 0);

  const colSum = Array.from<number, number>({ length: abs(col2 - col1) }, (_, i) =>
    col2 >= col1 ? col1 + 1 + i : col2 + i
  ).reduce((sum, i) => sum + colCosts[i], 0);

  return rowSum + colSum;
};

console.log(minCost([1, 0], [2, 3], [5, 4, 3], [8, 2, 6, 7]) === 18);
console.log(minCost([0, 0], [0, 0], [5], [26]) === 0);
