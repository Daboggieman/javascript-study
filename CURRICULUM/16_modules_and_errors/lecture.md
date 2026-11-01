# Lecture 16: Modules, Requires, and Error Handling

JavaScript becomes much more powerful when you reuse code from modules and handle problems gracefully.

---

## 1. Requiring Modules
A module is a file containing JavaScript code. Built-in modules are loaded with `require()`:

```js
const path = require("node:path");

console.log(path.join("data", "file.txt"));  // data/file.txt
```

You can also require specific exports by destructuring:

```js
const { randomUUID } = require("node:crypto");

console.log(randomUUID());
```

**Callout**: Some features are *global* and need no require at all — `Math`, `JSON`, `Date`, `console`, and `process`. Python's `import math` simply becomes `Math.sqrt(16)`.

### Sharing your own code
A file exposes values through `module.exports`, and other files `require` them by relative path:

```js
// utils.js
module.exports.add = (a, b) => a + b;

// main.js
const { add } = require("./utils");
console.log(add(2, 3));  // 5
```

---

## 2. Useful Built-in Modules

```js
const crypto = require("node:crypto");
const os = require("node:os");

console.log(crypto.randomInt(1, 11));        // random integer 1–10
console.log(os.homedir());                   // e.g. /home/user
console.log([1, 2, 3, 4].reduce((a, b) => a + b, 0) / 4);  // mean = 2.5 (no statistics module — use reduce)
```

---

## 3. Handling Errors with `try` and `catch`

```js
try {
  const number = Number("abc");  // NaN, not an error!
  if (Number.isNaN(number)) {
    throw new TypeError("That was not a valid number.");
  }
} catch (err) {
  console.log("That was not a valid number.");
}
```

**Callout**: Converting a bad string with `Number()` does not throw in JavaScript — it returns `NaN`. You have to check for it yourself (or use `parseInt` and `Number.isNaN`).

This lets your program recover from mistakes instead of crashing.

---

## 4. Debugging Basics
A few useful debugging habits:
- Read the error message carefully (Node's stack traces show the file and line).
- Print values before and after key steps with `console.log`.
- Check whether input was converted correctly (`typeof`, `Number.isNaN`).
- Test small pieces of code separately — or in the REPL (`node` with no arguments).

---

## 🧠 Try It Yourself
1. Use the global `Math` object to calculate the square root of 81.
2. Write a `try/catch` block that handles invalid input.
3. Use `console.log()` to debug a small calculation.
