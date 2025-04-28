/**
 * leetcode 3192
 * 反转的话代表1变0, 0变1
 * numOp代表反转次数
 * 如果是偶数等同于未反转
 * 奇数为已翻转
 */
const minOperations = (nums: number[]) => {
  const len = nums.length;
  let numOp = 0;
  for (let i = 0; i < len; i++) {
    if (nums[i]) {
      // 不需要变，从后面开始变
      if (numOp % 2 === 0) {
        continue;
      } else {
        numOp++;
      }
    } else {
      // 该位置为0，需要变
      if (numOp % 2 === 0) {
        numOp++;
      } else {
        continue;
      }
    }
  }
  return numOp;
};

export default minOperations;
