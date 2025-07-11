function getLongestSubsequence(words: string[], groups: number[]): string[] {
  const res: string[] = [];
  const len = words.length;

  for (let i = 0; i < len; i++) {
    if (i === 0 || groups[i] !== groups[i - 1]) {
      res.push(words[i]);
    }
  }
  return res;
}

export default getLongestSubsequence;
