/**
 * 深搜一下
 */
const dfs = (node: number, parent: number, children: number[][], k: number) => {
  if (k < 0) {
    return 0;
  }
  let res = 1;
  for (const child of children[node]) {
    if (child !== parent) {
      res += dfs(child, node, children, k - 1);
    }
  }
  return res;
};

/**
 * 返回可达节点数
 */
const buildTree = (edges: number[][], k: number) => {
  const len = edges.length + 1;
  const children = Array.from<number, number[]>({ length: len }, () => []);
  for (const edge of edges) {
    children[edge[0]].push(edge[1]);
    children[edge[1]].push(edge[0]);
  }
  const res: number[] = new Array<number>(len);
  for (let i = 0; i < len; i++) {
    res[i] = dfs(i, -1, children, k);
  }
  return res;
};

function maxTargetNodes(edges1: number[][], edges2: number[][], k: number): number[] {
  const len = edges1.length + 1;
  const count1 = buildTree(edges1, k);
  // edge2
  const count2 = buildTree(edges2, k - 1);
  const maxCount2 = Math.max(...count2);
  const res = new Array<number>(len);
  for (let i = 0; i < len; i++) {
    res[i] = count1[i] + maxCount2;
  }
  return res;
}

export default maxTargetNodes;
