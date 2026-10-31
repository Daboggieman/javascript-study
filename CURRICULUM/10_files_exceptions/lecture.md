# Lecture 10: Files & Exceptions

Learning to work with files and handle exceptions allows your programs to persist data and run robustly without crashing when errors occur.

---

## 1. Reading from a File
To read a file in Node.js, use the built-in `fs` (filesystem) module. For beginner scripts we use the **synchronous** variants, which behave like Python's `open()` — the program waits until the file is done.

```js
const fs = require("node:fs");

// Reading the entire file
const content = fs.readFileSync("sample.txt", "utf8");
console.log(content);
```

- The `"utf8"` argument tells Node to decode the bytes into a string (without it you get a raw `Buffer` of bytes).
- **Flag equivalents**: `'r'` (read, default), `'w'` (write/overwrite), `'a'` (append) — passed as a second options object, e.g. `fs.readFileSync("f.txt", { encoding: "utf8", flag: "r" })`.

### Reading Line by Line:
```js
const lines = fs.readFileSync("sample.txt", "utf8").split("\n");
for (const line of lines) {
  console.log(line.trim());  // trim() removes extra newlines
}
```

Node also has asynchronous file APIs (callbacks/promises) — they are essential for servers, but for scripts the sync versions above are perfectly fine. Async is covered later.

---

## 2. Writing to a File
When writing to a file, ensure you select the `'w'` (overwrite) or `'a'` (append) flag.

```js
fs.writeFileSync("output.txt", "Hello, writing to a file!\n");
fs.appendFileSync("output.txt", "Node.js makes file handling easy.\n");
```

**Callout**: There is no `with open(...)` context manager in JavaScript — `writeFileSync` opens and closes the file in one call, so nothing leaks.

---

## 3. JSON Files
The global `JSON` object (no require needed) allows you to save and load JavaScript structures (like arrays and objects) directly to files.

```js
const fs = require("node:fs");

const data = { name: "Alice", age: 25, active: true };

// Save to JSON file
fs.writeFileSync("user.json", JSON.stringify(data, null, 4));

// Read from JSON file
const loadedData = JSON.parse(fs.readFileSync("user.json", "utf8"));
console.log(loadedData);
```

---

## 4. Exceptions and Error Handling
Exceptions are errors detected during execution. Use a `try-catch` block to catch and handle exceptions to prevent the program from crashing.

```js
try {
  const result = 10 / 0;
  console.log(result);  // Infinity — division by zero does NOT throw in JS!
} catch (err) {
  console.log("Error: You cannot divide by zero!");
}
```

**Callout**: Unlike Python's `ZeroDivisionError`, JavaScript happily returns `Infinity` for `10 / 0`. Real runtime errors come from things like `null.foo` (`TypeError`) or JSON parsing (`SyntaxError`).

### Try-Catch-Finally:
JavaScript has no `except` — you catch with `catch (err)`. There is also **no `else` clause**: code that should run only on success simply goes at the end of the `try` block. **`finally`** runs no matter what (even if an exception occurs), just like Python.

```js
try {
  const number = Number("abc");
  if (Number.isNaN(number)) {
    throw new TypeError("That's not a valid number!");
  }
  const result = 100 / number;
  console.log(`Result is ${result}`);
} catch (err) {
  console.log(err.message);  // .message holds the error text (err is the Error object)
} finally {
  console.log("Execution of try-catch block finished.");
}
```

---

## 🧠 Try It Yourself
1. Write a program that prompts the user for their name, and appends the name to a `guests.txt` file.
2. Write a function that takes two numbers, divides them, and catches any error (including a zero denominator), returning `null` instead of crashing.
