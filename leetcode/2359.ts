const d = (node: number, edges: number[]): number[] => {
  const dist = new Array(edges.length).fill(-1);
  let distance = 0;
  // 距离
  while (node !== -1 && dist[node] === -1) {
    dist[node] = distance++;
    node = edges[node];
  }
  return dist;
};

function closestMeetingNode(edges: number[], node1: number, node2: number): number {
  const len = edges.length;

  const d1 = d(node1, edges);
  const d2 = d(node2, edges);
  // node
  let res = -1;
  for (let i = 0; i < len; i++) {
    if (d1[i] !== -1 && d2[i] !== -1) {
      if (res === -1 || Math.max(d1[res], d2[res]) > Math.max(d1[i], d2[i])) {
        res = i;
      }
    }
  }
  return res;
}

export default closestMeetingNode;
