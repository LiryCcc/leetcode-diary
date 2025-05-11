function threeConsecutiveOdds(arr: number[]): boolean {
  const len = arr.length;
  for (let i = 0; i < len - 2; i++) {
    if (arr[i] % 2 === 1) {
      if (arr[i] % 2 === 1 && arr[i + 1] % 2 === 1 && arr[i + 2] % 2 === 1) {
        return true;
      } else {
        i++;
      }
    }
  }
  return false;
}

export default threeConsecutiveOdds;
