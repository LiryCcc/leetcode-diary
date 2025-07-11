/**
 * 1. 只要都有0，那就可以
 */

function minSum(nums1: number[], nums2: number[]): number {
  const zeros = [nums1.filter((n) => n === 0).length, nums2.filter((n) => n === 0).length];
  const sum = [nums1.reduce((a, b) => a + b, 0), nums2.reduce((a, b) => a + b, 0)];
  const min = [sum[0] + zeros[0], sum[1] + zeros[1]];
  // 只要都有0，那就可以
  if (zeros[0] !== 0 && zeros[1] !== 0) {
    return Math.max(sum[0] + zeros[0], sum[1] + zeros[1]);
  }
  // 都没0，且不相等，gg
  if (sum[0] !== sum[1] && zeros[0] === 0 && zeros[1] === 0) {
    return -1;
  }
  // 只有一个有0
  // 那就有0的min[没0的]>=min[有0的]
  if (zeros[0] !== 0) {
    return min[0] <= min[1] ? min[1] : -1;
  } else {
    return min[1] <= min[0] ? min[0] : -1;
  }
}

export default minSum;
