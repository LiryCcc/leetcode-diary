/**
 * 118. 杨辉三角
简单
相关标签
premium lock icon
相关企业
给定一个非负整数 numRows，生成「杨辉三角」的前 numRows 行。

在「杨辉三角」中，每个数是它左上方和右上方的数的和。





示例 1:

输入: numRows = 5
输出: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
示例 2:

输入: numRows = 1
输出: [[1]]


提示:

1 <= numRows <= 30
 */

function generate(numRows: number): number[][] {
  const res: number[][] = [];
  res.push([1]);
  for (let i = 1; i < numRows; i++) {
    const prev = res[i - 1];
    const curr: number[] = [];
    for (let j = 0; j < i + 1; j++) {
      curr.push(j === 0 || j === i ? 1 : prev[j - 1] + prev[j]);
    }
    res.push(curr);
  }
  return res;
}

console.dir(JSON.stringify(generate(5)));

export default generate;
