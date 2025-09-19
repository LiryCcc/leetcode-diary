function sumZero(_n: number): number[] {
  const n = Math.floor(_n / 2);
  const res: number[] = _n % 2 ? [0] : [];
  for (let i = 1; i <= n; i++) {
    res.push(i);
    res.push(-i);
  }
  return res;
}

export default sumZero;
