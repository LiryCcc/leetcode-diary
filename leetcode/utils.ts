function generateRandomArray(length: number, min: number, max: number) {
  const result = [];
  for (let i = 0; i < length; i++) {
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    result.push(randomNum);
  }
  return result;
}

export { generateRandomArray };
