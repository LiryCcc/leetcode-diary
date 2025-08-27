const throttle = <T extends (...args: unknown[]) => void>(fn: T, delay: number) => {
  let inThrottle = false;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      inThrottle = true;
      fn(...args);
      setTimeout(() => {
        inThrottle = false;
      }, delay);
    }
  };
};

/**
 * n 秒后执行该事件，若重复触发，则重新计时
 */
const debounce = <T extends (...args: unknown[]) => unknown>(fn: T, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

export { debounce, throttle };
