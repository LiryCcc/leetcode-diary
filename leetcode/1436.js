const destCity = (paths) => {
  const ca = new Set();
  for (const p of paths) {
    ca.add(p[0]);
  }
  for (const p of paths) {
    if (!ca.has(p[1])) {
      return p[1];
    }
  }
};

export default destCity;
