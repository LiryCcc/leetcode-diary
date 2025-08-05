type UnknownFunction = (...args: unknown[]) => unknown;

const curry = (fn) => {
  return (...args: unknown[]): unknown => {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return;
    }
  };
};

export default curry;
