function countCompleteDayPairs(hours: number[]) {
  let ans = 0;
  let cnt = new Array(24).fill(0);
  for (const hour of hours) {
    ans += cnt[(24 - (hour % 24)) % 24];
    cnt[hour % 24]++;
  }
  return ans;
}
