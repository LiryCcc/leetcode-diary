function idealArrays(n: number, maxValue: number): number {
  const MOD = 1e9 + 7;
  const MAX_N = 10010;
  const MAX_P = 15;
  // 组合数表
  const c: number[][] = Array.from({ length: MAX_N + MAX_P }, () => Array(MAX_P + 1).fill(0));
  c[0][0] = 1;
  for (let i = 1; i < MAX_N + MAX_P; i++) {
    c[i][0] = 1;
    for (let j = 1; j <= Math.min(i, MAX_P); j++) {
      c[i][j] = (c[i - 1][j] + c[i - 1][j - 1]) % MOD;
    }
  }

  const sieve: number[] = Array(MAX_N).fill(0);
  const ps: number[][] = Array.from({ length: MAX_N }, () => []);

  for (let i = 2; i < MAX_N; i++) {
    if (sieve[i] === 0) {
      for (let j = i; j < MAX_N; j += i) {
        if (sieve[j] === 0) {
          sieve[j] = i;
        }
      }
    }
  }

  for (let i = 2; i < MAX_N; i++) {
    let x = i;
    while (x > 1) {
      const p = sieve[x];
      let cnt = 0;
      while (x % p === 0) {
        x = Math.floor(x / p);
        cnt++;
      }
      ps[i].push(cnt);
    }
  }

  // 计算理想数组的数目
  let ans = 0;
  for (let x = 1; x <= maxValue; x++) {
    // 此处不用bigint就溢出，傻逼hard题不做人
    let mul = 1n;

    for (const p of ps[x]) {
      mul = (mul * BigInt(c[n + p - 1][p])) % BigInt(MOD);
    }
    ans = parseInt(((BigInt(ans) + mul) % BigInt(MOD)).toString());
  }
  return ans;
}

export default idealArrays;
