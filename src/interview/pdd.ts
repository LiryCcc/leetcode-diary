import { useRef, useState } from 'react';
/**
 * 1. 拍平数组
 */

// 定义一个递归的类型，用于正确推断嵌套数组的类型
type Flatten<T> = T extends Array<infer U> ? Flatten<U> : T;

export const arrayFlat = <T>(...arr: T[]): Flatten<T>[] => {
  const res: Flatten<T>[] = [];
  for (const item of arr) {
    if (Array.isArray(item)) {
      // 递归处理数组元素，使用扩展运算符展开结果
      res.push(...arrayFlat(...item));
    } else {
      // 非数组元素直接添加
      res.push(item as Flatten<T>);
    }
  }
  return res;
};

// 测试调用
console.log(arrayFlat([[1], [2]], [3, 4], [[5], [6, [7]]]));
// 输出: [1, 2, 3, 4, 5, 6, 7]

/**
 * 2. 倒计时hook
 */

export const useCountdown = (initMillSeconds: number, tick: number = 300) => {
  const [timeLeft, setTimeLeft] = useState(initMillSeconds);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);
  const start = () => {
    if (intervalRef.current) {
      return;
    } else {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev - tick <= 0) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            return 0;
          } else {
            return prev - tick;
          }
        });
      }, tick);
    }
  };
  const reset = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setTimeLeft(initMillSeconds);
  };
  const pause = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
  return {
    start,
    reset,
    pause,
    timeLeft
  };
};

/**
 * 3. promise链式重试
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const promiseChainWithRetry = (promises: (() => Promise<any>)[], times: number): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: any[] = [];
    let current = 0;
    const exec = (currentRetry: number) => {
      if (current >= promises.length) {
        resolve(res);
      } else if (currentRetry >= times) {
        reject();
      } else {
        promises[current]()
          .then((result) => {
            res[current] = result;
            current++;
            exec(0);
          })
          .catch(() => {
            exec(currentRetry + 1);
          });
      }
    };
    exec(0);
  });
};
