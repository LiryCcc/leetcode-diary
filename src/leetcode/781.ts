/**
 * @author: liry
 * @desc: 2025-04-20的每日一题
 *
 * 森林中有未知数量的兔子。提问其中若干只兔子 "还有多少只兔子与你（指被提问的兔子）颜色相同?"
 * 将答案收集到一个整数数组 answers 中
 * 其中 answers[i] 是第 i 只兔子的回答。
 */

function numRabbits(answers: number[]): number {
  const count: Record<number, number> = {};
  for (const answer of answers) {
    if (count[answer] === undefined) {
      count[answer] = 1;
    } else {
      count[answer]++;
    }
  }

  return Object.entries(count)
    .map(([k, v]) => {
      const num = parseInt(k);
      const group = v;
      return Math.ceil(group / (num + 1)) * (num + 1);
    })
    .reduce((a, b) => a + b, 0);
}

export default numRabbits;
