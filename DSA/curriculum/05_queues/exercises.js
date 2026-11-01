// DSA Exercise 05: Queues
// Run this script with: node exercises.js


class Queue {
  constructor() {
    this._items = [];   // plain array is OK here; the lecture shows O(1) options
  }

  // TODO: Exercise 1
  enqueue(item) {
    // Write your solution here
  }

  // TODO: Exercise 2
  dequeue() {
    // Write your solution here
  }

  // TODO: Exercise 3
  peek() {
    // Write your solution here
  }

  isEmpty() {
    return this._items.length === 0;
  }
}


// TODO: Exercise 4
// Implement a fixed-size circular queue backed by a plain array of
// size `capacity`. Track front/rear indices manually with modulo arithmetic.
// Throw RangeError on enqueue-when-full or dequeue-when-empty.
class CircularQueue {
  constructor(capacity) {
    this.capacity = capacity;
    this.data = new Array(capacity).fill(null);
    this.front = 0;
    this.count = 0;
  }

  enqueue(item) {
    // Write your solution here
  }

  dequeue() {
    // Write your solution here
  }
}


// Main program
const q = new Queue();
q.enqueue("doc1");
q.enqueue("doc2");
q.enqueue("doc3");
console.log(q.dequeue());  // doc1
console.log(q.dequeue());  // doc2

const cq = new CircularQueue(3);
cq.enqueue("a");
cq.enqueue("b");
cq.enqueue("c");
console.log(cq.dequeue());  // a
cq.enqueue("d");       // should reuse freed slot
console.log(cq.dequeue());  // b
console.log(cq.dequeue());  // c
console.log(cq.dequeue());  // d
