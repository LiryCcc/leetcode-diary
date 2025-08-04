type UnknownFunction = (...args: unknown[]) => unknown;

const compose = (...fns: UnknownFunction[]): UnknownFunction => {
  return (x: unknown) => {
    return fns.reduceRight((pre, fn) => {
      return fn(pre);
    }, x);
  };
};

export default compose;
