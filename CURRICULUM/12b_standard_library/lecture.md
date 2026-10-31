# Lecture 12b: Built-in Modules

Node.js's built-in modules give you powerful tools without installing anything extra. This lesson introduces commonly used modules and when to use them.

---

## 1. `fs` and `path`
Use `fs` for file system tasks and `path` for path handling (Python's `os` / `os.path`).

```js
const fs = require("node:fs");
const path = require("node:path");
console.log(process.cwd());
console.log(fs.readdirSync("."));
console.log(path.join("data", "file.txt"));
```

---

## 2. `process`
Use the global `process` object to access command-line arguments and Node.js runtime information (Python's `sys`).

```js
console.log(process.argv);
console.log(process.version);
```

**Callout**: `process.argv[0]` is the node binary and `process.argv[1]` is your script — the user's actual arguments start at index 2.

---

## 3. `Math` and randomness
`Math` (global) provides mathematical functions; `crypto.randomInt` generates pseudo-random values (Python's `random`).

```js
const crypto = require("node:crypto");
console.log(Math.sqrt(25));
console.log(crypto.randomInt(1, 11));  // random integer 1–10
```

---

## 4. `Date`
Work with dates and times (global, no require).

```js
const now = new Date();
console.log(now);
```

---

## 5. `JSON`
Store and load structured data (global, no require needed).

```js
const data = { name: "Jane", age: 30 };
console.log(JSON.stringify(data));
```

---

## 6. `crypto` survey
The `crypto` module covers hashing, randomness, and more. A quick survey of what you can do without installing anything:

```js
const crypto = require("node:crypto");
console.log(crypto.randomUUID());             // e.g. '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
console.log(crypto.createHash("sha256").update("hello").digest("hex"));
```

---

## 🧠 Try It Yourself
1. Print the current working directory and list its contents.
2. Use `Math` to compute the hypotenuse of a right triangle.
3. Convert a JavaScript object to a JSON string.
