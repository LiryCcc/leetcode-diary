// 抄的
const countSubArrays = (nums: number[], minK: number, maxK: number): number => {
  let res = 0; // 初始化结果变量，用于存储满足条件的子数组数量
  let border = -1,
    last_min = -1,
    last_max = -1; // 初始化三个指针：border表示最近一次遇到不符合条件的元素的位置，last_min和last_max分别表示最近一次出现minK和maxK的位置
  for (let i = 0; i < nums.length; i++) {
    // 遍历数组nums的每个元素
    if (nums[i] < minK || nums[i] > maxK) {
      // 如果当前元素超出[minK, maxK]范围
      last_max = -1; // 重置last_max
      last_min = -1; // 重置last_min
      border = i; // 更新border为当前位置，表示此位置及之前的内容需要重新考虑
    }
    if (nums[i] === minK) {
      // 如果当前元素等于minK
      last_min = i; // 更新last_min为当前位置
    }
    if (nums[i] === maxK) {
      // 如果当前元素等于maxK
      last_max = i; // 更新last_max为当前位置
    }
    if (last_min !== -1 && last_max !== -1) {
      // 如果last_min和last_max都不为-1，说明找到了包含minK和maxK的子数组
      res += Math.min(last_min, last_max) - border; // 计算以当前位置结尾的满足条件的子数组数量并累加到结果中。Math.min(last_min, last_max)取last_min和last_max中较小的位置，减去border表示从border之后开始计算有效的子数组起点
    }
  }
  return res; // 返回结果
};

export default countSubArrays;
