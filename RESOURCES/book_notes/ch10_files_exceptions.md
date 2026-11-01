# Chapter 10: Files and Exceptions

> Reading notes for Eloquent JavaScript, Chapter 8: Errors and Bugs — plus Node's `fs` module for files.

## Key Concepts

### Reading from a File
To work with a file in Node, you first need to `require("fs")`. For beginner parity with Python's blocking `open()`, use the **sync** methods.

```js
const fs = require("fs");

const contents = fs.readFileSync("pi_digits.txt", "utf8");
console.log(contents);
```

- **`"utf8"` encoding**: Without it, `readFileSync` returns raw bytes (a Buffer), not a string.
- **Relative paths**: Resolved from the directory you run `node` in, not the script's directory — a common confusion.

#### Reading Line by Line
```js
const filename = "pi_digits.txt";
const lines = fs.readFileSync(filename, "utf8").split("\n");

for (const line of lines) {
  console.log(line.trimEnd());
}
```

#### Making a List of Lines from a File
```js
const lines = fs.readFileSync(filename, "utf8").split("\n");
// lines is now an array — filter out a trailing empty line if present
```

### Writing to a File
To write, call a write method. There are no mode strings — the method name is the mode.

- `writeFileSync` **Overwrites** the file if it already exists.
- `appendFileSync` **Appends** new data to the end of the file.

```js
const filename = "programming.txt";
fs.writeFileSync(filename, "I love programming.\n");
fs.appendFileSync(filename, "I love creating new games.\n");
```

- Neither adds newlines automatically — you must add `\n` yourself.

### Exceptions
JavaScript uses special objects called **exceptions** to manage errors that arise during program execution. If you write code that handles the exception, the program will continue running. If not, it halts (and Node prints a stack trace).

Exceptions are handled with a `try-catch-finally` block (there is no `else` clause — put "success" code at the end of the `try`):

```js
try {
  const result = 10 / 0;        // Note: Infinity, NOT an error in JS!
  if (!Number.isFinite(result)) {
    throw new Error("You can't divide by zero!");
  }
  console.log("Division successful!");
} catch (e) {
  console.log(e.message);
}
```

- **`try`**: Code that might fail.
- **`catch (e)`**: Code to run if an exception occurs — catches *everything*, so filter with `e instanceof TypeError` etc.
- **`finally`**: Code that runs no matter what (useful for cleaning up resources).

#### Handling a Missing File
Python's `FileNotFoundError` has no exact JS analog — check with `fs.existsSync`, or catch the error and inspect `e.code`:

```js
const filename = "alice.txt";
try {
  const contents = fs.readFileSync(filename, "utf8");
  console.log(contents);
} catch (e) {
  if (e.code === "ENOENT") {
    console.log(`Sorry, the file ${filename} does not exist.`);
  } else {
    throw e;   // Don't swallow unknown errors
  }
}
```

#### Failing Silently
If you don't want to report an exception to the user, use an empty catch body — but leave a comment explaining why:

```js
try {
  // some code
} catch (e) {
  // Intentionally ignored: a missing cache file is not an error for us
}
```

### Storing Data with JSON
The global `JSON` object (no import needed) serializes JavaScript values (arrays, objects) into JSON strings, and parses them back.

```js
const numbers = [2, 3, 5, 7, 11, 13];
const filename = "numbers.json";

// Save data
fs.writeFileSync(filename, JSON.stringify(numbers, null, 2));

// Load data
const loadedNumbers = JSON.parse(fs.readFileSync(filename, "utf8"));
```

- `JSON.parse` throws a `SyntaxError` on invalid JSON — wrap it in `try/catch` when loading user-edited files.

## Common Pitfalls
- **Relative Path Errors**: File path issues when running scripts from a different working directory. Build paths with `path.join(__dirname, "data.txt")` so they resolve relative to the script.
- **Missing `"utf8"`**: `readFileSync(path)` without the encoding returns a `Buffer` — string methods will silently misbehave.
- **Overwriting Files**: `writeFileSync` wipes existing contents. Use `appendFileSync` to append.
- **Broad Exceptions**: A bare `catch (e) { }` catches *everything*, making debugging extremely difficult. Filter by `e.code`/`e instanceof` and rethrow what you can't handle.

## Try It Yourself
1. Create a text file, write a script to read it all at once, split it into lines, and print them.
2. Write a program that prompts the user for their name. When they respond, write their name to a file called `guest.txt`.
3. Write a program that asks for two numbers, adds them, and prints the result. Handle invalid (non-numeric) input with a thrown error and a `try/catch`.
