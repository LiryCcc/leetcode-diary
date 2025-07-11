/**
 * @param {number[]} tickets
 * @param {number} k
 * @return {number}
 */

const timeRequiredToBuy = (tickets, k) => {
  let ans = 0;
  for (let i = 0; i < tickets.length; i++) {
    if (i <= k) {
      ans += tickets[k] < tickets[i] ? tickets[k] : tickets[i];
    } else {
      ans += tickets[k] - 1 < tickets[i] ? tickets[k] - 1 : tickets[i];
    }
  }
  return ans;
};

export default timeRequiredToBuy;
