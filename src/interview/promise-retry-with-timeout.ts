export type PromiseRetryOptions = {
  maxRetries?: number;
  delay?: number;
  timeout?: number;
};

export const promiseRetry = <T>(
  fn: () => Promise<T>,
  { maxRetries = 2, delay = 1000, timeout = 5000 }: PromiseRetryOptions
): Promise<T> => {
  let retryCount = 0;
  const exec = (): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
      const to = setTimeout(() => {
        if (retryCount < maxRetries) {
          retryCount++;
          setTimeout(() => {
            exec().then(resolve).catch(reject);
          });
        } else {
          reject(new Error('max retries'));
        }
      }, timeout);
      fn()
        .then((res) => {
          clearTimeout(to);
          resolve(res);
        })
        .catch((error) => {
          clearTimeout(to);
          if (retryCount < maxRetries) {
            retryCount++;
            setTimeout(() => {
              exec().then(resolve).catch(reject);
            }, delay);
          } else {
            reject(error);
          }
        });
    });
  };
  return exec();
};

export const simulateAsync = (probability: number = 0.5): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < probability) {
        resolve(true);
      } else {
        reject(false);
      }
    }, 1000);
  });
};

export const testRetry = async () => {
  try {
    const result = await promiseRetry(simulateAsync, {
      maxRetries: 5,
      delay: 2000,
      timeout: 3000
    });
    console.log('最终结果:', result);
  } catch (error) {
    console.error('最终错误:', error instanceof Error ? error.message : error);
  }
};

testRetry();
