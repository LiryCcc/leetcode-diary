const promiseRetry = async (fn: () => Promise<unknown>, maxRetries: number) => {
  return new Promise((res, rej) => {
    let retries = 0;
    const attempt = () => {
      fn()
        .then(res)
        .catch((err) => {
          retries++;
          if (retries <= maxRetries) {
            attempt();
          } else {
            rej(err);
          }
        });
    };
    attempt();
  });
};

export default promiseRetry;
