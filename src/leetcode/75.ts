/**
 Do not return anything, modify nums in-place instead.
 */
const swap = (nums: number[], i: number, j: number) => {
  [nums[i], nums[j]] = [nums[j], nums[i]];
};

function sortColors(nums: number[]): void {
  const len = nums.length;
  let l = 0;
  let r = len - 1;
  let i = 0;
  while (i <= r) {
    if (nums[i] == 0) {
      swap(nums, l, i);
      l++;
      i++;
    } else if (nums[i] == 1) {
      i++;
    } else {
      swap(nums, i, r);
      r--;
    }
  }
}

export default sortColors;
