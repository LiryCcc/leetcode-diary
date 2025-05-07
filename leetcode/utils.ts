function generateRandomArray(length: number, min: number, max: number) {
  const result = [];
  for (let i = 0; i < length; i++) {
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    result.push(randomNum);
  }
  return result;
}

function generateRandom2DArray(n: number, m: number, min: number, max: number): number[][] {
  if (min > max) {
    throw new Error('最小值不能大于最大值');
  }

  const array: number[][] = [];
  for (let i = 0; i < n; i++) {
    const row: number[] = [];
    for (let j = 0; j < m; j++) {
      row.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    array.push(row);
  }
  return array;
}

export { generateRandom2DArray, generateRandomArray };
