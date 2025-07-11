function findLucky(arr: number[]): number {
  const a: number[] = [];
  for (const i of arr) {
    if (a[i]) {
      a[i] = a[i] + 1;
    } else {
      a[i] = 1;
    }
  }
  // 只需要最大的幸运数
  const res: number[] = [];
  a.forEach((v, k) => {
    if (v === k) {
      res.push(k);
    }
  });
  if (res.length === 0) {
    return -1;
  } else {
    return res.sort((a, b) => b - a)[0];
  }
}

export default findLucky;
