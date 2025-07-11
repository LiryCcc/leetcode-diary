interface EmployeeInstance {
  name: string;
  age: number;
  say: () => void;
}

interface EmployeeConstructor {
  new (name: string, age: number): EmployeeInstance;
}

// 构造函数，缺点是每个实例都会存一份函数，比较占内存，一般不用
const FunctionEmployee = function (this: EmployeeInstance, name: string, age: number) {
  this.name = name;
  this.age = age;
  this.say = function () {
    console.log(`${this.name} is ${this.age} years old`);
  };
} as unknown as EmployeeConstructor;

const funcEmployee1 = new FunctionEmployee('张三', 18);

// 原型模式，相比构造函数，会把成员函数挂载在原型链，省内存
const PrototypeEmployee = function (this: EmployeeInstance, name: string, age: number) {
  this.name = name;
  this.age = age;
} as unknown as EmployeeConstructor;

PrototypeEmployee.prototype.say = function () {
  console.log(`${this.name} is ${this.age} years old`);
};

const prototypeEmployee1 = new PrototypeEmployee('张三', 18);

// 类模式，相比构造函数，会创建一个类，成员函数默认挂载在原型链，类会继承原型链上的成员函数
class ClassEmployee implements EmployeeInstance {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  say() {
    console.log(`${this.name} is ${this.age} years old`);
  }
}

const classEmployee1 = new ClassEmployee('张三', 18);

export { ClassEmployee, FunctionEmployee, PrototypeEmployee, classEmployee1, funcEmployee1, prototypeEmployee1 };
