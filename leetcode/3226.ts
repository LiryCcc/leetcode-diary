const minChanges = (n: number, k: number) => {
  const sn = n.toString(2).split('');
  const sk = k.toString(2).split('');
  if (n < k) {
    return -1;
  } else if (n === k) {
    return 0;
  } else {
    while (sk.length < sn.length) {
      sk.unshift('0');
    }
    let c = 0;
    for (let i = 0; i < sk.length; i++) {
      if (sn[i] === '1' && sk[i] === '0') {
        c++;
      } else if (sn[i] === '0' && sk[i] === '1') {
        return -1;
      }
    }
    return c;
  }
};

export default minChanges;
