# DSA 05: Queues

A **queue** is a linear data structure that follows **FIFO**: First In, First Out. Think of a checkout line — whoever joined first gets served first.

---

## 1. The Core Operations

| Operation | Description | Complexity (good implementation) |
|---|---|---|
| `enqueue(x)` | add `x` to the back | O(1) |
| `dequeue()` | remove and return the front item | O(1) |
| `peek()` / `front()` | look at the front item | O(1) |
| `isEmpty()` | check if empty | O(1) |

---

## 2. Why NOT a Plain Array

It's tempting to do:

```js
const queue = [];
queue.push(4);     // enqueue: O(1), fine
queue.shift();      // dequeue: O(n) !! everything shifts left
```

`shift()` is O(n) because every remaining element has to shift over one slot. For a queue that's used heavily, this becomes a real performance problem.

> **JS-specific note:** Python fixes this with `collections.deque` (a doubly linked list of blocks with O(1) ops at both ends). JavaScript's standard library has **no built-in deque**. The idiomatic fixes are: (a) build the linked-list queue below, or (b) use a two-in-one array ("in"/"out" stacks) or a ring buffer. Building your own is the point of this lesson!

---

## 3. Implementing a Queue with a Linked List

```js
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.front = null;
    this.rear = null;
  }

  enqueue(data) {
    const node = new Node(data);
    if (this.rear === null) {
      this.front = node;
      this.rear = node;
      return;
    }
    this.rear.next = node;
    this.rear = node;
  }

  dequeue() {
    if (this.front === null) {
      throw new RangeError("dequeue from an empty queue");
    }
    const data = this.front.data;
    this.front = this.front.next;
    if (this.front === null) {
      this.rear = null;
    }
    return data;
  }
}
```

Keeping a `rear` pointer is what makes `enqueue` O(1) instead of O(n).

---

## 4. Variations

- **Circular queue** — uses a fixed-size array and wraps the index around with modulo, avoiding wasted space. Common in producer/consumer buffers.
- **Priority queue** — instead of FIFO, items come out in priority order. Usually implemented with a **heap**. Python ships `heapq`; JavaScript ships **no heap** — you either keep a sorted array for small inputs or build a small `MinHeap` class (a classic exercise).

```js
// A minimal (if inefficient) priority queue for small inputs:
const pq = [];
pq.push([2, "do laundry"]);
pq.push([1, "fix critical bug"]);
pq.push([3, "water the plants"]);
pq.sort((a, b) => a[0] - b[0]);   // sort by priority number ascending
console.log(pq.shift());  // [1, 'fix critical bug'] -- lowest number = highest priority
```

---

## 5. Where Queues Show Up

- **Breadth-First Search (BFS)** on trees and graphs.
- **Task scheduling** (print queues, CPU task queues, message queues like RabbitMQ/Kafka conceptually).
- **Buffering** — streaming data, keyboard/network input buffers.

---

## 📚 Resources

- **W3Schools:** [DSA Queues](https://www.w3schools.com/dsa/dsa_data_queues.php)
- **YouTube:** [mycodeschool — Queue Data Structure Introduction](https://www.youtube.com/watch?v=XuCbpw6Bj1U)
- **YouTube:** [Abdul Bari — Queue](https://www.youtube.com/watch?v=D6gu-_tmEpQ)

---

## 🧠 Try It Yourself

1. Implement `Queue` using a plain array internally, then implement it again using your own linked-list nodes (no arrays at all) — compare the two on 10,000 enqueue/dequeue pairs.
2. Use a queue to simulate a print queue: enqueue 5 "documents", then dequeue and print them one at a time in order.
3. Implement a fixed-size **circular queue** backed by an array of size `n`, tracking `front`/`rear` indices and wrapping with `% n`.
4. Build a simple priority-based to-do list (sorted array or `MinHeap`) that always pops the most urgent task first.
