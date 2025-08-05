class ListNode {
  val: number;
  next: Pointer;
  constructor(val?: number, next?: Pointer) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

type Pointer = ListNode | null;

const reverseList = (head: Pointer): Pointer => {
  let prev: Pointer = null;
  let curr = head;
  while (curr !== null) {
    const nextTemp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextTemp;
  }
  return prev;
};

const middleNode = (head: Pointer): Pointer => {
  let slow = head;
  let fast = head;
  while (fast?.next && fast?.next.next) {
    slow = slow?.next || null;
    fast = fast?.next.next;
  }
  return slow;
};

/**
 * 1. 先找到中间节点
 * 2. 反转后半段链表
 * 3. 判断前半段和后半段是否相等
 */

function isPalindrome(head: Pointer): boolean {
  // let tail = middleNode(head)?.next || null;
  let tail = reverseList(middleNode(head)?.next || null);
  while (tail) {
    if (tail.val !== head?.val) {
      return false;
    }
    tail = tail.next;
    head = head.next;
  }
  return true;
}

export default isPalindrome;
