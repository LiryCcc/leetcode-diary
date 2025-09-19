function trap(height: number[]): number {
  let res = 0;
  const stack: number[] = [];
  const len = height.length;
  for (let i = 0; i < len; i++) {
    while (stack.length > 0 && height[i] > height[stack[stack.length - 1]]) {
      const top = stack.pop()!;
      if (!stack.length) {
        break;
      }
      const left = stack[stack.length - 1];
      const w = i - left - 1;
      const h = Math.min(height[left], height[i]) - height[top];
      res += w * h;
    }
    stack.push(i);
  }
  return res;
}

const case1 = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
const res1 = 6;
const case2 = [4, 2, 0, 3, 2, 5];
const res2 = 9;
console.log(trap(case1) === res1);
console.log(trap(case2) === res2);
