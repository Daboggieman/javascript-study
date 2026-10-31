# Lecture 12: Built-in Modules

Node.js ships with a rich set of built-in modules that provide solutions to many common programming tasks. It is referred to as "batteries included".

---

## 1. What are Built-in Modules?
A collection of pre-written modules that are distributed with Node.js. You do not need to install them with `npm`. Simply use the `require()` function.

---

## 2. Commonly Used Modules

### `Math` (global — no require needed)
Provides mathematical functions:
```js
console.log(Math.sqrt(16));   // 4 (square root)
console.log(Math.pow(2, 3));  // 8 (exponentiation)
console.log(Math.PI);         // 3.141592653589793
```

### `crypto.randomInt` / `Math.random` (randomness)
JavaScript has no `random` module; randomness comes from global `Math` and Node's `crypto`:
```js
const crypto = require("node:crypto");

console.log(Math.floor(Math.random() * 6) + 1);  // Random integer 1–6 (die roll)
console.log(Math.random());                      // Random number between 0.0 and 1.0
console.log(crypto.randomInt(0, 2));             // Cryptographically secure random integer
```
For "pick a random item from an array", index it with a random integer: `arr[Math.floor(Math.random() * arr.length)]`.

### `Date` (global — no require needed)
Provides date and time handling:
```js
const now = new Date();
console.log(now);              // Current date and time
console.log(now.getFullYear()); // Current year
console.log(now.toISOString().slice(0, 10));  // YYYY-MM-DD
```

### `process` (global — the `sys`/`os` of Node)
Provides operating system and runtime information:
```js
console.log(process.cwd());     // Get current working directory
console.log(process.argv);      // Command line arguments passed to the script
console.log(process.version);   // Node.js version information
```

### Counting with objects and `reduce`
Node has no `collections.Counter`; the idiomatic way to count is a plain object (or `Map`) built with `reduce`:
```js
const words = ["apple", "banana", "apple", "orange", "banana", "apple"];
const counts = words.reduce((acc, word) => {
  acc[word] = (acc[word] ?? 0) + 1;
  return acc;
}, {});
console.log(counts);  // { apple: 3, banana: 2, orange: 1 }
```

---

## 🧠 Try It Yourself
1. Use `Math.random` to simulate a rolling die: generate random numbers from 1 to 6.
2. Use the `Date` object to calculate the number of days between today and your next birthday.
