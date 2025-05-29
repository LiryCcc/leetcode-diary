const dfs = (node: number, parent: number, depth: number, children: number[][], color: number[]): number => {
  // 返回类型明确为 number
  let res = 1 - (depth % 2);
  color[node] = depth % 2;
  for (const child of children[node]) {
    if (child === parent) {
      continue;
    }
    res += dfs(child, node, depth + 1, children, color);
  }
  return res;
};

const build = (edges: [number, number][], color: number[]): [number, number] => {
  const n = edges.length + 1;
  const children: number[][] = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    children[u].push(v);
    children[v].push(u);
  }
  const countColor0 = dfs(0, -1, 0, children, color);
  const countColor1 = n - countColor0;
  return [countColor0, countColor1];
};

function maxTargetNodes(edges1: [number, number][], edges2: [number, number][]): number[] {
  const n = edges1.length + 1;
  const m = edges2.length + 1;

  const color1: number[] = new Array(n).fill(0);
  const color2: number[] = new Array(m).fill(0);

  const count1: [number, number] = build(edges1, color1);
  const count2: [number, number] = build(edges2, color2);

  const res: number[] = new Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    res[i] = count1[color1[i]] + Math.max(count2[0], count2[1]);
  }

  return res;
}

export default maxTargetNodes;
