/**
 * 原型模式
 */
class Employee {
  #name: string;
  #age: number;
  constructor(name: string, age: number) {
    this.#name = name;
    this.#age = age;
  }
  say() {
    console.log(`${this.#name} ${this.#age}`);
  }
}

export const e1 = new Employee('k1', 100);
export const e2 = new Employee('k2', 100);
