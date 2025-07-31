import { useEffect, useRef, useState } from 'react';

const useCountDown = (initTime: number) => {
  const [timeLeft, setTimeLeft] = useState(initTime);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);
  const start = () => {
    if (!intervalRef.current) {
      const startTime = performance.now();
      const endTime = startTime + timeLeft;
      intervalRef.current = setInterval(() => {
        const remaining = Math.max(0, endTime - performance.now());
        setTimeLeft(remaining);
        if (remaining === 0 && intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }, 1000);
    }
  };

  const pause = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const reset = () => {
    pause();
    setTimeLeft(initTime);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return { start, pause, reset };
};

export { useCountDown };
