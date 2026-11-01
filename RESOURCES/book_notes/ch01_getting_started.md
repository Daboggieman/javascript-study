# Chapter 1: Getting Started

> Reading notes for Eloquent JavaScript (Introduction) + Node.js setup.

## Key Concepts

### What is JavaScript?
- JavaScript is a **high-level, dynamic** programming language created by Brendan Eich at Netscape in 1995 — famously prototyped in about 10 days
- Runs **natively in every web browser**; with **Node.js** (2009) it also runs on servers, command-line tools, and automation scripts
- Known for its ubiquity — the only language every browser executes, and one of the most used languages in the world
- Uses **curly braces** `{}` for code blocks and semicolons at the end of statements

### Installing Node.js
- Download the **LTS** version from https://nodejs.org
- Verify: `node --version` and `npm --version` in terminal

### Running JavaScript Code

**Interactive mode (REPL):**
```
$ node
> console.log("Hello!")
Hello!
> 2 + 3
5
```

**Script mode:**
```bash
node hello.js
```

### Your First Program
```js
// hello.js
console.log("Hello, World!");
```

- `console.log()` is a **built-in function** that outputs text to the terminal
- Strings can use `"double"`, `'single'`, or `` `backtick` `` quotes (backticks enable interpolation)
- Lines starting with `//` are **comments** — ignored by JavaScript; `/* ... */` for multi-line comments

### The JavaScript Philosophy
JavaScript grew fast from a tiny prototype, so it has quirks (`==` coercion, `typeof null`). The community response was "JavaScript: The Good Parts" — the modern style: `const`/`let`, `===`, arrow functions, modules. Treat **MDN (developer.mozilla.org)** as the source of truth, and run everything in `"use strict"` mode (Node CommonJS files do this per-module via `"use strict";` at the top).

## Common Pitfalls
- Forgetting to save the file before running it — Node executes the saved version
- Mixing up **browser JS** and **Node JS** — no `window`, `alert`, or `document` in Node; use `console` and `process`
- Semicolon gotchas: automatic semicolon insertion can misparse lines starting with `(` or `[` — just keep semicolons

## Try It Yourself
1. Install Node.js and verify it works in your terminal
2. Open the REPL and try basic math: `2 + 2`, `10 / 3`, `2 ** 8`
3. Create a `hello.js` file and run it with `node hello.js`
4. Add a comment to your file and run it again — notice comments are ignored
