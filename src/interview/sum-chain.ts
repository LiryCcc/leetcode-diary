type SumFn = {
  (): number; // 空括号返回数字
  (x: number): SumFn; // 有参数继续链式调用
};

function sum(x: number): SumFn {
  let total = x;

  const inner = ((y?: number) => {
    if (typeof y === 'number') {
      total += y;
      return inner; // 返回自己，继续调用
    }
    return total; // 参数为空，返回结果
  }) as SumFn;

  return inner;
}

// 测试
console.log(sum(1)()); // 1
console.log(sum(1)(2)()); // 3
console.log(sum(1)(2)(3)()); // 6
console.log(typeof sum(1));
console.log(typeof sum(1)());

export default sum;
