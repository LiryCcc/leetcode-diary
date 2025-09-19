/**
 * 用闭包实现一个函数，具有+1、-1、get
 */

const createCounter = (init: number = 0) => {
  let count = init;
  return {
    get: () => count,
    increment: () => (count = count + 1),
    decrement: () => (count = count - 1),
    set: (_count: number) => (count = _count)
  };
};

export default createCounter;
