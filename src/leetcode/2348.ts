/**
 * 需要找到每个连续含0的子数组
 * 然后获得每个块中有几个子数组，然后加起来
 */

function zeroFilledSubarray(nums: number[]): number {
  const lens: number[] = [];
  let i = 0;
  for (const num of nums) {
    if (num === 0) {
      if (lens[i]) {
        lens[i]++;
      } else {
        lens[i] = 1;
      }
    } else {
      i++;
    }
  }
  return (
    lens
      // .map((v) => {
      //   return (v * (v + 1)) / 2;
      // })
      .reduce((p, c) => {
        // return p + c;
        return p + (c * (c + 1)) / 2;
      }, 0)
  );
}

console.log(zeroFilledSubarray([0, 0, 0, 1, 0, 0]));

export default zeroFilledSubarray;
