class Sub {
  constructor() {
    this.observers = [];
  }
  add(observer) {
    this.observers.push(observer);
  }
  remove(observer) {
    this.boservers = this.observers.filter((o) => o !== observer);
  }
  notify() {}
}

export default Sub;
