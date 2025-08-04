/**
 Do not return anything, modify nums in-place instead.
 */
function moveZeroes(nums: number[]): void {
  let zeroNum = 0;
  let i = 0;
  while (i < nums.length) {
    if (nums[i] === 0) {
      nums.splice(i, 1);
      zeroNum++;
    } else {
      i++;
    }
  }
  for (let i = 0; i < zeroNum; i++) {
    nums.push(0);
  }
}

export default moveZeroes;
