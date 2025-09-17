/**
设计一个数字容器系统，可以实现以下功能：

在系统中给定下标处 插入 或者 替换 一个数字。
返回 系统中给定数字的最小下标。
请你实现一个 NumberContainers 类：

NumberContainers() 初始化数字容器系统。
void change(int index, int number) 在下标 index 处填入 number 。如果该下标 index 处已经有数字了，那么用 number 替换该数字。
int find(int number) 返回给定数字 number 在系统中的最小下标。如果系统中没有 number ，那么返回 -1 。


示例：

输入：
["NumberContainers", "find", "change", "change", "change", "change", "find", "change", "find"]
[[], [10], [2, 10], [1, 10], [3, 10], [5, 10], [10], [1, 20], [10]]
输出：
[null, -1, null, null, null, null, 1, null, 2]

解释：
NumberContainers nc = new NumberContainers();
nc.find(10); // 没有数字 10 ，所以返回 -1 。
nc.change(2, 10); // 容器中下标为 2 处填入数字 10 。
nc.change(1, 10); // 容器中下标为 1 处填入数字 10 。
nc.change(3, 10); // 容器中下标为 3 处填入数字 10 。
nc.change(5, 10); // 容器中下标为 5 处填入数字 10 。
nc.find(10); // 数字 10 所在的下标为 1 ，2 ，3 和 5 。因为最小下标为 1 ，所以返回 1 。
nc.change(1, 20); // 容器中下标为 1 处填入数字 20 。注意，下标 1 处之前为 10 ，现在被替换为 20 。
nc.find(10); // 数字 10 所在下标为 2 ，3 和 5 。最小下标为 2 ，所以返回 2 。

 */

export class LiryMinHeap {
  #data: number[];

  constructor() {
    this.#data = [];
  }

  push(val: number) {
    this.#data.push(val);
    this.#bubbleUp(this.#data.length - 1);
  }

  pop(): number | undefined {
    if (this.#data.length === 0) return undefined;
    const min = this.#data[0];
    const last = this.#data.pop()!;
    if (this.#data.length > 0) {
      this.#data[0] = last;
      this.#bubbleDown(0);
    }
    return min;
  }

  peek(): number | undefined {
    return this.#data[0];
  }

  #bubbleUp(idx: number) {
    while (idx > 0) {
      const parent = Math.floor((idx - 1) / 2);
      if (this.#data[parent] <= this.#data[idx]) break;
      [this.#data[parent], this.#data[idx]] = [this.#data[idx], this.#data[parent]];
      idx = parent;
    }
  }

  #bubbleDown(idx: number) {
    const length = this.#data.length;
    while (true) {
      const left = idx * 2 + 1;
      const right = left + 1;
      let smallest = idx;

      if (left < length && this.#data[left] < this.#data[smallest]) {
        smallest = left;
      }
      if (right < length && this.#data[right] < this.#data[smallest]) {
        smallest = right;
      }
      if (smallest === idx) break;
      [this.#data[smallest], this.#data[idx]] = [this.#data[idx], this.#data[smallest]];
      idx = smallest;
    }
  }
}

export class NumberContainers {
  #nums: Map<number, number>; // index -> number
  #heaps: Map<number, LiryMinHeap>; // number -> heap of indexes

  constructor() {
    this.#nums = new Map();
    this.#heaps = new Map();
  }

  change(index: number, number: number): void {
    this.#nums.set(index, number); // 更新 index 对应数字

    if (!this.#heaps.has(number)) {
      this.#heaps.set(number, new LiryMinHeap());
    }
    this.#heaps.get(number)!.push(index);
  }

  find(number: number): number {
    if (!this.#heaps.has(number)) return -1;
    const heap = this.#heaps.get(number)!;

    // 惰性清理：堆顶元素不是该值或者已被覆盖则 pop 掉
    while (heap.peek() !== undefined && this.#nums.get(heap.peek()!) !== number) {
      heap.pop();
    }

    return heap.peek() ?? -1;
  }
}

/**
 * Your NumberContainers object will be instantiated and called as such:
 * var obj = new NumberContainers()
 * obj.change(index,number)
 * var param_2 = obj.find(number)
 */
