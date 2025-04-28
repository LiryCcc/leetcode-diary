const shoppingOffers = (p: number[], s: number[][], ns: number[]) => {
  const memo = new Map<string, number>();

  // 记忆化搜索计算满足购物清单所需花费的最低价格
  const dfs = (pr: number[], sp: number[][], cuN: number[], fSp: number[][], n: number): number => {
    const key = cuN.join(',');
    if (!memo.has(key)) {
      let mP = 0;
      for (let i = 0; i < n; ++i) {
        mP += cuN[i] * pr[i]; // 不购买任何大礼包，原价购买购物清单中的所有物品
      }
      for (const cuP of fSp) {
        const spP = cuP[n];
        const nN: number[] = []; // 显式声明 nxtNeeds 的类型为 number[]
        for (let i = 0; i < n; ++i) {
          if (cuP[i] > cuN[i]) {
            // 不能购买超出购物清单指定数量的物品
            break;
          }
          nN.push(cuN[i] - cuP[i]);
        }
        if (nN.length === n) {
          // 大礼包可以购买
          mP = Math.min(mP, dfs(pr, sp, nN, fSp, n) + spP);
        }
      }
      memo.set(key, mP);
    }
    return memo.get(key)!;
  };

  const n = p.length;

  // 过滤不需要计算的大礼包，只保留需要计算的大礼包
  const fSp: number[][] = [];
  for (const sp of s) {
    let tC = 0,
      tP = 0;
    for (let i = 0; i < n; ++i) {
      tC += sp[i];
      tP += sp[i] * p[i];
    }
    if (tC > 0 && tP > sp[n]) {
      fSp.push(sp);
    }
  }

  return dfs(p, s, ns, fSp, n);
};

export default shoppingOffers;
