class EventBus {
  constructor() {
    this.subscribers = {};
  }
  subscribe(event, callback) {
    if (this.subscribers[event]) {
      this.subscribers[event].push(callback);
    } else {
      this.subscribers[event] = [callback];
    }
  }
  publish(event, ...args) {
    if (this.subscribers[event]) {
      this.subscribers[event].forEach((callback) => callback(args));
    }
  }
  unsubscribe(event, callback) {
    if (this.subscribers[event]) {
      this.subscribers[event] = this.subscribers[event].filter((cb) => cb !== callback);
    }
  }
}

export default EventBus;
