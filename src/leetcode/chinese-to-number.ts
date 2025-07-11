const c = ['一亿三千五百六十四万九千六百三十二'];

const _n = ['亿', '万', '千', '百', '十'];
const d = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];

const chineseToNumber = (str: string): number => {
  if (str.length === 1) {
    if (d.includes(str)) {
      return d.indexOf(str);
    } else if (str === '十') {
      return 10;
    }
  }
  if (str[0] === '十') {
    return 10 + chineseToNumber(str.slice(1));
  }
  let sum = 0; // 总和
  let num = 0; // 当前单位内的数字
  let prev = 0; // 当前数字
  const nums = str.split('');

  for (const i of nums) {
    if (d.includes(i)) {
      prev = d.indexOf(i);
    } else if (i === '十') {
      num += prev * 10;
      prev = 0;
    } else if (i === '百') {
      num += prev * 100;
      prev = 0;
    } else if (i === '千') {
      num += prev * 1000;
      prev = 0;
    } else if (i === '万') {
      num += prev;
      sum += num * 10000;
      num = 0;
      prev = 0;
    } else if (i === '亿') {
      // 如果是亿
      num += prev;
      sum += num * 100000000;
      num = 0;
      prev = 0;
    }
  }

  // 最后会有个个位数，需要额外处理哈
  sum += num + prev;

  return sum;
};

console.log(chineseToNumber(c[0])); // 输出：135649632

export default chineseToNumber;
