import dayjs from "dayjs";
const s = dayjs()
for (let i = 1; i < 1000000; i++) {
  for (let j = 1; j < 1000000; j++) {
    if ((79 * (i + j)) === (8 * i * j)) {
      console.log(i, ' ', j);
      break
    }
  }
}

const e = dayjs()

console.log(e.diff(s, 'ms'))
