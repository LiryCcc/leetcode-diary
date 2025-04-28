class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(event, fn) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(fn);
  }
  off(event, fn) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter((f) => f !== fn);
    }
  }
  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach((fn) => fn(...args));
    }
  }
  once(event, fn) {
    this.on(event, (...args) => {
      this.off(event, fn);
      fn(...args);
    });
  }
}

export default EventEmitter;
