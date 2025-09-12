/**
 * 1792. 最大平均通过率
中等
相关标签
premium lock icon
相关企业
提示
一所学校里有一些班级，每个班级里有一些学生，现在每个班都会进行一场期末考试。给你一个二维数组 classes ，其中 classes[i] = [pass i, total i] ，表示你提前知道了第 i 个班级总共有 total i 个学生，其中只有 pass i 个学生可以通过考试。

给你一个整数 extraStudents ，表示额外有 extraStudents 个聪明的学生，他们 一定 能通过任何班级的期末考。你需要给这 extraStudents 个学生每人都安排一个班级，使得 所有 班级的 平均 通过率 最大 。

一个班级的 通过率 等于这个班级通过考试的学生人数除以这个班级的总人数。平均通过率 是所有班级的通过率之和除以班级数目。

请你返回在安排这 extraStudents 个学生去对应班级后的 最大 平均通过率。与标准答案误差范围在 10-5 以内的结果都会视为正确结果。



示例 1：

输入：classes = [[1,2],[3,5],[2,2]], extraStudents = 2
输出：0.78333
解释：你可以将额外的两个学生都安排到第一个班级，平均通过率为 (3/4 + 3/5 + 2/2) / 3 = 0.78333 。
示例 2：

输入：classes = [[2,4],[3,9],[4,5],[2,10]], extraStudents = 4
输出：0.53485


提示：

1 <= classes.length <= 105
classes[i].length == 2
1 <= pass i <= total i <= 105
1 <= extraStudents <= 105
 */

import { PriorityQueue } from 'datastructures-js';

function maxAverageRatio(classes: number[][], extraStudents: number): number {
  const pq = new PriorityQueue<number[]>((a, b) => {
    const val1 = (b[1] + 1) * b[1] * (a[1] - a[0]);
    const val2 = (a[1] + 1) * a[1] * (b[1] - b[0]);
    return val1 < val2 ? 1 : -1;
  });

  for (const c of classes) {
    pq.enqueue([c[0], c[1]]);
  }

  for (let i = 0; i < extraStudents; i++) {
    const arr = pq.dequeue();
    const pass = arr![0],
      total = arr![1];
    pq.enqueue([pass + 1, total + 1]);
  }

  let res = 0;
  const count = classes.length;
  while (!pq.isEmpty()) {
    const arr = pq.dequeue();
    const pass = arr![0],
      total = arr![1];
    res += pass / total;
  }
  return res / count;
}

const case1 = [
  [
    [1, 2],
    [3, 5],
    [2, 2]
  ],
  2,
  0.78333
];

const case2 = [
  [
    [2, 4],
    [3, 9],
    [4, 5],
    [2, 10]
  ],
  4,
  0.53485
];

console.log(maxAverageRatio(case1[0] as number[][], case1[1] as number) === case1[2]);
console.log(maxAverageRatio(case2[0] as number[][], case2[1] as number) === case2[2]);

// await new Promise((resolve) => setTimeout(resolve, 100000));
