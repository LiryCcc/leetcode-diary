type UnknownFunction = (...args: unknown[]) => unknown | UnknownFunction;

const curry = (fn: UnknownFunction) => {
  const curried = (...args: unknown[]) => {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return (...nextArgs: unknown[]) => {
        return curried(...args, ...nextArgs);
      };
    }
  };
  return curried;
};

const sum = (a: number, b: number, c: number, d: number) => {
  return a + b + c + d;
};

console.log(curry(sum)(1)(2)(3)(4));

export default curry;
