# Lecture 02b: Input, Output, and Formatting

Getting input from users and presenting output clearly are core beginner skills in Node.js.

---

## 1. Printing Information
The `console.log()` function displays text or values to the screen.

```js
console.log("Hello");
console.log(42);
```

You can print multiple values at once (separated by spaces):

```js
console.log("Name:", "Ada");
```

### Controlling separators and newlines
`console.log` always adds a newline at the end and joins values with a space. To customize:

```js
// Join values with a custom separator using .join()
console.log(["Node", "is", "fun"].join("-"));  // Output: Node-is-fun

// Print without a trailing newline using process.stdout.write
process.stdout.write("No newline here...");
process.stdout.write("still the same line!\n");
```

---

## 2. Getting User Input
Node.js scripts are not interactive by default like the Python `input()` function. Use the built-in `readline/promises` module to ask the user for information.

```js
const readline = require("node:readline/promises");
const { stdin: input, stdout: output } = require("node:process");

async function main() {
  const rl = readline.createInterface({ input, output });
  const name = await rl.question("What is your name? ");
  console.log("Hello, " + name);
  rl.close();
}

main();
```

Don't worry about `async`/`await` yet — they are covered in a later lecture. For now, copy this pattern: everything that needs the user's answer goes **inside** `main()`, after the `await`.

Important: `rl.question()` always returns a string.

```js
const age = await rl.question("Enter your age: ");
console.log(typeof age);  // Output: string
```

---

## 3. Converting Input
If you want numbers, convert the input string.

```js
const age = Number(await rl.question("Enter your age: "));
console.log(age + 1);
```

Common conversions:
- `Number(x)` — string to number (decimals too)
- `parseInt(x, 10)` — string to whole number
- `String(x)` — anything to string
- `Boolean(x)` — anything to true/false

---

## 4. String Formatting
JavaScript offers several ways to format output.

### Concatenation
```js
const name = "Ada";
console.log("Hello, " + name);
```

### Template literals (the f-string of JavaScript)
Wrap the string in backticks and put expressions inside `${...}`:

```js
const name = "Ada";
console.log(`Hello, ${name}`);
```

Template literals can also span multiple lines — no need for `\n`.

---

## 🧠 Try It Yourself
1. Ask the user for their name and print a greeting.
2. Ask for a number, convert it to a number, and print the next number.
3. Use a template literal to print a short message with two values.
