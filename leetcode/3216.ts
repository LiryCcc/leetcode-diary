function getSmallestString(s: string) {
  const res = s.split('');
  for (let i = 0; i + 1 < s.length; i++) {
    if (Number(s[i]) % 2 === Number(s[i + 1]) % 2 && Number(s[i + 1]) < Number(s[i])) {
      [res[i + 1], res[i]] = [res[i], res[i + 1]];
      return res.join('');
      break;
    }
  }
}

export default getSmallestString;
