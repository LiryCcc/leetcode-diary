const Singleton = (() => {
  let instance = null;
  class User {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }
  }
  return (name, age) => {
    if (!instance) {
      instance = new User(name, age);
    }
    return instance;
  };
})();
console.log(Singleton());
