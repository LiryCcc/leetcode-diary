/*
224. 基本计算器
已解答
困难
相关标签
premium lock icon
相关企业
给你一个字符串表达式 s ，请你实现一个基本计算器来计算并返回它的值。

注意:不允许使用任何将字符串作为数学表达式计算的内置函数，比如 eval() 。



示例 1：

输入：s = "1 + 1"
输出：2
示例 2：

输入：s = " 2-1 + 2 "
输出：3
示例 3：

输入：s = "(1+(4+5+2)-3)+(6+8)"
输出：23


提示：

1 <= s.length <= 3 * 105
s 由数字、'+'、'-'、'('、')'、和 ' ' 组成
s 表示一个有效的表达式
'+' 不能用作一元运算(例如， "+1" 和 "+(2 + 3)" 无效)
'-' 可以用作一元运算(即 "-1" 和 "-(2 + 3)" 是有效的)
输入中不存在两个连续的操作符
每个数字和运行的计算将适合于一个有符号的 32位 整数
*/

const operators = ['+', '-', '*', '/', '(', ')'];

const token = (s: string): string[] => {
  const res: string[] = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] === ' ') {
      continue;
    } else if (s[i] === '-') {
      const prev = res[res.length - 1];
      const isUnary = res.length === 0 || (operators.includes(prev) && prev !== ')');
      if (isUnary) {
        res.push('0');
        res.push('-');
      } else {
        res.push('-');
      }
    } else if (operators.includes(s[i])) {
      res.push(s[i]);
    } else if (/\d/.test(s[i])) {
      const num: string[] = [s[i]];
      while (/\d|\./.test(s[i + 1])) {
        num.push(s[i + 1]);
        i++;
      }
      res.push(num.join(''));
    } else {
      throw new Error(`invalid token ${s[i]}`);
    }
  }
  return res;
};

const infix2Postfix = (tokens: string[]): string[] => {
  const res: string[] = [];
  const operatorStack: string[] = [];
  const precedence: { [key: string]: number } = { '+': 1, '-': 1, '*': 2, '/': 2 };
  for (const token of tokens) {
    if (!isNaN(parseFloat(token))) {
      res.push(token);
    } else if (token === '(') {
      operatorStack.push(token);
    } else if (token === ')') {
      while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
        res.push(operatorStack.pop()!);
      }
      if (operatorStack.length === 0) throw new Error('Mismatched parentheses');
      operatorStack.pop();
    } else if (precedence[token] !== undefined) {
      while (
        operatorStack.length > 0 &&
        operatorStack[operatorStack.length - 1] !== '(' &&
        precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]
      ) {
        res.push(operatorStack.pop()!);
      }
      operatorStack.push(token);
    }
  }
  while (operatorStack.length > 0) {
    if (operatorStack[operatorStack.length - 1] === '(') throw new Error('Mismatched parentheses');
    res.push(operatorStack.pop()!);
  }
  return res;
};

function calculate(s: string): number {
  const expression = infix2Postfix(token(s));
  const stack: number[] = [];
  for (const token of expression) {
    const n = Number(token);
    if (isNaN(n)) {
      const b = stack.pop()!;
      const a = stack.pop()!;
      if (token === '+') stack.push(a + b);
      else if (token === '-') stack.push(a - b);
      else if (token === '*') stack.push(a * b);
      else if (token === '/') stack.push(a / b);
      else throw new Error('invalid token');
    } else {
      stack.push(n);
    }
  }
  return stack.pop()!;
}

console.log(calculate('1+2'));
console.log(calculate('1+(2*1)'));
console.log(calculate('(1+(4+5+2)-3)+(6+8)'));
console.log(calculate('1-(     -2)'));
console.log(calculate('-2+1'));
console.log(calculate('- (3 + (4 + 5))'));
