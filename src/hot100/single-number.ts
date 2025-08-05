const singleNumber = (nums: number[]): number => nums.reduce((acc, cur) => acc ^ cur, 0);

export default singleNumber;
