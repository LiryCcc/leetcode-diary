import { describe, expect, it } from 'vitest';
import createCounter from './create-counter.ts'; // 确保路径正确

describe('createCounter', () => {
  it('应该使用默认值 0 进行初始化', () => {
    const counter = createCounter();
    expect(counter.get()).toBe(0);
  });

  it('应该使用提供的初始值进行初始化', () => {
    const customCounter = createCounter(100);
    expect(customCounter.get()).toBe(100);
  });

  it('increment 方法应该将计数器增加 1', () => {
    const counter = createCounter();
    counter.increment();
    expect(counter.get()).toBe(1);
    counter.increment();
    expect(counter.get()).toBe(2);
  });

  it('decrement 方法应该将计数器减少 1', () => {
    const counter = createCounter();
    expect(counter.get()).toBe(0);
    counter.decrement();
    expect(counter.get()).toBe(-1);
    counter.decrement();
    expect(counter.get()).toBe(-2);
  });

  it('set 方法应该将计数器设置为指定值', () => {
    const counter = createCounter();
    expect(counter.get()).toBe(0);
    counter.set(50);
    expect(counter.get()).toBe(50);
    counter.set(-25);
    expect(counter.get()).toBe(-25);
    counter.set(0);
    expect(counter.get()).toBe(0);
  });

  it('get 方法应该返回当前计数器的值', () => {
    const counter = createCounter();
    counter.set(42);
    expect(counter.get()).toBe(42);
    counter.increment(); // 43
    expect(counter.get()).toBe(43);
    counter.decrement(); // 42
    expect(counter.get()).toBe(42);
  });

  it('不同的计数器实例应该维护独立的状态', () => {
    const counter1 = createCounter(5);
    const counter2 = createCounter(10);

    counter1.increment(); // counter1: 6
    counter2.decrement(); // counter2: 9

    expect(counter1.get()).toBe(6);
    expect(counter2.get()).toBe(9);

    counter1.set(100); // counter1: 100
    counter2.set(200); // counter2: 200

    expect(counter1.get()).toBe(100);
    expect(counter2.get()).toBe(200);
  });

  it('应该能够执行一系列操作并保持正确的值', () => {
    const seqCounter = createCounter(0);
    seqCounter.increment(); // 1
    expect(seqCounter.get()).toBe(1);
    seqCounter.increment(); // 2
    expect(seqCounter.get()).toBe(2);
    seqCounter.decrement(); // 1
    expect(seqCounter.get()).toBe(1);
    seqCounter.set(10); // 10
    expect(seqCounter.get()).toBe(10);
    seqCounter.increment(); // 11
    expect(seqCounter.get()).toBe(11);
    seqCounter.decrement(); // 10
    expect(seqCounter.get()).toBe(10);
    seqCounter.decrement(); // 9
    expect(seqCounter.get()).toBe(9);
  });
});
