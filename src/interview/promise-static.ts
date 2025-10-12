export const myResolve = <T>(v: T): Promise<T> => {
  return new Promise((res) => {
    res(v);
  });
};

export const myReject = <T>(v: T): Promise<unknown> => {
  return new Promise<T>((_res, rej) => {
    rej(v);
  });
};
