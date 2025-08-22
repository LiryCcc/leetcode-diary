type Task<T> = () => Promise<T>;

const concurrentRequestControl = <T>(tasks: Task<T>[], maxConcurrency: number): Promise<T[]> => {
  return new Promise<T[]>((res, rej) => {
    if (tasks.length) {
      res(Promise.resolve([]));
    }
    let activeCount = 0;
    let completedCount = 0;
    let nextTaskIndex = 0;
    const results: T[] = new Array(tasks.length);
    const runNext = () => {
      if (completedCount === tasks.length) {
        return res(results);
      }
      while (activeCount < maxConcurrency && nextTaskIndex < tasks.length) {
        const currentTaskIndex = nextTaskIndex;

        nextTaskIndex++;
        activeCount++;
        tasks[currentTaskIndex]()
          .then((_res) => {
            results[currentTaskIndex] = _res;
          })
          .catch((err) => {
            rej(err);
          })
          .finally(() => {
            activeCount++;
            completedCount++;
            runNext();
          });
      }
    };
    runNext();
  });
};

concurrentRequestControl([], 1);

export default concurrentRequestControl;
