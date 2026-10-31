# Lecture 05: Dictionaries & Sets

Dictionaries and sets allow you to store collections of data where items are key-value pairs or unique values. In JavaScript, dictionaries are plain **objects**, and sets are the built-in **`Set`**.

---

## 1. Dictionaries (Objects)
A **dictionary** is a mutable collection of **key-value pairs**. In JavaScript it is defined using curly braces `{}` — the same syntax as object literals.

```js
const alien0 = { color: "green", points: 5 };
```

### Accessing Values
You access the value by specifying its key inside square brackets (or with dot notation):
```js
console.log(alien0["color"]);  // "green"
console.log(alien0.color);     // "green" (dot notation)
```

**Callout**: If the key does not exist, JavaScript does *not* raise an error like Python's `KeyError` — it quietly returns `undefined`:
```js
console.log(alien0["speed"]);  // undefined
```

To read with a default (Python's `get()`), use the `??` (nullish coalescing) operator, which falls back to the right side when the left side is `null` or `undefined`:
```js
console.log(alien0["speed"] ?? "slow");  // "slow"
```

### Modifying and Adding Key-Value Pairs
```js
// Modifying
alien0.color = "yellow";

// Adding
alien0.xPosition = 0;
```

### Removing Key-Value Pairs
- **`delete`**: Permanently deletes a key-value pair.
- To "pop" like Python (get the value *and* remove it), read first, then delete.

```js
const points = alien0.points;  // capture the value first
delete alien0.points;
```

**Callout**: Objects work best with *fixed, known* keys. If your keys are dynamic (built at runtime), prefer a **`Map`**: `const m = new Map(); m.set(key, value); m.get(key);`

---

## 2. Sets
A **set** is an unordered collection of **unique** elements. Sets do not allow duplicates. They are defined using the `Set` constructor (note: there is no `{1, 2, 3}` literal for sets in JavaScript — `{}` creates an object!).

```js
const fruits = new Set(["apple", "banana", "orange", "apple"]);
console.log(fruits);  // Output: Set(3) { 'apple', 'banana', 'orange' } (duplicates are removed!)
```

### Common Set Operations
- **`.add()`**: Adds an item.
- **`.delete()`**: Removes an item (returns `true` if it was there; never raises an error — no `remove`/`discard` split like Python).
- **`.has()`**: Checks membership (Python's `in`).

```js
fruits.add("kiwi");
console.log(fruits.has("banana"));  // true
fruits.delete("apple");
```

### Set operations
Modern JavaScript (Node 22+) has methods for the classic set math (Python's `|`, `&`, `-`, `^`):

```js
const a = new Set([1, 2, 3]);
const b = new Set([3, 4, 5]);

console.log(a.union(b));                 // Set(5) { 1, 2, 3, 4, 5 }  (Python's a | b)
console.log(a.intersection(b));          // Set(1) { 3 }              (Python's a & b)
console.log(a.difference(b));            // Set(2) { 1, 2 }           (Python's a - b)
console.log(a.symmetricDifference(b));   // Set(4) { 1, 2, 4, 5 }     (Python's a ^ b)
```

---

## 🧠 Try It Yourself
1. Create an object representing your friends' favorite programming languages. Key should be the person's name, value should be the language. Use `??` to look up a name that isn't in your object.
2. Given an array containing duplicates, convert it to a `Set` to remove duplicates, and then back to an array with `Array.from()`.
