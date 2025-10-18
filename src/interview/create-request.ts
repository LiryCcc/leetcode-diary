export const ajax = async (url: string) => {
  await new Promise<void>((res) => {
    setTimeout(res, Math.floor(2000 * Math.random()));
  });
  return url;
};

export const createRequest = (max: number) => {
  let currentRunning = 0;
  const taskList: (() => Promise<string>)[] = [];
  return (url: string) =>
    new Promise<string>((res, rej) => {
      taskList.push(() => ajax(url));
      const exec = () => {
        if (currentRunning < max) {
          currentRunning++;
          taskList
            .shift()?.()
            .then((result) => {
              currentRunning--;
              res(result);
            })
            .catch(rej)
            .finally(() => {
              exec();
            });
        }
      };
      exec();
    });
};
