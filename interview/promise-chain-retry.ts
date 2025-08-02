const retry = (promiseFn: () => Promise<unknown>, times: number) => {
  return new Promise((resolve, reject) => {
    const inside = async (times: number) => {
      try {
        const res = await promiseFn();
        console.log(`成功, ${res}`);
        resolve(res);
      } catch (err) {
        if (times > 0) {
          console.log(`倒数第${times}次重试, ${err}`);
          --times;
          inside(times);
        } else {
          console.log('End');
          reject(err);
        }
      }
    };
    inside(times);
  });
};

const t = () => {
  return new Promise((res, rej) => {
    const num = Math.floor(Math.random() * 10);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    num < 5 ? res(`success,${num}`) : rej(`fail,${num}`);
  });
};

retry(t, 4)
  .then((res) => {
    console.log(`res: ${res}`);
  })
  .catch((err) => {
    console.log(`err: ${err}`);
  });
