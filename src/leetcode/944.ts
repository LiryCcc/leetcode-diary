const minDeletionSize = (strings: string[]): number => {
  const row = strings.length;
  const col = strings[0].length;
  let ans = 0;
  for (let i = 0; i < col; i++) {
    for (let j = 1; j < row; j++) {
      if (strings[j - 1][i] > strings[j][i]) {
        ans++;
        break;
      }
    }
  }
  return ans;
};

export default minDeletionSize;
