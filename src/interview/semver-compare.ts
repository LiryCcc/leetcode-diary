/**
 * 比较语义化版本号
 * 返回  1 代表semver1大于semver2
 * 返回  0 代表semver1等于semver2
 * 返回 -1 代表semver1小于semver2
 */

const versionCompare = (semver1: string, semver2: string): 1 | -1 | 0 => {
  const ver1 = semver1
    .trim()
    .toLowerCase()
    .split('')
    // .filter((v) => validChars.includes(v))
    .join('')
    .replace('..', '.0.')
    .split('.')
    .map((v) => Number(v));
  const ver2 = semver2
    .trim()
    .toLowerCase()
    .split('')
    // .filter((v) => validChars.includes(v))
    .join('')
    .replace('..', '.0.')
    .split('.')
    .map((v) => {
      const n = Number(v);

      return n;
    });
  const l1 = ver1.length;
  const l2 = ver2.length;
  console.log(`${ver1} ${ver2}`);
  if (l1 === l2) {
    for (let i = 0; i < l1; i++) {
      const _1 = ver1[i];
      const _2 = ver2[i];
      if (typeof _1 === 'number' && typeof _2 === 'number') {
        if (_1 > _2) {
          return 1;
        } else if (_1 < _2) {
          return -1;
        } else {
          continue;
        }
      } else if (_1.toString() === _2.toString()) {
        continue;
      } else {
        return _1.toString().localeCompare(_2.toString()) ? 1 : -1;
      }
    }
    return 0;
  } else if (l1 > l2) {
    while (ver1.length > ver2.length) {
      ver2.push(0);
    }
    for (let i = 0; i < l1; i++) {
      const _1 = ver1[i];
      const _2 = ver2[i];
      if (typeof _1 === 'number' && typeof _2 === 'number') {
        if (_1 > _2) {
          return 1;
        } else if (_1 < _2) {
          return -1;
        } else {
          continue;
        }
      } else if (_1.toString() === _2.toString()) {
        continue;
      } else {
        return _1.toString().localeCompare(_2.toString()) ? 1 : -1;
      }
    }
    return 0;
  } else if (l1 < l2) {
    while (ver1.length < ver2.length) {
      ver1.push(0);
    }
    console.log(ver1);
    console.log(ver2);
    for (let i = 0; i < l2; i++) {
      const _1 = ver1[i];
      const _2 = ver2[i];
      if (typeof _1 === 'number' && typeof _2 === 'number') {
        if (_1 > _2) {
          return 1;
        } else if (_1 < _2) {
          return -1;
        } else {
          continue;
        }
      } else if (_1.toString() === _2.toString()) {
        continue;
      } else {
        return _1.toString().localeCompare(_2.toString()) ? 1 : -1;
      }
    }
    return 0;
  } else {
    // 不可能有这种情况，有的话直接报错
    throw new Error(`未知错误`);
  }
};

console.log(versionCompare('1.0.1', '1.0'));

export default versionCompare;
