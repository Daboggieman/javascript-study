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

> **JS-specific note:** Python's standard fix is `collections.deque` (O(1) at both ends). JavaScript ships **no built-in deque** — the two idiomatic fixes are the linked-list queue below, or the head-index array trick shown next.

---

## 3. No `deque` in JavaScript — Build Your Own

The pragmatic array-based trick: never `shift()`. Instead, keep a `head` *index* that crawls forward as you dequeue, and periodically compact the array when too much of its front is dead space. Dequeue becomes O(1) amortized.

```js
class ArrayDeque {
  constructor() {
    this._items = [];
    this._head = 0;                 // index of the logical front
  }

  enqueue(item) {
    this._items.push(item);         // O(1) amortized
  }

  dequeue() {
    if (this._head >= this._items.length) {
      throw new RangeError("dequeue from an empty queue");
    }
    const item = this._items[this._head];
    this._head += 1;                // O(1): just advance the front
    // occasionally reclaim dead space so the array doesn't grow forever
    if (this._head > 64 && this._head * 2 > this._items.length) {
      this._items = this._items.slice(this._head);
      this._head = 0;
    }
    return item;
  }
}
```

---

## 4. Implementing a Queue with a Linked List

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

## 5. Variations

- **Circular queue** — uses a fixed-size array and wraps the index around with modulo, avoiding wasted space. Common in producer/consumer buffers.
- **Priority queue** — instead of FIFO, items come out in priority order. Usually implemented with a **heap**. Python ships `heapq`; JavaScript ships **no heap**, so for small inputs a sorted array is fine, and for real workloads you build a small `MinHeap` class (a classic exercise).
- **Deque (double-ended queue)** — insertion/removal from both ends, generalizes both stacks and queues. In JS, the `ArrayDeque` from §3 (with an added `pop`/`popBack`) is your building block.

```js
const pq = [];
pq.push([2, "do laundry"]);
pq.push([1, "fix critical bug"]);
pq.push([3, "water the plants"]);
pq.sort((a, b) => a[0] - b[0]);   // sort by priority number ascending
console.log(pq.shift());  // [1, 'fix critical bug'] -- lowest number = highest priority
```

---

## 6. Where Queues Show Up

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

1. Implement `Queue` using the `ArrayDeque` trick internally, then implement it again using your own linked-list nodes (no arrays at all).
2. Use a queue to simulate a print queue: enqueue 5 "documents", then dequeue and print them one at a time in order.
3. Implement a fixed-size **circular queue** backed by an array of size `n`, tracking `front`/`rear` indices and wrapping with `% n`.
4. Build a simple priority-based to-do list (sorted array or a `MinHeap`) that always pops the most urgent task first.
