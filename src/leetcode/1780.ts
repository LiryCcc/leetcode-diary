function checkPowersOfThree(n: number): boolean {
  //将n转换为三进制，如果每一位都不是2，那就是true
  while (n !== 0) {
    if (n % 3 === 2) {
      return false;
    }
    n = Math.floor(n / 3);
  }
  return true;
}

export default checkPowersOfThree;
