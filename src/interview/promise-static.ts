/* eslint-disable @typescript-eslint/no-explicit-any */
// 简化版Promise.resolve

export const myResolve = (value: any) => {
  return new Promise((resolve) => resolve(value));
};

// 简化版Promise.reject
export const myReject = (reason: any) => {
  return new Promise((_, reject) => reject(reason));
};

// 简化版Promise.all
export const myAll = (promises: Promise<any>[]) => {
  return new Promise((resolve, reject) => {
    const results: any[] = [];
    let count = 0;

    promises.forEach((p, index) => {
      p.then((res) => {
        results[index] = res;
        count++;
        if (count === promises.length) {
          resolve(results);
        }
      }).catch(reject); // 有一个失败就整体失败
    });
  });
};

// 简化版Promise.race
export const myRace = (promises: Promise<any>[]) => {
  return new Promise((resolve, reject) => {
    // 谁先完成就用谁的结果
    promises.forEach((p) => p.then(resolve).catch(reject));
  });
};

// 简化版Promise.any
export const myAny = (promises: Promise<any>[]) => {
  return new Promise((resolve, reject) => {
    const errors: any[] = [];
    let count = 0;

    promises.forEach((p) => {
      p.then(resolve).catch((err) => {
        errors.push(err);
        count++;
        // 所有都失败才返回错误
        if (count === promises.length) {
          reject(new AggregateError(errors, 'All failed'));
        }
      });
    });
  });
};

// 简化版Promise.allSettled
export const myAllSettled = (promises: Promise<any>[]) => {
  return new Promise((resolve) => {
    const results: any[] = [];
    let count = 0;

    promises.forEach((p, index) => {
      p.then((res) => {
        results[index] = { status: 'fulfilled', value: res };
      })
        .catch((err) => {
          results[index] = { status: 'rejected', reason: err };
        })
        .finally(() => {
          count++;
          if (count === promises.length) {
            resolve(results);
          }
        });
    });
  });
};
