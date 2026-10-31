# DSA 06: Hash Tables

A **hash table** (JavaScript's `Map` and `Set`) stores key-value pairs and gives you **average O(1)** insert, lookup, and delete — no matter how large it gets. This is one of the most important data structures in all of computing.

---

## 1. The Core Idea

A hash table uses a **hash function** to convert a key into an integer, then uses that integer (modulo the table size) as an index into an underlying array (called "buckets").

```
key "apple" --> hash("apple") --> 7264891... --> % table_size --> index 4
```

Because computing a hash and jumping to an array index are both O(1), lookup is O(1) on average — you never have to scan through every key.

```js
// JS doesn't expose its built-in string hash function directly, but we can
// write our own (a classic "polynomial rolling hash"):
function stringHash(key) {
  let h = 0;
  for (const ch of key) {
    h = (h * 31 + ch.charCodeAt(0)) | 0;   // | 0 keeps it a 32-bit integer
  }
  return Math.abs(h);
}

console.log(stringHash("apple"));              // some integer (same in every run)
console.log(stringHash("apple") === stringHash("apple"));  // true — same input, same hash, always
```

> **JS-specific note:** Python's `hash()` is randomized between sessions for strings, so its value changes run to run. Our hand-rolled hash is deterministic — same input, same output, every time.

---

## 2. Building a (Simplified) Hash Table From Scratch

```js
class HashTable {
  constructor(capacity = 8) {
    this.capacity = capacity;
    this.buckets = Array.from({ length: capacity }, () => []);  // each bucket is an array of [key, value] pairs
  }

  _hash(key) {
    return stringHash(key) % this.capacity;
  }

  put(key, value) {
    const index = this._hash(key);
    const bucket = this.buckets[index];
    for (let i = 0; i < bucket.length; i++) {
      const [k, v] = bucket[i];
      if (k === key) {
        bucket[i] = [key, value];   // update existing key
        return;
      }
    }
    bucket.push([key, value]);      // insert new key
  }

  get(key) {
    const index = this._hash(key);
    const bucket = this.buckets[index];
    for (const [k, v] of bucket) {
      if (k === key) {
        return v;
      }
    }
    throw new Error(`Key not found: ${key}`);   // Python raises KeyError
  }

  remove(key) {
    const index = this._hash(key);
    const bucket = this.buckets[index];
    for (let i = 0; i < bucket.length; i++) {
      const [k, v] = bucket[i];
      if (k === key) {
        bucket.splice(i, 1);
        return;
      }
    }
    throw new Error(`Key not found: ${key}`);
  }
}
```

---

## 3. Collisions

Two different keys can hash to the *same* bucket index — this is called a **collision**. The example above handles collisions with **chaining**: each bucket is a small array, so colliding keys just live together in the same bucket. This is why lookup is "average" O(1) rather than "always" O(1) — a worst-case scenario where everything collides into one bucket degrades to O(n).

Other collision strategies:
- **Open addressing** — on collision, probe to the next available slot (linear probing, quadratic probing, double hashing).
- **Chaining** — what we implemented above; typically simpler and easier to learn from first (Python's real dict uses open addressing; V8's `Map` is a hash-table-backed structure too).

Good hash tables also **resize** (like dynamic arrays) once they get too full, to keep collisions rare.

---

## 4. Complexity Table

| Operation | Average Case | Worst Case |
|---|---|---|
| Insert | O(1) | O(n) — all keys collide |
| Lookup | O(1) | O(n) |
| Delete | O(1) | O(n) |

In practice, with a good hash function and resizing, worst case is extremely rare — this is why `Map` (and plain objects) are the workhorses of JavaScript.

---

## 5. The Built-in Hash Tables: `Map`, `Set`, and Plain Objects

```js
const prices = new Map([["apple", 1.50], ["banana", 0.50]]);
prices.set("cherry", 3.00);   // O(1) average insert
console.log(prices.get("apple"));  // O(1) average lookup -> 1.5
prices.delete("banana");      // O(1) average delete
console.log(prices.has("apple"));  // O(1) average membership check -> true

const uniqueIds = new Set([1, 2, 2, 3, 3, 3]);
console.log(uniqueIds);       // Set(3) { 1, 2, 3 } -- O(1) average membership + dedup
```

> **JS-specific note (differs from Python):** Python *only* allows hashable (immutable) keys. JS is the opposite — **anything** can be a `Map` key, including arrays and objects, because `Map` compares keys by identity (reference), not by contents. So `m.set([1, 2], "a")` works, but `[1,2] !== [1,2]` means two equal arrays are two different keys. Use strings (or a serialized key) when you want content-based keys. Plain objects work only with string/symbol keys — use `Map` for anything else.

---

## 📚 Resources

- **Docs:** [MDN — Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) · [MDN — Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) · [javascript.info — Map and Set](https://javascript.info/map-set)
- **YouTube:** [mycodeschool — Hashing / Hash Tables](https://www.youtube.com/watch?v=shs0KM3wKv8)
- **YouTube:** [Abdul Bari — Hashing](https://www.youtube.com/watch?v=mFY0J0hf4Zs)

---

## 🧠 Try It Yourself

1. Implement `HashTable` from scratch above, then test `put`, `get`, and `remove` with several keys that intentionally collide (hint: use a tiny `capacity` like 2 to force collisions).
2. Write a function `firstRepeatedChar(s)` that returns the first character that appears more than once in a string, using a hash table (`Set` or `Map`) to do it in O(n) instead of the naive O(n²) nested-loop approach.
3. Write `twoSum(nums, target)` that returns the indices of two numbers that add up to `target`, in O(n) time using a `Map` (the classic interview question).
4. Explain in a comment why `m.set([1,2], "a")` followed by `m.get([1,2])` returns `undefined` in JavaScript, even though it "works" for a Python dict.
