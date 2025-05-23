function maximumValueSum(nums: number[], k: number, _edges: number[][]): number {
  let result = nums.reduce((a, b) => a + b, 0);
  // ^ 异或
  const diff = nums.map((x) => (x ^ k) - x);
  diff.sort((a, b) => {
    return a - b;
  });
  const diffLength = diff.length;
  for (let i = diffLength - 1; i > 0 && diff[i] + diff[i - 1] >= 0; i -= 2) {
    result += diff[i];
    result += diff[i - 1];
  }
  return result;
}

export default maximumValueSum;
