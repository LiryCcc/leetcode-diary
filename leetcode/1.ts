function twoSum(nums: number[], target: number): number[] {
  const map = new Map();
  const len = nums.length;
  for (let i = 0; i < len; i++) {
    const num = nums[i];
    const prevIndex = map.get(target - num);
    if (prevIndex !== null) {
      return [prevIndex, i];
    }
    map.set(num, i);
  }
  return [-1, -1];
}

export default twoSum;
