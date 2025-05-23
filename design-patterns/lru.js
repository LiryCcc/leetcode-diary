const LRUCache = function (c) {
  this.limit = c;
  this.cache = new Map();
};

LRUCache.prototype.get = function (k) {
  let t;

  if (this.cache.has(k)) {
    t = this.cache.get(k);

    this.cache.delete(k);
    this.cache.set(k, t);
  }

  return t ?? -1;
};

LRUCache.prototype.put = function (k, v) {
  if (this.cache.has(k)) {
    this.cache.delete(k);
  }
  this.cache.set(k, v);

  if (this.cache.size > this.limit) {
    this.cache.delete(this.cache.keys().next().value);
  }
};
