function differenceOfSums(n: number, m: number): number {
  return Array.from({ length: n }, (_, i) => i + 1).reduce((acc, cur) => acc + (cur % m ? cur : -cur), 0);
}

export default differenceOfSums;
