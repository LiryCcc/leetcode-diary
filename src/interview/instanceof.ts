type Constructor<T, Args extends readonly unknown[] = unknown[]> = new (...args: Args) => T;

const myInstanceof = <T>(obj: unknown, constructor: Constructor<T>): obj is T => {
  // Step 1: constructor 必须是函数或对象（构造函数是函数对象）
  if (typeof constructor !== 'function') {
    throw new TypeError('Right-hand side of instanceof is not callable');
  }

  // Step 2: 检查 Symbol.hasInstance
  const hasInstanceFn = constructor[Symbol.hasInstance];
  if (typeof hasInstanceFn === 'function') {
    return Boolean(hasInstanceFn.call(constructor, obj));
  }

  // Step 3: prototype 必须是对象
  const prototype = constructor.prototype;
  if (typeof prototype !== 'object' || prototype === null) {
    throw new TypeError('Function has non-object prototype in instanceof check');
  }

  // Step 4: 左操作数 obj 必须是对象或函数
  if ((typeof obj !== 'object' && typeof obj !== 'function') || obj === null) {
    return false;
  }

  // Step 5: 沿着原型链查找
  let proto = Object.getPrototypeOf(obj);
  while (proto) {
    if (proto === prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }

  return false;
};

export default myInstanceof;
