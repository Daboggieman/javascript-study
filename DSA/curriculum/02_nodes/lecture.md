# DSA 02: Nodes

Every linked data structure — linked lists, trees, graphs — is built from one tiny, humble building block: the **node**. If you understand nodes deeply, linked lists/trees/graphs are just "different ways of connecting nodes together."

---

## 1. What Is a Node?

A node is simply an object that bundles together:
1. **Data** — the value it holds.
2. **A reference (pointer)** to one or more other nodes.

```js
class Node {
  constructor(data) {
    this.data = data;      // the payload
    this.next = null;      // reference to the next node (null = "points to nothing")
  }
}
```

That's it. That's the entire idea. Everything else in this DSA module is variations on this theme:
- A **linked list node** has one `next` pointer (or two, for doubly linked).
- A **binary tree node** has `left` and `right` pointers instead of `next`.
- A **graph node** ("vertex") can have any number of neighbors.

> **JS-specific note:** JS has both `null` ("intentionally nothing") and `undefined` ("never assigned"). In DSA code we set `next = null` explicitly; a field you never assigned reads back as `undefined`. Always compare with `===` / `!==`.

---

## 2. Nodes Live on the Heap, Connected by References

Unlike an array (contiguous memory), nodes can live *anywhere* in memory. What connects them isn't physical closeness — it's the `next` (or `left`/`right`) property holding a **reference** to another node object.

```js
const a = new Node("A");
const b = new Node("B");
const c = new Node("C");

a.next = b;
b.next = c;
// a -> b -> c -> null
```

Drawing this on paper as boxes and arrows is the single most useful habit you can build in this module. Always sketch it before you code it.

---

## 3. Traversing a Chain of Nodes

Because there's no index to jump to, the *only* way to reach the third node is to walk through the first and second:

```js
let current = a;
while (current !== null) {
  console.log(current.data);
  current = current.next;
}
// A
// B
// C
```

This is why node-based structures are O(n) for random access, but excel at O(1) insertion/removal *once you already have a reference to the right spot*.

---

## 4. A Node Can Carry Any Data

Nodes aren't limited to numbers or strings — the `data` field can be anything: an object, an array, even another node.

```js
class Employee {
  constructor(name, salary) {
    this.name = name;
    this.salary = salary;
  }
}

const empNode = new Node(new Employee("Ada", 95000));
console.log(empNode.data.name);  // Ada
```

---

## 📚 Resources

- **W3Schools:** [JavaScript Classes](https://www.w3schools.com/js/js_classes.asp) (nodes are just classes!)
- **YouTube:** [mycodeschool — Introduction to Linked List](https://www.youtube.com/watch?v=NobHlGUjV3g) — one of the most time-tested DSA explainer channels
- **YouTube:** [freeCodeCamp — Data Structures Easy to Advanced](https://www.youtube.com/watch?v=RBSGKlAvoiM)

---

## 🧠 Try It Yourself

1. Create three `Node` objects manually and link them together, then write a loop that prints all their data.
2. Write a function `countNodes(head)` that counts how many nodes are in a chain starting at `head`.
3. Draw (on paper, then describe in a comment) what happens in memory when you set `b.next = null` after step 2's list `a -> b -> c`. Is `c` still reachable from `a`? Why does this matter for garbage collection?
