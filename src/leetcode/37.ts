function solveSudoku(board: string[][]): void {
  const rows: number[] = new Array(9).fill(0); // 保存每一行已填写的数字
  const cols: number[] = new Array(9).fill(0); // 保存每一列已填写的数字
  const blocks: number[][] = new Array(3).fill(0).map(() => new Array(3).fill(0)); // 保存每一个3*3宫已填写的数字
  const spaces: number[][] = []; // 保存所有空格位置
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === '.') {
        spaces.push([i, j]);
        continue;
      }
      const digit = Number(board[i][j]) - 1;
      rows[i] |= 1 << digit;
      cols[j] |= 1 << digit;
      blocks[Math.floor(i / 3)][Math.floor(j / 3)] |= 1 << digit;
    }
  }

  const backtrack = (index: number): boolean => {
    if (index === spaces.length) {
      return true;
    }
    const [i, j] = spaces[index];
    for (let digit = 1; digit <= 9; digit++) {
      const digitStr = String(digit);
      const digitBinary = 1 << (digit - 1);
      if (((rows[i] | cols[j] | blocks[Math.floor(i / 3)][Math.floor(j / 3)]) & digitBinary) === 0) {
        rows[i] ^= digitBinary;
        cols[j] ^= digitBinary;
        blocks[Math.floor(i / 3)][Math.floor(j / 3)] ^= digitBinary;
        board[i][j] = digitStr;
        if (backtrack(index + 1)) {
          return true;
        }
        rows[i] ^= digitBinary;
        cols[j] ^= digitBinary;
        blocks[Math.floor(i / 3)][Math.floor(j / 3)] ^= digitBinary;
      }
    }
    return false;
  };

  backtrack(0);
}

export default solveSudoku;
