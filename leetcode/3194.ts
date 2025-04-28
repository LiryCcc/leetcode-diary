const minimumAverage = (nums: number[]) => {
  nums.sort((a, b) => {
    return a - b;
  });
  const ave: number[] = [];
  while (nums.length > 0) {
    ave.push((nums.pop()! + nums.shift()!) / 2);
  }
  ave.sort((a, b) => {
    return b - a;
  });

  return ave.pop();
};

export default minimumAverage;
