# DSA 04: Stacks

A **stack** is a linear data structure that follows **LIFO**: Last In, First Out. Think of a stack of plates — you can only add or remove from the top.

---

## 1. The Core Operations

| Operation | Description | Complexity |
|---|---|---|
| `push(x)` | add `x` to the top | O(1) |
| `pop()` | remove and return the top item | O(1) |
| `peek()` / `top()` | look at the top item without removing it | O(1) |
| `isEmpty()` | check if the stack has no items | O(1) |

All of these are O(1) — that's the entire point of a stack. It intentionally gives up flexibility (no random access!) in exchange for guaranteed-fast operations at one end.

---

## 2. Implementing a Stack with an Array

Arrays already support O(1) push/pop *from the end*, so they make a perfectly good stack — just never use `unshift(...)` or `shift()`, which touch the slow end.

```js
class Stack {
  constructor() {
    this._items = [];   // `_items` — the underscore is the informal "private" convention
  }

  push(item) {
    this._items.push(item);          // add to the "top" (end of array)
  }

  pop() {
    if (this.isEmpty()) {
      throw new RangeError("pop from an empty stack");
    }
    return this._items.pop();        // remove from the "top"
  }

  peek() {
    if (this.isEmpty()) {
      throw new RangeError("peek from an empty stack");
    }
    return this._items[this._items.length - 1];
  }

  isEmpty() {
    return this._items.length === 0;
  }

  size() {
    return this._items.length;
  }
}
```

> **JS-specific note:** JS's real privacy mechanism is the `#field` syntax (`#items`), which is enforced by the language. In study code you'll mostly see the older `_items` underscore convention, which is only an agreement between humans. Also note Python raises `IndexError`; the closest JS match is `RangeError`.

## 3. Implementing a Stack with a Linked List

You can also build a stack from nodes — push/pop just add/remove at the `head`:

```js
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedStack {
  constructor() {
    this.top = null;
  }

  push(data) {
    const node = new Node(data);
    node.next = this.top;
    this.top = node;
  }

  pop() {
    if (this.top === null) {
      throw new RangeError("pop from an empty stack");
    }
    const data = this.top.data;
    this.top = this.top.next;
    return data;
  }
}
```

---

## 4. Where Stacks Show Up

- **Function call stack** — every language runtime uses a stack to track function calls and local variables. This is literally why deep recursion causes a "stack overflow" (in Node: `RangeError: Maximum call stack size exceeded`).
- **Undo/redo** in editors.
- **Balanced brackets / parentheses matching.**
- **Depth-First Search (DFS)** on trees and graphs.
- **Expression evaluation** (converting infix to postfix, evaluating postfix).
- Browser **back button** history.

---

## 5. Classic Problem: Balanced Brackets

```js
function isBalanced(expression) {
  const stack = [];
  const pairs = { ")": "(", "]": "[", "}": "{" };
  for (const char of expression) {
    if ("([{".includes(char)) {
      stack.push(char);
    } else if (")]}".includes(char)) {
      if (stack.length === 0 || stack.pop() !== pairs[char]) {
        return false;
      }
    }
  }
  return stack.length === 0;
}

console.log(isBalanced("{[()()]}"));  // true
console.log(isBalanced("{[(])}"));    // false
```

---

## 📚 Resources

- **W3Schools:** [DSA Stacks](https://www.w3schools.com/dsa/dsa_data_stacks.php)
- **YouTube:** [mycodeschool — Stack Data Structure Introduction](https://www.youtube.com/watch?v=F1F2imiOJfk)
- **YouTube:** [Abdul Bari — Stack](https://www.youtube.com/watch?v=I37kGX-nZEE) — excellent for the theory side
- **GeeksforGeeks:** [Stack Data Structure](https://www.geeksforgeeks.org/stack-data-structure/)

---

## 🧠 Try It Yourself

1. Implement `Stack` (array-based) fully, then implement `LinkedStack` and confirm they behave identically for the same sequence of pushes/pops.
2. Implement `isBalanced` and test it against `"([)]"`, `"{[]}"`, and `"((("`.
3. Use a stack to reverse a string without using `.reverse()` or building a second array with `slice`.
4. Use a stack to check if a string is a palindrome (compare against your two-pointer solution from Lesson 01 — which approach uses more memory?).
