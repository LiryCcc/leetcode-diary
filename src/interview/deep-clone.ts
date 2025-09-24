export const deepClone = <T>(obj: T, hash = new WeakMap()): T => {
  if (
    typeof obj === 'boolean' ||
    typeof obj === 'number' ||
    typeof obj === 'string' ||
    typeof obj === 'undefined' ||
    typeof obj === 'bigint' ||
    typeof obj === 'symbol' ||
    typeof obj === 'function' ||
    obj === null
  ) {
    return obj;
  } else if (obj instanceof RegExp) {
    const reg = new RegExp(obj.source, obj.flags);
    reg.lastIndex = obj.lastIndex;
    return reg as T;
  } else if (obj instanceof Date) {
    return new Date(obj) as T;
  } else if (obj instanceof Map) {
    if (hash.has(obj)) {
      return hash.get(obj);
    }
    const result = new Map();
    hash.set(obj, result);

    obj.forEach((value, key) => {
      result.set(key, deepClone(value, hash));
    });
    return result as T;
  } else if (obj instanceof Set) {
    if (hash.has(obj)) {
      return hash.get(obj);
    }

    const result = new Set();
    hash.set(obj, result);
    obj.forEach((value) => {
      result.add(deepClone(value, hash));
    });
    return result as T;
  } else if (Array.isArray(obj)) {
    if (hash.has(obj)) {
      return hash.get(obj);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any[] = [];
    hash.set(obj, result);
    obj.forEach((item, index) => {
      result[index] = deepClone(item, hash);
    });
    return result as T;
  } else {
    if (hash.has(obj)) {
      return hash.get(obj);
    }
    const proto = Object.getPrototypeOf(obj);
    const result = Object.create(proto);
    hash.set(obj, result);
    const keys = Reflect.ownKeys(obj);
    for (const key of keys) {
      if (key === Symbol.toStringTag) {
        continue;
      } else {
        const descriptor = Object.getOwnPropertyDescriptor(obj, key);
        if (descriptor && typeof descriptor.value !== 'undefined') {
          descriptor.value = deepClone(descriptor.value, hash);
          Object.defineProperty(result, key, descriptor);
        }
      }
    }
    return result;
  }
  return obj;
};
