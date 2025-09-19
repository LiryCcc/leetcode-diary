function getNoZeroIntegers(n: number): [number, number] {
  const res: ReturnType<typeof getNoZeroIntegers> = [1, n - 1];
  while (res[0].toString().includes('0') || res[1].toString().includes('0')) {
    res[0]++;
    res[1]--;
  }
  return res;
}

export default getNoZeroIntegers;
