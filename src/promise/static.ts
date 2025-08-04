/**
 * 类型守卫
 */
const isPromise = <T>(t: unknown): t is Promise<T> => {
  return t instanceof Promise;
};

/**
 * `Promise.resolve`
 */
const myResolve = <T>(value: T | Promise<T>): Promise<T> => {
  if (isPromise(value)) {
    return value;
  } else {
    return new Promise<T>((res) => res(value));
  }
};

/**
 * `Promise.reject`方法
 */
const myReject = <T>(value: T | Promise<T>): Promise<T> => {
  return new Promise<T>((_, rej) => rej(value));
};

/**
 * `Promise.race`方法
 */
const myRace = <T>(arr: Promise<T>[]): Promise<T> => {
  if (arr.length === 0) {
    return new Promise<T>(() => {});
  } else {
    return new Promise((resolve, reject) => {
      arr.forEach((promise) => {
        Promise.resolve(promise)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    });
  }
};

/**
 * `Promise.all`
 */
const myAll = <T>(arr: Promise<T>[]): Promise<T[]> => {
  return new Promise<T[]>((res, rej) => {
    if (arr.length === 0) {
      res([]);
      return;
    } else {
      const result: T[] = [];
      let completedCount = 0;
      arr.forEach((promise, index) => {
        Promise.resolve(promise)
          .then((val) => {
            result[index] = val;
            completedCount++;
            if (completedCount === arr.length) {
              res(result);
            }
          })
          .catch((err) => {
            rej(err);
          });
      });
    }
  });
};

type MyPromiseSettledResult<T> =
  | {
      status: 'fulfilled';
      value: T;
    }
  | {
      status: 'rejected';
      reason: unknown;
    };

/**
 * `Promise.allSettled`
 */

const myAllSettled = <T>(promises: Promise<T>[]): Promise<MyPromiseSettledResult<T>[]> => {
  return new Promise((res) => {
    if (promises.length === 0) {
      res([]);
      return;
    } else {
      const results: MyPromiseSettledResult<T>[] = [];
      let settledCount = 0;
      promises.forEach((promise, index) => {
        Promise.resolve(promise).then(
          (value) => {
            results[index] = {
              status: 'fulfilled',
              value
            };
            settledCount++;
            if (settledCount === promises.length) {
              res(results);
            }
          },
          (reason) => {
            results[index] = {
              status: 'rejected',
              reason
            };
            settledCount++;

            // 检查是否所有 promise 都已完成
            if (settledCount === promises.length) {
              res(results);
            }
          }
        );
      });
    }
  });
};

/**
 * `Promise.any`
 */

const myAny = <T>(arr: Promise<T>[]): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    let rejectedNum = 0;
    const reasons: unknown[] = [];
    arr.forEach((promise, index) => {
      promise
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejectedNum++;
          reasons[index] = err;
          if (rejectedNum === arr.length) {
            reject(new AggregateError(reasons));
          }
        });
    });
  });
};

/**
 * `Promise.withResolvers`
 */

const myWithResolvers = <T>() => {
  let resolve!: (val: T) => void;
  let reject!: (reason: unknown) => void;
  const promise = new Promise<T>((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  return { promise, reject, resolve };
};

export { myAll, myAllSettled, myAny, myRace, myReject, myResolve, myWithResolvers };
