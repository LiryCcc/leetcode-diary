/**
 15. 三数之和
中等
相关标签
premium lock icon
相关企业
提示
给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。请你返回所有和为 0 且不重复的三元组。

注意：答案中不可以包含重复的三元组。





示例 1：

输入：nums = [-1,0,1,2,-1,-4]
输出：[[-1,-1,2],[-1,0,1]]
解释：
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0 。
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0 。
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0 。
不同的三元组是 [-1,0,1] 和 [-1,-1,2] 。
注意，输出的顺序和三元组的顺序并不重要。
示例 2：

输入：nums = [0,1,1]
输出：[]
解释：唯一可能的三元组和不为 0 。
示例 3：

输入：nums = [0,0,0]
输出：[[0,0,0]]
解释：唯一可能的三元组和为 0 。


提示：

3 <= nums.length <= 3000
-105 <= nums[i] <= 105
 */

function threeSum(_nums: [number, ...number[]]): [number, number, number][] {
  //
  const nums = _nums.sort((a, b) => a - b);
  const res: ReturnType<typeof threeSum> = [];
  const len = nums.length;
  for (let i = 0; i < len - 2; i++) {
    if (nums[i] === nums[i - 1]) {
      continue;
    } else {
      let [l, r] = [i + 1, len - 1];
      while (l < r) {
        const total = nums[i] + nums[l] + nums[r];
        if (total === 0) {
          res.push([nums[i], nums[l], nums[r]]);
          while (l < r && nums[l] === nums[l + 1]) {
            l++;
          }
          while (l < r && nums[r] === nums[r - 1]) {
            r--;
          }
          l++;
          r--;
        } else if (total < 0) {
          l++;
        } else {
          r--;
        }
      }
    }
  }
  return res;
}

console.log(JSON.stringify(threeSum([-1, 0, 1, 2, -1, -4]))); // [[-1,-1,2],[-1,0,1]]
console.log(JSON.stringify(threeSum([0, 1, 1]))); // []
console.log(JSON.stringify([0, 0, 0])); // [[0,0,0]]

export default threeSum;
