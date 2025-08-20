// 实现一个简单的map

const map = <T, U>(arr: T[], cb: (item: T, index: number, array: T[]) => U): U[] => {
  const res: U[] = [];
  for (let i = 0; i < arr.length; i++) {
    res.push(cb(arr[i], i, arr));
  }
  return res;
};

export { map };
