# Lecture 06: Control Flow

Control flow allows your program to make decisions and execute different paths of code based on conditions.

---

## 1. If / Else If / Else Statements
JavaScript uses the keywords `if`, `else if`, and `else` to control decision making:

```js
const age = 18;

if (age >= 21) {
  console.log("You can enter the club and buy drinks.");
} else if (age >= 18) {
  console.log("You can enter the club but cannot buy drinks.");
} else {
  console.log("You are too young to enter the club.");
}
```

- In JavaScript, the condition must be wrapped in parentheses `( )`, and each block is wrapped in curly braces `{ }`.
- Indentation is not required by the language, but 2 spaces is the universal convention.

---

## 2. Logical Operators
You can combine multiple conditions using logical operators:
- **`&&`**: True if both conditions are true.
- **`||`**: True if at least one condition is true.
- **`!`**: Reverses the boolean value of a condition.

```js
const hasId = true;
const isVip = false;

if (hasId && (age >= 18 || isVip)) {
  console.log("Welcome!");
}
```

---

## 3. Truthy and Falsy Values
In JavaScript, values can evaluate to `true` or `false` when used in a conditional statement.

### Falsy values (learn this table — it differs from Python!):
- `false`
- `0`, `-0`, and `NaN`
- `""` (empty string)
- `null`
- `undefined`

**Everything else is truthy — including `[]`, `{}`, and `"0"`.** In Python, empty collections are falsy; in JavaScript, an empty array or object is truthy. This is a classic source of bugs.

```js
const name = "Ada";
if (name) {  // Checks if name is not an empty string
  console.log(`Hello, ${name}!`);
} else {
  console.log("You didn't enter a name.");
}

// To check for an empty array (truthy!), check its length:
const items = [];
if (items.length === 0) {
  console.log("The array is empty.");
}
```

---

## 4. Ternary Operators
Ternary operators provide a shorthand way to write simple `if-else` statements.

Syntax: `condition ? value_if_true : value_if_false`

```js
const x = 10;
const status = x % 2 === 0 ? "even" : "odd";
console.log(status);  // "even"
```

---

## 5. Switch Statements
Similar to `match` in Python 3.10+, JavaScript offers the `switch` statement (it does **not** do pattern matching — only exact value comparison):

```js
const command = "start";

switch (command) {
  case "start":
    console.log("Starting the system...");
    break;
  case "stop":
  case "halt":
    console.log("Stopping the system...");
    break;
  default:
    console.log("Unknown command.");  // Default wildcard
}
```

**Callout**: The `break` matters — without it, execution "falls through" into the next case. Python's `match` has no fallthrough; JavaScript's `switch` does.

---

## 🧠 Try It Yourself
1. Write a program that takes a score (0–100) and prints grades: A (>=90), B (>=80), C (>=70), and F (otherwise).
2. Use a ternary operator to assign "allowed" if `age` is >= 18, otherwise "denied".
