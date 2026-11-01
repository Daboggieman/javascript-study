# DSA 03: Linked Lists

A **linked list** is a chain of nodes where each node points to the next. Unlike an array, there's no contiguous memory and no index-based jump — you always start at the `head` and walk forward.

---

## 1. Singly Linked List

Each node has `data` and `next` only. The list itself just needs to remember the `head` (and optionally a `tail` for fast appends).

```js
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  pushFront(data) {
    const newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
  }

  pushBack(data) {
    const newNode = new Node(data);
    if (this.head === null) {
      this.head = newNode;
      return;
    }
    let current = this.head;
    while (current.next !== null) {
      current = current.next;
    }
    current.next = newNode;
  }

  display() {
    const values = [];
    let current = this.head;
    while (current !== null) {
      values.push(String(current.data));
      current = current.next;
    }
    console.log(values.length > 0 ? values.join(" -> ") : "EMPTY");
  }
}
```

> **JS-specific note:** methods are declared directly in the class body — no `self`, no `def`. Inside a method, `this` refers to the instance, but only when the method is *called on the object* (`ll.pushFront(3)`). If you detach a method and call it on its own, `this` is `undefined` — keep calls attached.

---

## 2. Complexity Table

| Operation | Singly Linked List | JS Array |
|---|---|---|
| Access by index | O(n) | O(1) |
| Insert at front | O(1) | O(n) |
| Insert at back (no tail pointer) | O(n) | O(1) amortized |
| Insert at back (with tail pointer) | O(1) | O(1) amortized |
| Delete at front | O(1) | O(n) |
| Search by value | O(n) | O(n) |

**Rule of thumb:** if your program does lots of insert/delete at the *front*, use a linked list. If it does lots of random-access reads, use an array.

---

## 3. Doubly Linked List (each node also has `prev`)

```js
class DNode {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}
```

Doubly linked lists allow O(1) deletion of a node *you already have a reference to* (no need to find its predecessor), and can be walked in both directions. Python ships this as `collections.deque`; JavaScript has **no built-in deque**, so this is the shape you build yourself when you need fast two-ended operations.

---

## 4. Circular Linked List

The last node's `next` points back to the `head` instead of `null`. Useful for round-robin scheduling, buffering, and things like the Josephus problem.

```js
// tail.next = head   // this one line turns a list circular
```

---

## 5. Reversing a Linked List (a DSA classic)

```js
function reverse(head) {
  let prev = null;
  let current = head;
  while (current !== null) {
    const nextNode = current.next;   // save it before we overwrite
    current.next = prev;             // reverse the pointer
    prev = current;
    current = nextNode;
  }
  return prev;   // new head
}
```

---

## 📚 Resources

- **W3Schools:** [JavaScript Classes](https://www.w3schools.com/js/js_classes.asp) · [DSA Linked Lists](https://www.w3schools.com/dsa/dsa_data_linkedlists.php)
- **YouTube:** [mycodeschool — Linked List Insertion](https://www.youtube.com/watch?v=6IZ8p9y1DOc)
- **YouTube:** [William Fiset — Linked Lists](https://www.youtube.com/watch?v=vNAdEo2CB7Y) — algorithm-focused, very thorough
- **Eloquent JavaScript:** [Data Structures chapter](https://eloquentjavascript.net/04_data.html)

---

## 🧠 Try It Yourself

1. Implement `pushFront`, `pushBack`, and `display` from scratch, then add a `popFront()` method.
2. Implement `reverse(head)` and verify it on a 5-element list by printing before and after.
3. Implement a `findMiddle(head)` function using the classic **slow/fast pointer** technique (fast moves 2 steps for every 1 step of slow) — this finds the middle node in a single pass.
4. Convert your singly linked list into a doubly linked list by adding `prev` pointers, then write a `displayBackwards()` method.
