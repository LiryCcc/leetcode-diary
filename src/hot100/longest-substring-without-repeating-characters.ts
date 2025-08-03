function lengthOfLongestSubstring(s: string): number {
  let max = 0;
  for (let i = 0; i < s.length; i++) {
    const m: Record<string, number> = {};
    let _max = 0;
    for (let j = i; j < s.length; j++) {
      if (m[s[j]]) {
        //
        break;
      } else {
        m[s[j]] = 1;
        _max++;
      }
    }
    max = Math.max(max, _max);
  }
  return max;
}

export default lengthOfLongestSubstring;
