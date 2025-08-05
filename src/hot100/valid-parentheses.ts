function isValid(s: string): boolean {
  const left = ['(', '{', '['];

  const stack: string[] = [];
  for (const char of s) {
    if (left.includes(char)) {
      console.log(`${char} push into stack`);
      stack.push(char);
    } else {
      console.log(stack[stack.length - 1]);
      console.log(char);
      if (stack[stack.length - 1] === '{' && char === '}') {
        stack.pop();
      } else if (stack[stack.length - 1] === '[' && char === ']') {
        stack.pop();
      } else if (stack[stack.length - 1] === '(' && char === ')') {
        stack.pop();
      } else {
        return false;
      }
    }
  }
  return !stack.length;
}

console.log(isValid('()'));

export default isValid;
