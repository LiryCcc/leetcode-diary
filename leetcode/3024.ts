function triangleType(nums: number[]): string {
  if (!(nums[0] + nums[1] > nums[2] && nums[0] + nums[2] > nums[1] && nums[1] + nums[2] > nums[0])) {
    return 'none';
  }
  if (nums[0] === nums[1] && nums[2] === nums[1]) {
    return 'equilateral';
  }
  if (nums[0] === nums[1] || nums[1] === nums[2] || nums[0] === nums[2]) {
    return 'isosceles';
  }
  return 'scalene';
}

export default triangleType;
