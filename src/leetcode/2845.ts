// 抄的leetcode题解
function countInterestingSubarrays(nums: number[], modulo: number, k: number): number {
  const p = nums.map((item) => (item % modulo === k ? 1 : 0));
  const preSum: number[] = [0];
  let sum = 0;
  for (const item of p) {
    sum += item;
    preSum.push(sum);
  }

  const freq: { [key: number]: number } = {};
  let ans = 0;

  for (let i = 0; i < preSum.length; i++) {
    const target = (preSum[i] - k + modulo) % modulo; // 计算目标余数
    ans += freq[target] || 0; // 如果目标余数存在，累加其出现次数
    freq[preSum[i] % modulo] = (freq[preSum[i] % modulo] || 0) + 1; // 更新当前余数的出现次数
  }

  return ans;
}

export default countInterestingSubarrays;
