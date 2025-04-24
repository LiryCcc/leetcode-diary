// 抄的滑动窗口

function countCompleteSubarrays(nums: number[]): number {
  const length = nums.length;
  const differentElements = new Set(nums).size;
  const count = (left: number): number => {
    const cnt = new Map<number, number>();
    let right = left;
    while (right < length && cnt.size < differentElements) {
      const add = nums[right];
      cnt.set(add, (cnt.get(add) || 0) + 1);
      right++;
    }
    return cnt.size === differentElements ? length - right + 1 : 0;
  };

  return nums.reduce((res, _, left) => res + count(left), 0);
}

export default countCompleteSubarrays;
