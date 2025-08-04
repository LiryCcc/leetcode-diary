type EventHandler = <T>(payload?: T) => void;

class EventBus {
  #events: Map<string, EventHandler[]>;
  constructor() {
    this.#events = new Map();
  }

  on(event: string, handler: EventHandler): void {
    const handlers = this.#events.get(event);
    if (handlers) {
      this.#events.set(event, [...handlers, handler]);
    } else {
      this.#events.set(event, [handler]);
    }
  }

  off(event: string, handler: EventHandler): void {
    const handlers = this.#events.get(event);
    if (handlers) {
      this.#events.set(
        event,
        handlers.filter((h) => {
          return h !== handler;
        })
      );
    }
  }

  emit(event: string, payload?: unknown): void {
    const handlers = this.#events.get(event);
    if (handlers) {
      handlers.forEach((handler) => handler(payload));
    }
  }

  once(event: string, handler: EventHandler): void {
    const onceHandler: EventHandler = (payload: unknown) => {
      handler(payload);
      this.off(event, onceHandler);
    };
    this.on(event, onceHandler);
  }

  clear(event?: string) {
    if (event) {
      this.#events.delete(event);
    } else {
      this.#events.clear();
    }
  }
}

export default EventBus;
