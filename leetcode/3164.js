const numberOfPairs = (nums1, nums2, k) => {
  const c1 = {};
  const c2 = {};
  let r = 0,
    m = 0;
  for (let num of nums1) {
    c1[num] = (c1[num] || 0) + 1;
    m = Math.max(m, num);
  }
  for (let num of nums2) {
    c2[num] = (c2[num] || 0) + 1;
  }
  for (let a in c2) {
    let cnt = c2[a];
    for (let b = a * k; b <= m; b += a * k) {
      if (b in c1) {
        r += c1[b] * cnt;
      }
    }
  }
  return r;
};

export default numberOfPairs;
