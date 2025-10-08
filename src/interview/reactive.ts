export type Effect = () => void;
export type Nullable<T> = T | null;
export type ObjectKey = ReturnType<typeof Reflect.ownKeys>[number];

let activeEffect: Nullable<Effect> = null;
const targetMap = new WeakMap<object, Map<ObjectKey, Set<Effect>>>();

export const trigger = (target: object, key: ObjectKey) => {
  const depsMap = targetMap.get(target);
  if (depsMap) {
    const deps = depsMap.get(key);
    deps?.forEach((effect) => effect());
  }
};

export const track = (target: object, key: ObjectKey): void => {
  if (activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      depsMap = new Map();
      targetMap.set(target, depsMap);
    }
    let deps = depsMap.get(key);
    if (!deps) {
      deps = new Set();
      depsMap.set(key, deps);
    }
    deps.add(activeEffect);
  }
};

export const reactive = <T extends object>(target: T): T => {
  return new Proxy(target, {
    get(target, key, receiver) {
      const result = Reflect.get(target, key, receiver);
      track(target, key);
      if (typeof result === 'object' && result !== null) {
        return reactive(result);
      } else {
        return result;
      }
    },
    set(target, key, newValue, receiver) {
      const oldValue = Reflect.get(target, key, receiver);
      if (oldValue === newValue) {
        return true;
      } else {
        const result = Reflect.set(target, key, newValue, receiver);
        trigger(target, key);
        return result;
      }
    },
    deleteProperty(target, key) {
      const result = Reflect.deleteProperty(target, key);
      trigger(target, key);
      return result;
    },
    ownKeys(target) {
      Reflect.ownKeys(target).forEach((key) => track(target, key));
      return Reflect.ownKeys(target);
    }
  });
};

export const ref = <T>(value: T): { value: T } => {
  return reactive({ value });
};

export const effect = (e: Effect) => {
  activeEffect = e;
  e();
  activeEffect = null;
};

const a = reactive([1]);

effect(() => {
  console.log(`a ${a.join(' ')}`);
  (() => {
    console.log(`em a ${a.join(' ')}`);
  })();
});

a.push(2);
