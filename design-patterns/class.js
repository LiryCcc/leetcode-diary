/**
 * 类模式
 */

class Employee {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  say() {
    console.log(`${this.name} ${this.age}`);
  }
}

const _e1 = new Employee('k1', 100);
const _e2 = new Employee('k2', 100);
