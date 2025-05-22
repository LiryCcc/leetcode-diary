function minZeroArray(nums: number[], queries: number[][]): number {
  const len = nums.length;
  const delta: number[] = new Array(len + 1).fill(0);
  let op = 0;
  let res = 0;
  for (let i = 0; i < len; i++) {
    const num = nums[i];
    op += delta[i];
    while (res < queries.length && op < num) {
      const [left, right, value] = queries[res];
      delta[left] += value;
      delta[right + 1] -= value;
      if (left <= i && i <= right) {
        op += value;
      }
      res++;
    }
    if (op < num) {
      return -1;
    }
  }
  return res;
}

export default minZeroArray;
