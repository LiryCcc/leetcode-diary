/**
 * @param {number[]} n
 * @param {number} k
 * @return {number}
 */

const minimumDifference = (n, k) => {
  const l = n.length;
  const bmp = new Array(31).fill(-1);
  let r = Number.MAX_SAFE_INTEGER;

  for (let i = 0; i < l; i++) {
    for (let j = 0; j <= 30; j++) {
      if ((n[i] >> j) & 1) {
        bmp[j] = i;
      }
    }

    const ptb = [];
    for (let j = 0; j <= 30; j++) {
      if (bmp[j] !== -1) {
        ptb.push([bmp[j], j]);
      }
    }

    ptb.sort((a, b) => b[0] - a[0]);
    let val = 0;
    for (let j = 0, p = 0; j < ptb.length; p = j) {
      while (j < ptb.length && ptb[j][0] === ptb[p][0]) {
        val |= 1 << ptb[j][1];
        j++;
      }
      r = Math.min(r, Math.abs(val - k));
    }
  }
  return r;
};

export default minimumDifference;
