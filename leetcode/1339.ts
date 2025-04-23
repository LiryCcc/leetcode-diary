function countLargestGroup(n: number): number {
  const map = new Map<number, number[]>();
  for (let i = 1; i <= n; i++) {
    let sum = 0;
    i.toString()
      .split('')
      .forEach((num) => {
        sum += parseInt(num);
      });
    if (map.has(sum)) {
      map.get(sum)?.push(i);
    } else {
      map.set(sum, [i]);
    }
  }
  let max = 0;
  let maxNum = 0;
  // 此处得到了每个总和一样的数组
  // 现在看最长的是什么
  for (const [_key, value] of map) {
    if (value.length === max) {
      maxNum += 1;
    } else if (value.length > max) {
      maxNum = 1;
      max = value.length;
    }
    // max = Math.max(max, value.length);
  }
  return maxNum;
}

export default countLargestGroup;
