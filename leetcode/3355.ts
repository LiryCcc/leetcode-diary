function isZeroArray(nums: number[], queries: number[][]): boolean {
  const d = Array(nums.length + 1).fill(0);
  for (const [i, j] of queries) {
    d[i]++;
    d[j + 1]--;
  }
  const count: number[] = [];
  let current = 0;
  for (const delta of d) {
    current += delta;
    count.push(current);
  }
  const len = nums.length;
  for (let i = 0; i < len; i++) {
    if (count[i] < nums[i]) {
      return false;
    }
  }
  return true;
}

export default isZeroArray;
