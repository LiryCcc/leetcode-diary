import dayjs from 'dayjs';
import { exit } from 'node:process';

const s = dayjs();
for (let i = 1; i < 10000n; i++) {
  for (let j = 1; j < i; j++) {
    if (79 * (i + j) === 8 * i * j) {
      console.log(i, ' ', j);
      break;
    }
  }
}

const e = dayjs();

console.log(e.diff(s, 'ms'));
console.log('exit');
exit('x');
