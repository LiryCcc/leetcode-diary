const superEggDrop = (K, N) => {
  let dp = Array(K + 1).fill(0);
  let cnt = 0;
  while (dp[K] < N) {
    cnt++;
    for (let i = K; i > 0; i--) {
      dp[i] = dp[i - 1] + dp[i] + 1;
    }
  }
  return cnt;
};

export default superEggDrop;
