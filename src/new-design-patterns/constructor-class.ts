// 使用类作为构造器

class Employee {
  #name: string;
  #age: number;
  constructor(name: string, age: number) {
    this.#name = name;
    this.#age = age;
  }

  get name() {
    return this.#name;
  }

  get age() {
    return this.#age;
  }

  set name(name: string) {
    this.#name = name;
  }

  set age(age: number) {
    this.#age = age;
  }
}

const employee1 = new Employee('John', 30);
const employee2 = new Employee('Jane', 28);

export { Employee, employee1, employee2 };
