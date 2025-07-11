function colorTheGrid(m: number, n: number): number {
  const mod = 1000000007;
  const valid = new Map<number, number[]>();

  const maskEnd = Math.pow(3, m);
  for (let mask = 0; mask < maskEnd; ++mask) {
    const color: number[] = [];
    let mm = mask;
    for (let i = 0; i < m; ++i) {
      color.push(mm % 3);
      mm = Math.floor(mm / 3);
    }
    let check = true;
    for (let i = 0; i < m - 1; ++i) {
      if (color[i] === color[i + 1]) {
        check = false;
        break;
      }
    }
    if (check) {
      valid.set(mask, color);
    }
  }

  const adjacent = new Map<number, number[]>();
  for (const [mask1, color1] of valid.entries()) {
    for (const [mask2, color2] of valid.entries()) {
      let check = true;
      for (let i = 0; i < m; ++i) {
        if (color1[i] === color2[i]) {
          check = false;
          break;
        }
      }
      if (check) {
        if (!adjacent.has(mask1)) {
          adjacent.set(mask1, []);
        }
        adjacent.get(mask1)!.push(mask2);
      }
    }
  }

  let f = new Map<number, number>();
  for (const [mask, _] of valid.entries()) {
    f.set(mask, 1);
  }
  for (let i = 1; i < n; ++i) {
    const g = new Map<number, number>();
    for (const [mask2, _] of valid.entries()) {
      for (const mask1 of adjacent.get(mask2) || []) {
        g.set(mask2, ((g.get(mask2) || 0) + f.get(mask1)!) % mod);
      }
    }
    f = g;
  }

  let ans = 0;
  for (const num of f.values()) {
    ans = (ans + num) % mod;
  }
  return ans;
}

export default colorTheGrid;
