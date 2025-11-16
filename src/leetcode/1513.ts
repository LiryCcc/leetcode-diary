export const numSub = (s: string): number => {
  const MOD = 1e9 + 7;

  return s
    .replaceAll(/0+/g, ' ')
    .split(' ')
    .map((_) => _.length)
    .map((l) => (l * (l + 1)) / 2)
    .reduce((prev, curr) => {
      return (prev + curr) % MOD;
    }, 0);
};
