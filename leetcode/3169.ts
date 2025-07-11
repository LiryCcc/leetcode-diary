function countDays(days: number, meetings: [number, number][]): number {
  meetings.sort((a, b) => a[0] - b[0]);
  let l = 1,
    r = 0;
  for (const [start, end] of meetings) {
    if (start > r) {
      days -= r - l + 1;
      l = start;
    }
    r = Math.max(r, end);
  }
  days -= r - l + 1;
  return days;
}

export default countDays;
