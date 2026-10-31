# Lecture 01: Hello, JavaScript!

Welcome to your first JavaScript lesson! JavaScript is a high-level, interpreted programming language known for its flexibility and ubiquity. It runs in every web browser, and with Node.js it is used for servers, command-line tools, automation, and more.

---

## 1. Writing Your First JavaScript Program
Every programmer starts with a "Hello, World!" program. In JavaScript, this is incredibly simple compared to languages like Java, C++, or Go.

Create a file named `hello.js` and write the following line:

```js
console.log("Hello, World!");
```

To run it, open your terminal and type:
```bash
node hello.js
```

### Explanation:
- `console.log()` is a **built-in function** in JavaScript (and Node.js) that outputs text to the screen.
- `"Hello, World!"` is a **string** (text data). In JavaScript, strings must be surrounded by either double quotes (`"`), single quotes (`'`), or backticks (`` ` `` — template literals, covered later).

---

## 2. JavaScript Comments
Comments are notes in your code written for humans. JavaScript completely ignores them when running the program.

Use the double slash (`//`) to start a comment:

```js
// This is a comment. JavaScript will ignore this.
console.log("Hello, JavaScript!"); // This comment is inline
```

For multi-line comments, use `/* ... */` (or repeat the `//` symbol):

```js
/*
This is a multi-line comment.
It is wrapped in slash-star and star-slash.
*/
```

---

## 3. The Node REPL (Interactive Shell)
You don't always need to write files to run JavaScript. You can use the **REPL** (Read-Eval-Print Loop).
Open your terminal and type `node` and press Enter. You should see a prompt like:

```
>
```

Now you can run JavaScript code line by line:
```js
> 3 + 5
8
> console.log("Interactive mode!")
Interactive mode!
> .exit
```

---

## 4. Basic Arithmetic
JavaScript can act as a simple calculator. Try these in the REPL:

| Operation | Operator | Example | Result |
|-----------|----------|---------|--------|
| Addition | `+` | `5 + 3` | `8` |
| Subtraction | `-` | `10 - 4` | `6` |
| Multiplication| `*` | `4 * 3` | `12` |
| Division | `/` | `7 / 2` | `3.5` (JS has a single `Number` type for integers and decimals) |
| Exponentiation| `**` | `2 ** 3` | `8` (2 cubed) |

---

## 🧠 Try It Yourself
1. Open the interactive Node shell (REPL) and calculate `12345 * 67890`.
2. Write a JavaScript script that prints three lines of text: your name, your favorite programming language, and your goal for this study path.
