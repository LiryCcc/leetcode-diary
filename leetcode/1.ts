function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();
  const len = nums.length;
  for (let i = 0; i < len; i++) {
    if (map.has(target - nums[i])) {
      return [map.get(target - nums[i])!, i];
    } else {
      map.set(nums[i], i);
    }
  }
  return [114514, 1919810];
}

export default twoSum;
