class LRUCache<K, V> {
  #cache: Map<K, V>;

  #capacity: number;

  constructor(capacity: number) {
    if (capacity <= 0) {
      throw new Error('capacity must >= 0');
    }
    this.#capacity = capacity;
    this.#cache = new Map<K, V>();
  }

  get(key: K): V | null {
    if (this.#cache.has(key)) {
      const v = this.#cache.get(key)!;
      this.#cache.delete(key);
      this.#cache.set(key, v);
      if (v) {
        return v;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  put(key: K, value: V): void {
    if (this.#cache.has(key)) {
      this.#cache.delete(key);
    } else if (this.#cache.size >= this.#capacity) {
      this.#cache.delete(this.#cache.keys().next().value!);
    }
    this.#cache.set(key, value);
  }
}

export default LRUCache;
