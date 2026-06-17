export class LRUCache<K, V> {
  #cache: Map<K, V>;
  #limit: number;
  constructor(c: number) {
    this.#limit = c;
    this.#cache = new Map<K, V>();
  }
  get(k: K): V | null {
    const res = this.#cache.get(k);
    if (res) {
      this.#cache.delete(k);
      this.#cache.set(k, res);
    }

    return res ?? null;
  }
  put(k: K, v: V) {
    if (this.#cache.has(k)) {
      this.#cache.delete(k);
    }
    this.#cache.set(k, v);

    if (this.#cache.size > this.#limit) {
      const k = this.#cache.keys().next().value;
      if (k) {
        this.#cache.delete(k);
      }
    }
  }
}
