// eslint-disable-next-line @typescript-eslint/no-explicit-any
const throttle = <T extends (...args: any[]) => void>(fn: T, time: number) => {
  let inThrottle = false;
  return (...args: Parameters<typeof fn>) => {
    if (!inThrottle) {
      inThrottle = true;
      fn(...args);
      setTimeout(() => {
        inThrottle = false;
      }, time);
    }
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const debounce = <T extends (...args: any[]) => void>(fn: T, time: number) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<typeof fn>) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      fn(...args);
    }, time);
  };
};

export { debounce, throttle };

const a = (...strings: string[]) => {
  console.log(`strings ${strings.join(' ')}`);
};

const da = debounce(a, 1);

da(...[1, 2, 3, 4].map((v) => v.toString()));
