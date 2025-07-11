const MOD = BigInt(1e9 + 7);
const L = 26;

class Mat {
  a: bigint[][];

  constructor(copyFrom: Mat | null = null) {
    this.a = Array.from({ length: L }, () => new Array(L).fill(0n));
    if (copyFrom) {
      for (let i = 0; i < L; i++) {
        for (let j = 0; j < L; j++) {
          this.a[i][j] = copyFrom.a[i][j];
        }
      }
    }
  }

  mul(other: Mat): Mat {
    const result = new Mat();
    for (let i = 0; i < L; i++) {
      for (let j = 0; j < L; j++) {
        for (let k = 0; k < L; k++) {
          result.a[i][j] = (result.a[i][j] + this.a[i][k] * other.a[k][j]) % MOD;
        }
      }
    }
    return result;
  }
}

/* 单位矩阵 */
function I(): Mat {
  const m = new Mat();
  for (let i = 0; i < L; i++) {
    m.a[i][i] = 1n;
  }
  return m;
}

/* 矩阵快速幂 */
function quickMul(x: Mat, y: number): Mat {
  let ans = I();
  let cur = new Mat(x);
  while (y > 0) {
    if (y & 1) {
      ans = ans.mul(cur);
    }
    cur = cur.mul(cur);
    y >>= 1;
  }
  return ans;
}

function lengthAfterTransformations(s: string, t: number, nums: number[]): number {
  const T = new Mat();
  for (let i = 0; i < L; i++) {
    for (let j = 1; j <= nums[i]; j++) {
      T.a[(i + j) % L][i] = 1n;
    }
  }

  const res = quickMul(T, t);
  const f = new Array(L).fill(0n);
  for (const ch of s) {
    f[ch.charCodeAt(0) - 'a'.charCodeAt(0)] += 1n;
  }

  let ans = 0n;
  for (let i = 0; i < L; i++) {
    for (let j = 0; j < L; j++) {
      ans = (ans + res.a[i][j] * f[j]) % MOD;
    }
  }
  return Number(ans);
}

export default lengthAfterTransformations;
