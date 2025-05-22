import { MaxPriorityQueue } from 'datastructures-js';

function maxRemoval(nums: number[], queries: number[][]): number {
  queries.sort((a, b) => a[0] - b[0]);
  const que = new MaxPriorityQueue<number>();
  const delta: number[] = new Array(nums.length + 1).fill(0);
  let ops = 0;

  for (let i = 0, j = 0; i < nums.length; i++) {
    ops += delta[i];
    while (j < queries.length && queries[j][0] === i) {
      que.push(queries[j][1]);
      j++;
    }
    while (ops < nums[i] && !que.isEmpty() && que.front()! >= i) {
      ops += 1;
      delta[que.pop()! + 1] -= 1;
    }
    if (ops < nums[i]) {
      return -1;
    }
  }
  return que.size();
}

export default maxRemoval;
