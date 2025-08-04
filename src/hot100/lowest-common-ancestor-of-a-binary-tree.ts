class TreeNode {
  public val: number;
  public left: TreeNode | null;
  public right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

type MyNode = TreeNode | null;

function lowestCommonAncestor(root: MyNode, p: MyNode, q: MyNode): MyNode {
  let result: MyNode = null;
  const dfs = (root: MyNode, p: MyNode, q: MyNode): boolean => {
    if (root === null) {
      return false;
    } else {
      const leftSon = dfs(root.left, p, q);
      const rightSon = dfs(root.right, p, q);
      if ((leftSon && rightSon) || ((root.val === p?.val || root.val === q?.val) && (leftSon || rightSon))) {
        result = root;
      }
      dfs(root, p, q);
      return leftSon || rightSon || root.val === p?.val || root.val === q?.val;
    }
  };
  dfs(root, p, q);
  return result;
}

export default lowestCommonAncestor;
