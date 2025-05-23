/**
 * 原型模式
 */
const Employee = function (name, age) {
  this.name = name;
  this.age = age;
};

Employee.prototype.say = () => {
  console.log(`${this.name} ${this.age}`);
};

const _e1 = new Employee('k1', 100);
const _e2 = new Employee('k2', 100);
