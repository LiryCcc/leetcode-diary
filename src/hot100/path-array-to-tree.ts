type PathTree = {
  name: string;
  children?: PathTree[];
};

const testCase = ['/a/b/c', '/a/b/c/d', '/a/b/d', '/a/c'];

const out = (args: object): ReturnType<typeof console.log> => {
  console.log(JSON.stringify(args));
};

const transferPathArrayToPathTree = (cases: string[]): PathTree => {
  const formatCases = cases
    .map((v) => v.split('/'))
    .map((v) => {
      if (v[0] === '') {
        return v.slice(1);
      } else {
        return v;
      }
    });
  // [["/","a","b","c"],["/","a","b","c","d"],["/","a","b","d"],["/","a","c"]]
  const res: PathTree = { name: '/', children: [] };

  formatCases.forEach((seg) => {
    let root = res;
    seg.forEach((s) => {
      if (root.children) {
        const newRoot = root.children.filter((v) => {
          return v.name === s;
        })[0];
        if (newRoot) {
          root = newRoot;
        } else {
          const leaf = { name: s, children: [] } as PathTree;
          root.children.push(leaf);
          root = leaf;
        }
      } else {
        root.children = [] as PathTree[];
      }
    });
  });
  // const res: PathTree = { name: '/' };
  return res;
};

out(transferPathArrayToPathTree(testCase));

export default transferPathArrayToPathTree;
