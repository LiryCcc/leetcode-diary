export function largestTriangleArea(points: [number, number][]): number {
  const area = (s: [[number, number], [number, number], [number, number]]) => {
    const [[x1, y1], [x2, y2], [x3, y3]] = s;
    return 0.5 * Math.abs(x1 * y2 + x2 * y3 + x3 * y1 - x1 * y3 - x2 * y1 - x3 * y2);
  };
  const n = points.length;
  let res = 0;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      for (let k = j + 1; k < n; k++) {
        res = Math.max(res, area([points[i], points[j], points[k]]));
      }
    }
  }
  return res;
}

console.log(
  largestTriangleArea([
    [0, 0],
    [0, 1],
    [1, 0],
    [0, 2],
    [2, 0]
  ])
); // 2

console.log(
  largestTriangleArea([
    [1, 0],
    [0, 0],
    [0, 1]
  ])
); // 0.5
