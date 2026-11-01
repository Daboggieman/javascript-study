# Chapter 2: Variables and Simple Data Types

> Reading notes for Eloquent JavaScript, Chapter 2: Program Structure.

## Key Concepts

### Variables
```js
const message = "Hello, JavaScript!";
console.log(message);
```
- `const` for bindings that are never reassigned, `let` for those that are
- Variable names can contain letters, numbers, `$`, and `_` — cannot start with a number
- Use **camelCase** by convention: `myVariable`, `studentName`
- Bindings are **labels** that point to values — not boxes that contain them
- No need to declare types — JavaScript figures it out (**dynamic typing**)

### Strings
```js
const name = "ada lovelace";

// Methods (don't modify original — return new string)
name.toUpperCase();               // "ADA LOVELACE"
name.toLowerCase();               // "ada lovelace"
name.trim();                      // Remove whitespace from ends
// No built-in title case — capitalize manually:
const cap = s => s[0].toUpperCase() + s.slice(1);

// Template literals (ES6+)
const first = "ada";
const last = "lovelace";
const full = `${first} ${last}`;  // "ada lovelace"
console.log(`Hello, ${cap(full)}!`);  // "Hello, Ada lovelace!"

// Escape characters
const tab = "Hello\tWorld";       // Tab
const newline = "Hello\nWorld";   // New line
```

### Numbers
```js
// One Number type — integers and decimals are the same
const x = 10;
const big = 1_000_000;    // Underscores for readability (= 1000000)

// Floats
const y = 3.14;
const w = 0.1 + 0.2;      // 0.30000000000000004 (not exactly 0.3!)

// Operations
2 + 3;      // 5  (addition)
3 - 1;      // 2  (subtraction)
2 * 3;      // 6  (multiplication)
3 / 2;      // 1.5 (division — never integer-truncates)
Math.floor(3 / 2);  // 1  (floor division — no // operator in JS)
3 % 2;      // 1  (modulo — remainder)
2 ** 3;     // 8  (exponentiation)
```

### Constants
```js
// JS actually enforces const — the binding cannot be reassigned
const MAX_CONNECTIONS = 100;
const PI = 3.14159;
```

### Multiple Assignment
```js
// Destructuring
const [x2, y2, z2] = [1, 2, 3];
const { name, age } = { name: "Ada", age: 36 };
```

### Type Conversion
```js
const age = "30";
const ageNum = Number(age);        // String → number (NaN if not numeric)
const height = Number("5.9");      // String → number
const score = String(100);         // Number → string
const count = parseInt("42px", 10); // 42 — always pass radix 10
```

## Common Pitfalls
- **ReferenceError**: Using a `let`/`const` variable before its line is reached, or misspelling the name
- **String + number coercion**: `"5" + 5` is `"55"` — convert with `Number()` first
- Floating-point arithmetic: `0.1 + 0.2 !== 0.3` — use `toFixed()` or epsilon comparisons for precision
- `typeof null === "object"` — a historical bug; check for `null` directly

## Try It Yourself
1. Store your name in a variable and print a greeting using a template literal
2. Experiment with all arithmetic operators, including `Math.floor(3 / 2)`
3. Try `typeof` on different values: `typeof 42`, `typeof 3.14`, `typeof "hello"`, `typeof true`, `typeof null`
4. Deliberately cause a ReferenceError and a NaN result — understand the output
