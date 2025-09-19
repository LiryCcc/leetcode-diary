/**
 * promise retry with promise chain
 * 执行任务，前一个执行完成之后执行下一个，如果有一个超过重试次数，则reject
 */

export const promiseChainRetry = (promises: (() => Promise<unknown>)[], times: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    let current = 0;
    const exec = (retry: number) => {
      if (current >= promises.length) {
        resolve();
      } else {
        const currentPromise = promises[current];
        currentPromise()
          .then(() => {
            current++;
            exec(0);
          })
          .catch((err) => {
            if (retry < times) {
              exec(retry + 1);
            } else {
              reject(err);
            }
          });
      }
    };
    exec(0);
  });
};
