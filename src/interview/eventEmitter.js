class EventEmitter {
  constructor() {
    this.events = {};
  }
  // 触发
  emit(event, ...args) {
    const cbs = this.events[event];
    if (!cbs) {
      console.log('no this event');
      return this;
    }
    cbs.forEach((cb) => {
      cb(...args);
    });
    return this;
  }
  // 监听
  on(event, cb) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(cb);
    return this;
  }
  // 移除监听
  off(event, cb) {
    const func = (...args) => {
      this.off(event, func);
      cb(...args);
    };
    this.on(event, func);
  }
  once(event, cb) {
    if (!cb) {
      this.events[event] = null;
    } else {
      this.events[event] = this.events[event].filter((it) => it !== cb);
    }
    return this;
  }
}

export default EventEmitter;
