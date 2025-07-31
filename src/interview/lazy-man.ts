type Task = (...params: unknown[]) => void | Promise<void>;

class LazyMan {
  #queue: Task[] = [];
  constructor(name: string) {
    this.#add(() => console.log(`my name is ${name}`));
    setTimeout(() => {});
  }

  #add(task: Task) {
    this.#queue.push(task);
    return this;
  }

  sleep(time: number) {
    this.#add(async () => {
      await new Promise<void>((res) => {
        setTimeout(() => {
          res();
          console.log(`sleep ${time} milliseconds`);
        }, time);
      });
    });
    return this;
  }

  drink(thing: string) {
    this.#add(() => {
      console.log(`喝 ${thing}`);
    });
    return this;
  }

  sleepFirst(time: number) {
    this.#addFirst(async () => {
      await new Promise<void>((res) => {
        setTimeout(() => {
          res();
          console.log(`sleep ${time} milliseconds`);
        });
      });
    });
    return this;
  }

  #addFirst(task: Task) {
    this.#queue.unshift(async () => {
      await task();
      this.#next();
    });
  }

  #next() {
    this.#queue.shift()?.();
  }
}

const lazyMan = (name: string) => new LazyMan(name);

export { LazyMan, lazyMan };
