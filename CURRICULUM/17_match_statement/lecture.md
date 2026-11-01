# Lecture 17: The `switch` Statement (and the Absence of Pattern Matching)

JavaScript has `switch`/`case` — the value-matching statement that Python 3.10's `match` resembles. Unlike Python's `match`, JavaScript's `switch` compares **values only**: it cannot match on *structure* (the shape of data). This lecture covers what `switch` does well and how to replace the structural parts with idiomatic JavaScript.

---

## 1. The Basics: Matching a Value

```js
function describeStatus(code) {
  switch (code) {
    case 200:
      return "OK";
    case 404:
      return "Not Found";
    case 500:
      return "Server Error";
    default:                      // `default` is the wildcard -- matches anything else
      return "Unknown status";
  }
}

console.log(describeStatus(404));   // Not Found
console.log(describeStatus(999));   // Unknown status
```

This alone replaces long `if/else if/else if/.../else` chains that just compare one variable to several fixed values.

**Callout**: Each `case` needs a `break` or a `return`, or execution *falls through* into the next case. Python's `match` never falls through; JavaScript's `switch` does.

---

## 2. Matching Multiple Values in One Case

```js
function describeStatus(code) {
  switch (code) {
    case 200:                     // fallthrough groups several values
    case 201:
    case 204:
      return "Success";
    case 400:
    case 401:
    case 403:
    case 404:
      return "Client Error";
    default:
      return "Other";
  }
}
```

Python writes `case 200 | 201 | 204:`; JavaScript lists the cases and lets them fall through (deliberately — with no code between them).

---

## 3. Matching Structure (JS Has No Pattern Matching)

Python's real superpower is destructuring *inside* the pattern: `case ["go", direction]:`. **JavaScript cannot do this** — `case` labels must be constant expressions. The idiomatic replacement is destructuring in an `if`/`else if` chain:

```js
function handleCommand(command) {
  if (command.length === 2 && command[0] === "go") {
    const [_, direction] = command;
    return `Moving ${direction}`;
  }
  if (command.length === 3 && command[0] === "pick" && command[1] === "up") {
    const item = command[2];
    return `Picking up ${item}`;
  }
  if (command[0] === "go") {
    const rest = command.slice(1);              // `*rest` becomes .slice()
    return `Go with extra args: ${rest}`;
  }
  if (command.length === 0) {
    return "Empty command";
  }
  return "Unknown command";
}

console.log(handleCommand(["go", "north"]));      // Moving north
console.log(handleCommand(["pick", "up", "key"])); // Picking up key
```

---

## 4. Matching Objects

The same applies to object shapes — `case {"type": "click", ...}` does not exist. Destructure and compare:

```js
function handleEvent(event) {
  if (event.type === "click") {
    const { x, y } = event;
    return `Clicked at (${x}, ${y})`;
  }
  if (event.type === "key") {
    const { key } = event;
    return `Key pressed: ${key}`;
  }
  return "Unknown event";
}

console.log(handleEvent({ type: "click", x: 10, y: 20 }));  // Clicked at (10, 20)
```

Like Python's partial matching, `event.type === "click"` ignores extra keys — `if` conditions check only what you name.

When the cases are just *data* (not logic), a lookup object is even more idiomatic than a switch:

```js
const responses = { 200: "OK", 404: "Not Found", 500: "Server Error" };
console.log(responses[404] ?? "Unknown status");  // Not Found
```

---

## 5. Guards: Adding Conditions to a Case

Python's `case x if x < 0:` has no JS equivalent — a `switch` case can't carry a condition. Use `if/else if`:

```js
function classify(n) {
  if (n < 0) {
    return "negative";
  }
  if (n === 0) {
    return "zero";
  }
  if (n % 2 === 0) {
    return "positive even";
  }
  return "positive odd";
}
```

---

## 6. `switch` vs `if/else if` — When to Reach for Each

- Use `switch` when you're comparing **one thing** against several possible **fixed values** — command parsers, simple state machines, handling different response codes.
- Use `if/else if` when your conditions involve **multiple unrelated variables**, **ranges**, or **shapes of data** — anything a `switch` case can't express.

---

## 📚 Resources

- **MDN:** [switch — JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch)
- **MDN:** [Destructuring assignment | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

---

## 🧠 Try It Yourself

1. Write a `describeStatus(code)` function using `switch` for at least 5 HTTP status codes plus a `default` case.
2. Write a simple text-adventure command handler using an `if`/`else if` chain with destructuring for commands like `["go", direction]`, `["take", item]`, and `["look"]`.
3. Write `classify(n)` using `if/else if` to sort a number into "negative", "zero", "positive even", "positive odd".
4. Define a small `Point` class and write `describePoint` checking `p.x` and `p.y` with `if/else if` as shown above.
