/**
 49. 字母异位词分组
中等
相关标签
premium lock icon
相关企业
给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。



示例 1:

输入: strings = ["eat", "tea", "tan", "ate", "nat", "bat"]

输出: [["bat"],["nat","tan"],["ate","eat","tea"]]

解释：

在 strings 中没有字符串可以通过重新排列来形成 "bat"。
字符串 "nat" 和 "tan" 是字母异位词，因为它们可以重新排列以形成彼此。
字符串 "ate" ，"eat" 和 "tea" 是字母异位词，因为它们可以重新排列以形成彼此。
示例 2:

输入: strings = [""]

输出: [[""]]

示例 3:

输入: strings = ["a"]

输出: [["a"]]



提示：

1 <= strings.length <= 104
0 <= strings[i].length <= 100
strings[i] 仅包含小写字母
 */

function groupAnagrams(strings: string[]): string[][] {
  const map: Record<string, string[]> = {};
  for (const str of strings) {
    const key = str
      .split('')
      .sort((a, b) => a.localeCompare(b))
      .join('');
    if (!map[key]) {
      map[key] = [];
    }
    map[key].push(str);
  }
  return Object.values(map);
}

console.log(JSON.stringify(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat'])));

export default groupAnagrams;
