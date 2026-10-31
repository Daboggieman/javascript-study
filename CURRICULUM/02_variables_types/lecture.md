# Lecture 02: Variables & Types

In programming, we need a way to store data so we can use it later. In JavaScript, we do this using **variables**.

---

## 1. Creating Variables
To create a variable, you assign a value to a name using the `=` operator.

```js
let x = 5;
const message = "Hello, JavaScript!";
```

- In JavaScript, you do **not** need to declare a variable's type before using it. JavaScript automatically figures out the type of the value. This is called **dynamic typing**.
- A variable is a **label** pointing to a value in memory, not a container holding it.
- Use `const` by default (the value cannot be reassigned) and `let` only when you need to reassign. Avoid `var` — it has surprising scoping rules.

---

## 2. Naming Rules
Variables must follow these naming rules:
- Names can contain letters, numbers, dollar signs (`$`), and underscores (`_`).
- Names cannot start with a number.
- Spaces are not allowed (use camelCase instead).
- Avoid using JavaScript keywords (like `let`, `if`, `for`, `class`, etc.).
- JavaScript is case-sensitive (`age`, `Age`, and `AGE` are three different variables).

### Best Practices:
- Use **camelCase** for multi-word variable names (e.g., `studentName`, `userAge`, `totalPrice`).
- Choose descriptive names (use `score` instead of `s`).

---

## 3. Basic Data Types
JavaScript has several built-in basic data types.

### Numbers (`number`)
JavaScript has a **single** `number` type for both whole numbers and decimals (unlike Python's separate `int` and `float`).
```js
const age = 21;
const price = 19.99;
const count = -5;
const pi = 3.14159;
```
*Note*: You can use underscores in large numbers to make them easier to read: `const oneMillion = 1_000_000;` (JavaScript ignores the underscores).

### Booleans (`boolean`)
Represent logical values: either `true` or `false` (lowercase in JavaScript!).
```js
const isActive = true;
const hasPassed = false;
```

### Nothing-values: `null` and `undefined`
JavaScript has two ways to represent the absence of a value:
```js
let result = null;      // null: "deliberately empty", you assigned it
let other;              // undefined: "never assigned a value"
```
**Callout**: Python has one nothing-value (`None`); JavaScript has two. Use `null` when you want to say "no value on purpose". You will meet `undefined` when a variable was declared but never assigned, or when a function returns nothing.

---

## 4. Checking Types with `typeof`
You can find out the data type of any value or variable using the built-in `typeof` operator:

```js
const x = 10;
console.log(typeof x);  // Output: number

const y = 3.14;
console.log(typeof y);  // Output: number (same type — no separate int/float!)
```

---

## 5. Type Conversion (Casting)
You can convert a value from one type to another using built-in functions:

```js
// Convert float to whole number (truncates the decimal part)
console.log(Math.trunc(3.9));  // Output: 3

// Convert string to integer
console.log(parseInt("25", 10));  // Output: 25

// Convert anything to a number
console.log(Number("3.5"));  // Output: 3.5

// Convert number to string
console.log(String(100));  // Output: "100"
```

---

## 🧠 Try It Yourself
1. Store your age in a variable called `myAge`.
2. Print the type of `myAge` with `typeof`, then store `19.5` in it and check the type again.
3. What happens if you try to convert the string `"apple"` to a number with `Number("apple")`? Try it in the REPL and note the result (`NaN` — "Not a Number").
