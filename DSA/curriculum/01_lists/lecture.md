# DSA 01: Lists (Dynamic Arrays)

Before we build our own data structures, we need to understand the one JavaScript gives us for free: the **array**. In most other languages this concept is called a **dynamic array**, and almost every custom data structure we build later (stacks, queues, hash tables) will be built on top of it.

This lesson looks at JavaScript's array through a *data structures* lens: not "how do I use it" (you already know that), but "what is actually happening underneath, and how fast is it?"

---

## 1. What Is an Array, Really?

A plain **array** (the kind you'd find in C or Java) is a fixed-size, contiguous block of memory. Because every element is the same size and sits right next to the next one, the computer can jump straight to index `i` using simple arithmetic: `address = base_address + (i * element_size)`. This is why indexing an array is **O(1)** — constant time, regardless of how big the array is.

A **dynamic array** (JavaScript's array, Java's `ArrayList`, C++'s `std::vector`) is an array that can grow. Under the hood, a JavaScript engine keeps a contiguous block of memory that's usually a bit *bigger* than it needs, so it has "spare room" to grow into without immediately needing to resize.

```js
const nums = [10, 20, 30];
console.log(nums[0]);   // O(1) — jumps straight to the memory slot
```

> **JS-specific note:** JavaScript arrays are objects with numeric keys under the hood, so engines like V8 have freedom in how they lay them out. Modern engines keep integer-indexed arrays in fast contiguous storage — for DSA purposes, treat a JS array exactly like a dynamic array. The one observable oddity: `typeof [1, 2]` is `"object"`, and setting `nums[9] = 1` on a 2-element array leaves "holes" (empty slots) — avoid holes in DSA code.

---

## 2. Why Appending Is (Usually) O(1)

When you call `nums.push(x)`, if there's spare capacity, the engine just writes into the next free slot — O(1).

When the array is completely full, the engine has to:
1. Allocate a new, larger block of memory (engines typically grow by a constant factor, like Python's ~1.125x).
2. Copy every existing element into the new block — O(n).
3. Free the old block.

This resize is expensive, but it happens rarely, and when you average the cost over many appends, the *amortized* cost per append is still **O(1)**. This is a classic and important DSA concept: **amortized time complexity**.

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
| Insert at front/middle | `nums.unshift(x)` / `splice` | O(n) — everything shifts right |
| Search by value | `nums.includes(x)` | O(n) |
| Delete by value | `indexOf` + `splice` | O(n) |
| Slice | `nums.slice(a, b)` | O(k), k = slice length |
| Length | `nums.length` | O(1) — the engine caches this |

**Key takeaway:** anything that touches the *front* or *middle* of a JavaScript array costs O(n) because every following element has to physically shift over in memory. This is the single biggest reason linked lists exist (next lesson!).

---

## 4. List vs. Array vs. Linked List (preview)

| | JavaScript array | Linked List |
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
  const right = s.length - 1;
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

- **W3Schools:** [JavaScript Arrays](https://www.w3schools.com/js/js_arrays.asp) · [Array Methods](https://www.w3schools.com/js/js_array_methods.asp)
- **YouTube:** [CS Dojo — Data Structures: Arrays](https://www.youtube.com/watch?v=gRAaXBGjR8g) — clear, time-tested explanation of arrays and complexity
- **YouTube:** [Web Dev Simplified — Arrays explained](https://www.youtube.com/watch?v=7W_kimBLUcs)
- **Docs:** [MDN — Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) · [Big-O Cheat Sheet](https://www.bigocheatsheet.com/) — canonical complexity references

---

## 🧠 Try It Yourself

1. Write a function `timeIt(fn)` that times how long an operation takes, then compare `unshift(0, x)`-style front inserts vs `push(x)` on an array of 100,000 items. Confirm which one is slower and explain why.
2. Implement `isPalindrome` and `maxSumSubarray` above from scratch without looking, then trace through them by hand on paper for a small input.
3. Explain in your own words (write it as a comment) why `array.shift()` is O(n) but `array.pop()` is O(1).
