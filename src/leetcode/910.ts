const smallestRangeII = (nums: number[], k: number) => {
  nums.sort((a, b) => a - b);
  const min = nums[0];
  const max = nums[nums.length - 1];
  let res = max - min;
  for (let i = 0; i < nums.length - 1; i++) {
    const a = nums[i];
    const b = nums[i + 1];
    res = Math.min(res, Math.max(max - k, a + k) - Math.min(min + k, b - k));
  }
  return res;
};

export default smallestRangeII;
