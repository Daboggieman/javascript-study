# Queue Circular Buffer

Source: queue_circular_buffer

Files to submit
- solution.js

Allowed functions
- --allow-builtin

Instructions
Implement a fixed-size `CircularQueue` backed by a plain array of size `capacity`. Support `enqueue(x)` (throw a `RangeError` if full), `dequeue()` (throw a `RangeError` if empty, else remove and return the front item), and `isFull()` / `isEmpty()`. Use modulo arithmetic to wrap indices instead of shifting elements.

Expected function
```js
class CircularQueue {
  constructor(capacity) {}

  enqueue(item) {}

  dequeue() {}

  isFull() {}

  isEmpty() {}
}
```


Here is a possible program to test your function :
```js
const cq = new CircularQueue(3);
cq.enqueue("a");
cq.enqueue("b");
cq.enqueue("c");
console.log(cq.isFull());
console.log(cq.dequeue());
cq.enqueue("d");
console.log(cq.dequeue());
console.log(cq.dequeue());
console.log(cq.dequeue());
```

And its output :
```text
true
a
b
c
d
```
