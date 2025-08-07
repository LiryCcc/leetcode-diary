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
        return ['/', ...v.slice(1)];
      } else {
        return v;
      }
    });
  out(formatCases);
  const res: PathTree = { name: '/' };
  formatCases.forEach((v) => {
    if (res.children) {
      //
    } else {
      res.children = [];
    }
  });
  return res;
};

transferPathArrayToPathTree(testCase);

export default transferPathArrayToPathTree;
