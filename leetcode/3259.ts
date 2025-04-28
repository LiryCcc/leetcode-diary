const maxEnergyBoost = (a: number[], b: number[]) => {
  const n = a.length;
  const d: number[][] = Array.from({ length: n + 1 }, () => [0, 0]);
  for (let i = 1; i <= n; i++) {
    d[i][0] = d[i - 1][0] + a[i - 1];
    d[i][1] = d[i - 1][1] + b[i - 1];
    if (i >= 2) {
      d[i][0] = Math.max(d[i][0], d[i - 2][1] + a[i - 1]);
      d[i][1] = Math.max(d[i][1], d[i - 2][0] + b[i - 1]);
    }
  }
  return Math.max(d[n][0], d[n][1]);
};

export default maxEnergyBoost;
