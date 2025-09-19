const tokenize = (str: string): string[] => {
  const tokens: string[] = [];
  let i = 0;

  while (i < str.length) {
    const ch = str[i];

    // 忽略空格
    if (ch === ' ') {
      i++;
      continue;
    }

    // 数字 或 一元正/负数
    if (
      /\d/.test(ch) ||
      ((ch === '-' || ch === '+') &&
        (i === 0 || (tokens.length > 0 && ['+', '-', '*', '/', '('].includes(tokens[tokens.length - 1]))) &&
        i + 1 < str.length &&
        /\d/.test(str[i + 1]))
    ) {
      let num = ch;
      i++;
      while (i < str.length && /\d/.test(str[i])) {
        num += str[i];
        i++;
      }
      tokens.push(num);
      continue;
    }

    // 运算符 或 括号
    if (['+', '-', '*', '/', '(', ')'].includes(ch)) {
      tokens.push(ch);
      i++;
      continue;
    }

    throw new Error(`非法字符: ${ch}`);
  }

  return tokens;
};

const infixToPostfix = (expression: string): string[] => {
  const precedence: Record<string, number> = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2
  };
  const output: ReturnType<typeof infixToPostfix> = [];
  const stack: string[] = [];
  const tokens = tokenize(expression);
  for (const token of tokens) {
    if (/^[-+]?\d+$/.test(token)) {
      output.push(token);
    } else if (token === '(') {
      stack.push(token);
    } else if (token === ')') {
      while (stack.length && stack[stack.length - 1] !== '(') {
        output.push(stack.pop()!);
      }
      stack.pop();
    } else {
      while (
        stack.length &&
        stack[stack.length - 1] !== '(' &&
        precedence[stack[stack.length - 1]] >= precedence[token]
      ) {
        output.push(stack.pop()!);
      }
      stack.push(token);
    }
  }

  while (stack.length) {
    output.push(stack.pop()!);
  }

  return output;
};

const postfixToResult = (expression: string[]): number => {
  const stack: number[] = [];
  for (const token of expression) {
    const n = Number(token);
    if (isNaN(n)) {
      if (token === '+') {
        const b = stack.pop()!;
        const a = stack.pop()!;
        stack.push(a + b);
      } else if (token === '-') {
        const b = stack.pop()!;
        const a = stack.pop()!;
        stack.push(a - b);
      } else if (token === '*') {
        const b = stack.pop()!;
        const a = stack.pop()!;
        stack.push(a * b);
      } else if (token === '/') {
        const b = stack.pop()!;
        const a = stack.pop()!;
        stack.push(a / b);
      } else {
        throw new Error('invalid token');
      }
    } else {
      stack.push(n);
    }
  }
  return stack.pop()!;
};

console.log(postfixToResult(infixToPostfix('(-1 + (+1++1) + 1134 /(2+1)) * 2 / 20')));
