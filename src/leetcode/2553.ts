/**
 * 123分为[1, 2, 3]
 */
const split = (x: number): number[] => (x === 0 ? [] : [...split(Math.floor(x / 10)), x % 10]);
const s = (num: number): number[] => {
  const n = Math.abs(num);
  return n === 0 ? [0] : split(n);
};
const separateDigits = (nums: number[]): number[] => {
  return nums.map((n) => s(n)).flat(2);
};

export default separateDigits;
