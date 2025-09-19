export const curry = (fn) => {
  if (fn.length === 0) {
    return fn;
  } else {
    const curried = (...args) => {
      if (args.length >= fn.length) {
        return fn(...args);
      } else {
        return (...args2) => curried(...args, ...args2);
      }
    };
    return curried;
  }
};

const sum = (a, b, c) => a + b + c;

console.log(curry(sum)(1)(2)(3));

export const curry2 = (fn) => {
  if (fn.length === 0) {
    return fn;
  } else {
    const curried = (...args) => {
      if (args.length >= curried.length) {
        return curried(...args);
      } else {
        return (...rest) => {
          return curried(...args, ...rest);
        };
      }
    };
    return curried;
  }
};
