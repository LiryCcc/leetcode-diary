export const maximumElementAfterDecrementingAndRearranging = (arr: number[]): number => {
  const sorted = [...arr].sort((a, b) => a - b);
  const len = sorted.length;
  sorted[0] = 1;
  // 从 i=1 开始遍历，跳过第0位
  for (let i = 1; i < len; i++) {
    sorted[i] = Math.min(sorted[i], sorted[i - 1] + 1);
  }
  return sorted.at(-1)!;
};
