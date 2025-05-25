/**
 * 首先，自身回文的只能出现一个，其余的必须有对应的reverse word
 */

function longestPalindrome(words: string[]): number {
  const isPalindrome = (word1: string, word2?: string) => {
    if (word2) {
      if (word2[1] === word1[0] && word2[0] === word1[1]) {
        return true;
      }
      return false;
    } else {
      return word1[0] === word1[1];
    }
  };
  const reverseWord = (word: string) => {
    return word.split('').reverse().join('');
  };
  /**
   * 如果回文的存在，则+=4，然后设置为false
   */
  const map = new Map<string, number>();
  let length = 0;
  let ce = false; // 有个在中间的

  // 存下每个的次数
  for (const word of words) {
    map.set(word, (map.get(word) || 0) + 1);
  }

  map.forEach((count, word) => {
    if (isPalindrome(word)) {
      if (count % 2 === 0) {
        // 出现两次就可以
        length += count * 2;
      } else {
        // 比二多久减一
        length += (count - 1) * 2;
        ce = true;
      }
    } else {
      const reverse = reverseWord(word);
      if (map.has(reverse)) {
        const minCount = Math.min(count, map.get(reverse)!);
        length += minCount * 4;
        map.set(word, count - minCount);
        map.set(reverse, map.get(reverse)! - minCount);
      }
    }
  });

  if (ce) {
    length += 2;
  }

  // for (const word of words) {
  //   if (isPalindrome(word) && ce) {
  //     length += 2;
  //     ce = false;
  //   } else {
  //     if (map.has(reverseWord(word))) {
  //       length += 4;
  //       map.set(reverseWord(word), false);
  //     } else {
  //       map.set(word, true);
  //     }
  //   }
  // }
  return length;
}

export default longestPalindrome;
