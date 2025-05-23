class Singleton {
  constructor(name, age) {
    if (!Singleton.instance) {
      this.name = name;
      this.age = age;
      Singleton.instance = this;
    }
    return Singleton.instance;
  }
}
console.log(new Singleton(11, 100) === new Singleton('12', 120));
