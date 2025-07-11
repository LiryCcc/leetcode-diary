function countBalancedPermutations(num: string): number {
  const MOD = BigInt(1e9 + 7);
  let tot = 0;
  const n = num.length;
  const cnt: number[] = new Array(10).fill(0);
  for (const ch of num) {
    const d = parseInt(ch);
    cnt[d]++;
    tot += d;
  }
  if (tot % 2 !== 0) {
    return 0;
  }

  const target = Math.floor(tot / 2);
  const maxOdd = Math.floor((n + 1) / 2);

  /* 预计算组合数 */
  const comb: bigint[][] = new Array(maxOdd + 1);
  for (let i = 0; i <= maxOdd; i++) {
    comb[i] = new Array(maxOdd + 1).fill(0n);
    comb[i][i] = comb[i][0] = 1n;
    for (let j = 1; j < i; j++) {
      comb[i][j] = (comb[i - 1][j] + comb[i - 1][j - 1]) % MOD;
    }
  }

  const psum: number[] = new Array(11).fill(0);
  for (let i = 9; i >= 0; i--) {
    psum[i] = psum[i + 1] + cnt[i];
  }
  const memo: bigint[][][] = new Array(10);
  for (let i = 0; i < 10; i++) {
    memo[i] = new Array(target + 1);
    for (let j = 0; j <= target; j++) {
      memo[i][j] = new Array(maxOdd + 1).fill(-1n);
    }
  }

  const dfs = (pos: number, curr: number, oddCnt: number): bigint => {
    /* 如果剩余位置无法合法填充，或者当前奇数位置元素和大于目标值 */
    if (oddCnt < 0 || psum[pos] < oddCnt || curr > target) {
      return 0n;
    }
    if (pos > 9) {
      return curr === target && oddCnt === 0 ? 1n : 0n;
    }
    if (memo[pos][curr][oddCnt] !== -1n) {
      return memo[pos][curr][oddCnt];
    }

    /* 偶数位剩余需要填充的位数 */
    const evenCnt = psum[pos] - oddCnt;
    let res = 0n;
    const start = Math.max(0, cnt[pos] - evenCnt);
    const end = Math.min(cnt[pos], oddCnt);
    for (let i = start; i <= end; i++) {
      /* 当前数字在奇数位填充 i 位，偶数位填充 cnt[pos] - i 位 */
      const ways = (comb[oddCnt][i] * comb[evenCnt][cnt[pos] - i]) % MOD;
      res = (res + ((ways * dfs(pos + 1, curr + i * pos, oddCnt - i)) % MOD)) % MOD;
    }
    memo[pos][curr][oddCnt] = res;
    return res;
  };

  return Number(dfs(0, 0, maxOdd));
}

export default countBalancedPermutations;
