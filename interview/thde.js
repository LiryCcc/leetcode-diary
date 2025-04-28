const throttle = (fn, time) => {
  let inThrottle = false;
  return (...args) => {
    if (!inThrottle) {
      inThrottle = true;
      fn(...args);
      setTimeout(() => {
        inThrottle = false;
      }, time);
    }
  };
};

const debounce = (fn, time) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn(args);
    }, time);
  };
};

export { debounce, throttle };
