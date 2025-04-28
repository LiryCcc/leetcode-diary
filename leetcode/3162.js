/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number}
 */
const numberOfPairs = (nums1, nums2, k) => {
  let n = 0;
  for (const i of nums1) {
    for (const j of nums2) {
      if (i % (j * k) === 0) {
        n++;
      }
    }
  }
  return n;
};

export default numberOfPairs;
