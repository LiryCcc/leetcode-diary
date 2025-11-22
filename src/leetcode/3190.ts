export function minimumOperations(nums: number[]): number {
  return nums.filter((v) => v % 3).length;
}
