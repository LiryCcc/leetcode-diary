class Sub {
  constructor() {
    this.observers = [];
  }
  add(observer) {
    this.observers.push(observer);
  }
  remove(observer) {
    this.observers = this.observers.filter((o) => o !== observer);
  }
  notify() {}
}

export default Sub;
