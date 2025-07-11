// 构造器就是构造函数
const _employee1 = {
  name: '1',
  age: 1
};

const _employee2 = {
  name: '2',
  age: 2
};

interface EmployeeConstructor {
  new (name: string, age: number): EmployeeInstance;
}

interface EmployeeInstance {
  name: string;
  age: number;
}

// ts不允许使用函数作为构造函数，需要使用class
// 使用类型断言
const Employee = function (this: EmployeeInstance, name: string, age: number) {
  this.name = name;
  this.age = age;
} as unknown as EmployeeConstructor;

const employee1 = new Employee('1', 1);

const employee2 = new Employee('2', 2);

export { employee1, employee2 };
