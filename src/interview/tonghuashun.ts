/**
 fetch axios
 如果成功就直接resolve
 如果失败就重试，然后达到次数后reject
 */

export const promiseRetry = <T>(promises: () => Promise<T>, retries: number = 3): Promise<T> => {
  return new Promise<T>((res, rej) => {
    const exec = (current: number) => {
      if (current < retries) {
        promises()
          .then((result) => {
            res(result);
          })
          .catch(() => {
            exec(current + 1);
          });
      } else {
        rej();
      }
    };
    exec(0);
  });
};

export const promiseRetryWithTimeout = <T>(
  p: () => Promise<T>,
  retries: number = 3,
  timeout: number = 1000
): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    const exec = (current: number, timeout: number) => {
      if (current < retries) {
        p()
          .then((result) => {
            resolve(result);
          })
          .catch(() => {
            setTimeout(() => {
              exec(current + 1, timeout * 2 ** current);
            }, timeout);
          });
      } else {
        reject();
      }
    };
    exec(0, timeout);
  });
};
