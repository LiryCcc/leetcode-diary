const quickSort = <T>(arr: T[]): T[] => {
  if (arr.length <= 1) {
    return arr;
  }
  const pivotIndex = Math.floor(Math.random() * arr.length);
  const pivot = arr[pivotIndex];
  const left: T[] = [];
  const right: T[] = [];
  arr.forEach((v, k) => {
    if (k === pivotIndex) {
      //
    } else if (v < pivot) {
      left.push(v);
    } else {
      right.push(v);
    }
  });
  return [...quickSort(left), pivot, ...quickSort(right)];
};

console.log(quickSort([3, 2, 94321, 543, 532, 31246, 1432, 123, 2313, 3213, 1321, 3143]));

export default quickSort;
