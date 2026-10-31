# DSA 01: Lists (Dynamic Arrays)

Before we build our own data structures, we need to understand the one JavaScript gives us for free: the **array** (what other languages call a **dynamic array**). In this module "list" and "array" are used interchangeably, because a JS array *is* the dynamic-array concept. Almost every custom data structure we build later (stacks, queues, hash tables) will be built on top of it.

This lesson looks at JavaScript's array through a *data structures* lens: not "how do I use it" (you already know that), but "what is actually happening underneath, and how fast is it?"

---

## 1. What Is an Array, Really?

A plain **array** (the kind you'd find in C or Java) is a fixed-size, contiguous block of memory. Because every element is the same size and sits right next to the next one, the computer can jump straight to index `i` using simple arithmetic: `address = base_address + (i * element_size)`. This is why indexing an array is **O(1)** — constant time, regardless of how big the array is.

A **dynamic array** (Python's `list`, Java's `ArrayList`, C++'s `std::vector` — and, in practice, JavaScript's array) is an array that can grow. Under the hood, a JS array keeps enough room to grow into, so it has "spare room" without immediately needing to resize.

```js
const nums = [10, 20, 30];
console.log(nums[0]);   // O(1) — jumps straight to the memory slot
```

> **JS-specific note:** JavaScript arrays are objects with numeric keys under the hood, so engines like V8 have extra freedom in how they lay them out. Modern engines keep integer-indexed arrays in fast contiguous storage — for DSA purposes, treat a JS array exactly like a dynamic array. The one observable oddity: `typeof [1, 2]` is `"object"`, and `const a = [5]; a[9] = 1` leaves "holes" (empty slots) — avoid holes in DSA code.

---

## 2. Why Appending Is (Usually) O(1)

When you call `nums.push(x)`, if there's spare capacity, the engine just writes into the next free slot — O(1).

When the array is completely full, the engine has to:
1. Allocate a new, larger block of memory.
2. Copy every existing element into the new block — O(n).
3. Free the old block.

This resize is expensive, but it happens rarely, and when you average the cost over many pushes, the *amortized* cost per push is still **O(1)**. This is a classic and important DSA concept: **amortized time complexity**.

```js
const nums = [];
for (let i = 0; i < 5; i++) {
  nums.push(i);   // amortized O(1) each, even though a resize happens occasionally
}
```

---

## 3. Complexity Cheat Table

| Operation | Example | Time Complexity |
|---|---|---|
| Index access | `nums[i]` | O(1) |
| Index assignment | `nums[i] = x` | O(1) |
| Append | `nums.push(x)` | O(1) amortized |
| Pop from end | `nums.pop()` | O(1) |
| Pop from front | `nums.shift()` | O(n) — everything shifts left |
| Insert at front/middle | `nums.unshift(x)` / `splice` | O(n) — everything shifts |
| Search by value | `nums.includes(x)` / `indexOf` | O(n) |
| Delete by value | `indexOf` + `splice` | O(n) |
| Slice | `nums.slice(a, b)` | O(k), k = slice length |
| Length | `nums.length` | O(1) — cached by the engine |

**Key takeaway:** anything that touches the *front* or *middle* of an array costs O(n) because every following element has to physically shift over in memory. This is the single biggest reason linked lists exist (next lesson!).

---

## 4. List vs. Array vs. Linked List (preview)

| | JS Array | Linked List |
|---|---|---|
| Memory layout | Contiguous-ish | Scattered, connected by references |
| Random access `[i]` | O(1) | O(n) |
| Insert/delete at front | O(n) | O(1) |
| Insert/delete at end | O(1) amortized | O(1) if you track the tail |
| Cache friendliness | Great | Poor |

Neither is "better" — they trade off differently, and picking the right one for the job is the whole point of studying DSA.

---

## 5. Common List-Based Patterns Used in Algorithms

```js
// Two-pointer technique
function isPalindrome(s) {
  let left = 0;
  let right = s.length - 1;
  while (left < right) {
    if (s[left] !== s[right]) {
      return false;
    }
    left += 1;
    right -= 1;
  }
  return true;
}

// Sliding window
function maxSumSubarray(nums, k) {
  let windowSum = 0;
  for (let i = 0; i < k; i++) {
    windowSum += nums[i];
  }
  let best = windowSum;
  for (let i = k; i < nums.length; i++) {
    windowSum += nums[i] - nums[i - k];
    best = Math.max(best, windowSum);
  }
  return best;
}
```

---

## 📚 Resources

- **Docs:** [MDN — Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) · [javascript.info — Arrays](https://javascript.info/array)
- **YouTube:** [CS Dojo — Data Structures: Arrays](https://www.youtube.com/watch?v=gRAaXBGjR8g) — clear, time-tested explanation of arrays and complexity
- **Reference:** [Big-O Cheat Sheet](https://www.bigocheatsheet.com/) — canonical complexity tables

---

## 🧠 Try It Yourself

1. Write a function `timeIt(fn)` that times how long an operation takes (hint: `Date.now()` or `performance.now()`), then compare `unshift(x)` vs `push(x)` on an array of 100,000 items. Confirm which one is slower and explain why.
2. Implement `isPalindrome` and `maxSumSubarray` above from scratch without looking, then trace through them by hand on paper for a small input.
3. Explain in your own words (write it as a comment) why `array.shift()` is O(n) but `array.pop()` is O(1).
