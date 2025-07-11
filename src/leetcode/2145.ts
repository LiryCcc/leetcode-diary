/**
 * @author: Liry
 * @description: 2145 统计隐藏数组数目 2025-04-21 每日一题
 * 给你一个下标从 0 开始且长度为 n 的整数数组 differences
 * 它表示一个长度为 n + 1 的 隐藏 数组 相邻 元素之间的 差值
 * 更正式的表述为：我们将隐藏数组记作 hidden ，那么 differences[i] = hidden[i + 1] - hidden[i] 。
 * 同时给你两个整数 lower 和 upper ，它们表示隐藏数组中所有数字的值都在 闭 区间 [lower, upper] 之间。
 * 比方说，differences = [1, -3, 4] ，lower = 1 ，upper = 6 ，
 * 那么隐藏数组是一个长度为 4 且所有值都在 1 和 6 （包含两者）之间的数组。
 * [3, 4, 1, 5] 和 [4, 5, 2, 6] 都是符合要求的隐藏数组。
 * [5, 6, 3, 7] 不符合要求，因为它包含大于 6 的元素。
 * [1, 2, 3, 4] 不符合要求，因为相邻元素的差值不符合给定数据。
 * 请你返回 符合 要求的隐藏数组的数目。如果没有符合要求的隐藏数组，请返回 0 。
 */

function numberOfArrays(differences: number[], lower: number, upper: number): number {
  let max = 0;
  let min = 0;
  let cur = 0;
  // 把数遍历一边计算出隐藏数组的极值
  // 这样的话空间复杂度是O(n)，不需要求出完整的隐藏数组
  for (const i of differences) {
    cur += i;
    max = Math.max(max, cur);
    min = Math.min(min, cur);
  }
  // max - min就是极值之差
  // 实际上就是确保这个隐藏数组的上界<=upper, 下界>=lower
  // 假如上界为6，下界为0，假设极值的差为1，
  // 就是有一个长度为1的游标在[0, 6]之间
  // 则可以有  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]; 这6个隐藏数组则为upper - lower + 1 - (max - min);

  return upper - lower + 1 - (max - min) > 0 ? upper - lower + 1 - (max - min) : 0;
}

export default numberOfArrays;
