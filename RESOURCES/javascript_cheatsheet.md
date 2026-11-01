# 🟨 JavaScript Cheatsheet

A comprehensive quick-reference for modern JavaScript (ES2022+) on Node.js.

---

## Data Types

```js
// Numbers — ONE type for integers and decimals (64-bit float)
const x = 10;        // number
const y = 3.14;      // also number
const big = 9007199254740993n;  // BigInt — only beyond Number.MAX_SAFE_INTEGER

// Strings
const s = "hello";
const s2 = 'hello';
const s3 = `multi
line`;               // template literal — spans lines, interpolates ${...}

// Boolean
const flag = true;   // or false

// "Nothing" — two of them!
let a = null;        // deliberate "no value"
let b;               // undefined — declared but never assigned

// Check type
typeof x;            // "number" (typeof null === "object" — a famous bug)
typeof s;            // "string"
Array.isArray(x);    // false
x instanceof Date;   // false — instanceof for class-like checks
```

> Python has `int` and `float`; JS has just `number`. Complex numbers don't exist — use a library if you ever need them.

## Variables & Assignment

```js
const x = 5;           // const by default — cannot be reassigned
let score = 0;         // let when reassignment is needed
// var — never use it (function-scoped, hoisted — see common mistakes)

let [p, q] = [5, 10];  // Destructuring assignment
[p, q] = [q, p];       // Swap

score += 1;            // Augmented assignment (also -=, *=, /=, %=, **=)

// Constants
const MAX_SIZE = 100;  // UPPER_SNAKE convention; const freezes the binding, not the value
```

## Strings

```js
// Creation
const s = "Hello, World!";

// Template literals (formatted strings)
const name = "Alice";
const greeting = `Hello, ${name}!`;
const calc = `2 + 2 = ${2 + 2}`;

// Common methods
s.toUpperCase();            // "HELLO, WORLD!"
s.toLowerCase();            // "hello, world!"
s.trim();                   // Remove whitespace from both ends
s.trimStart();              // Remove from left
s.trimEnd();                // Remove from right
s.split(",");               // ["Hello", " World!"]
s.replace("H", "J");        // "Jello, World!" (first match; /H/g for all)
s.replaceAll("l", "L");     // "HeLLo, WorLd!"
s.startsWith("He");         // true
s.endsWith("!");            // true
s.indexOf("World");         // 7 (index, or -1)
s.includes("World");        // true
s.split("l").length - 1;    // 3 — count occurrences
/^\d+$/.test("42");         // true — "is digits" check (no isdigit in JS)
s.padStart(15, ".");        // "..Hello, World!"

// Indexing and slicing
s[0];                       // "H"  (s[-1] does NOT work — use s.at(-1))
s.at(-1);                   // "!"
s.slice(0, 5);              // "Hello"
s.slice(-6);                // "World!"
s.split("").reverse().join("");  // "!dlroW ,olleH" (reverse)
s.length;                   // 13
```

## Arrays

```js
// Creation
const nums = [1, 2, 3, 4, 5];
const mixed = [1, "two", 3.0, true];  // allowed, but keep types consistent
const empty = [];

// Access
nums[0];      // 1 (no negative indexing — use nums.at(-1))
nums.at(-1);  // 5
nums.slice(1, 3);  // [2, 3]

// Modify
nums.push(6);           // Add to end — returns new length
nums.unshift(0);        // Add to start
const other = [7, 8];
const merged = [...nums, ...other];   // Extend (new array)
nums.splice(2, 1);      // Remove 1 item at index 2 — mutates
const last = nums.pop();      // Remove and return last item
const first = nums.shift();   // Remove and return item at index 0
delete nums[0];         // Avoid — leaves a hole; use splice instead

// Search
nums.includes(3);       // true
nums.indexOf(3);        // Index of first 3 (or -1)
nums.find(n => n > 2);  // First matching element (or undefined)
nums.filter(n => n === 3).length;  // How many 3s

// Sort
nums.sort((a, b) => a - b);         // Sort in place (ascending)
nums.sort((a, b) => b - a);         // Sort descending
nums.toSorted((a, b) => a - b);     // Return new sorted array (original unchanged)
nums.sort((a, b) => a.localeCompare(b));  // Strings, alphabetical
nums.reverse();                     // Reverse in place

// "Comprehensions" — map / filter / reduce
const squares = Array.from({ length: 10 }, (_, i) => i ** 2);
const evens = Array.from({ length: 20 }, (_, i) => i).filter(n => n % 2 === 0);
const total = [1, 2, 3].reduce((sum, n) => sum + n, 0);

// Useful functions
nums.length;                    // len()
Math.min(...nums);              // min()
Math.max(...nums);              // max()
nums.reduce((a, b) => a + b, 0);  // sum()
```

## Destructuring (Python's tuple unpacking)

```js
// JS has no tuples — use arrays (fixed shape) or small objects
const point = [3, 4];
const [x, y] = point;          // Unpack an array

const person = { name: "Alice", age: 30 };
const { name, age } = person;  // Unpack an object — very common in JS

function getMinMax(nums) {
  return [Math.min(...nums), Math.max(...nums)];
}
const [lo, hi] = getMinMax([3, 1, 4]);  // [1, 4]
```

## Objects and Maps

```js
// Object literal — best for fixed, known keys
const alien = { color: "green", points: 5 };

// Access
alien.color;             // "green" (no KeyError — undefined if missing)
alien["color"];          // "green" — bracket form for dynamic keys
alien.points ?? 0;       // 0 — default if missing (like dict.get with default)

// Modify
alien.speed = "slow";    // Add or update
Object.assign(alien, { points: 10 });  // Update multiple
delete alien.points;     // Delete key

// Iteration
Object.keys(alien);      // ["color", "speed"]
Object.values(alien);    // ["green", "slow"]
Object.entries(alien);   // [["color", "green"], ["speed", "slow"]]

for (const [key, value] of Object.entries(alien)) {
  console.log(`${key}: ${value}`);
}

// "Comprehension" over an object
const nums = { a: 1, b: 2, c: 3 };
const doubled = Object.fromEntries(
  Object.entries(nums).map(([k, v]) => [k, v * 2])
);  // { a: 2, b: 4, c: 6 }

// Map — best for dynamic keys, non-string keys, frequent additions
const scores = new Map();
scores.set("alice", 90);
scores.get("alice");      // 90 (undefined if missing)
scores.has("alice");      // true
scores.delete("alice");
for (const [k, v] of scores) { /* Map is directly iterable */ }
```

## Sets

```js
// Creation
const s = new Set([1, 2, 3]);
const empty = new Set();

// Operations
s.add(4);
s.delete(4);          // No error if missing
s.has(4);             // true/false — the membership test

// Set operations (methods, no | & - ^ operators)
const a = new Set([1, 2, 3]);
const b = new Set([2, 3, 4]);
const union = new Set([...a, ...b]);                    // {1, 2, 3, 4}
const intersection = new Set([...a].filter(x => b.has(x)));  // {2, 3}
const difference = new Set([...a].filter(x => !b.has(x)));   // {1}

// Deduplicate an array
const unique = [...new Set([1, 1, 2, 2, 3])];  // [1, 2, 3]
```

## Control Flow

```js
const x = 5;

// if / else if / else
if (x > 0) {
  console.log("positive");
} else if (x < 0) {
  console.log("negative");
} else {
  console.log("zero");
}

// Ternary
const result = x % 2 === 0 ? "even" : "odd";

// switch (JS has no pattern matching)
switch ("hello") {
  case "quit":
    process.exit(0);
    break;              // forget break and the next case runs too!
  case "hello":
    console.log("Hi!");
    break;
  default:
    console.log("Unknown command");
}
```

## Loops

```js
// for...of loop (values)
for (const item of [1, 2, 3]) {
  console.log(item);
}

// Classic for loop (range-style)
for (let i = 0; i < 5; i++) {         // 0, 1, 2, 3, 4
  console.log(i);
}
for (let i = 2; i < 10; i += 2) {     // 2, 4, 6, 8
  console.log(i);
}

// With index (enumerate)
["a", "b", "c"].forEach((val, i) => {
  console.log(i, val);                // 0 a, 1 b, 2 c
});

// while loop
let condition = true;
while (condition) {
  doSomething();
  condition = false;
}

// break / continue
for (let i = 0; i < 10; i++) {
  if (i === 5) break;                 // Exit loop entirely
  if (i % 2 === 0) continue;          // Skip to next iteration
  console.log(i);
}
```

## Functions

```js
// Function declaration
function greet(name) {
  return `Hello, ${name}!`;
}

// Default parameters
function greet2(name = "World") {
  return `Hello, ${name}!`;
}

// Rest parameters (like *args) — an array
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}

// No **kwargs in JS — pass one options object
function createUser({ name, role = "user", active = true }) {
  return { name, role, active };
}
createUser({ name: "Ada", role: "admin" });

// Arrow functions (Python's lambdas — but full functions)
const square = x => x ** 2;
const add = (a, b) => a + b;
const makeGreeting = name => `Hello, ${name}!`;

// "Type hints" — JSDoc comments (editors check them)
/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function add2(a, b) {
  return a + b;
}
```

## Classes

```js
class Dog {
  // Class-level data (shared): use a static property
  static species = "Canis lupus familiaris";

  constructor(name, age) {    // constructor, not __init__; no self
    this.name = name;         // Instance fields
    this.age = age;
  }

  bark() {                    // Methods — no "def", no self parameter
    return `${this.name} says Woof!`;
  }

  toString() {                // JS's __str__ equivalent
    return `Dog(${this.name}, ${this.age})`;
  }

  get description() {         // get/set accessors for computed properties
    return `${this.name}, age ${this.age}`;
  }
}

// Inheritance
class Puppy extends Dog {
  constructor(name) {
    super(name, 0);           // Call parent constructor
  }
  bark() {                    // Override by redefining
    return `${this.name} says Yip!`;
  }
}

// Private fields
class Account {
  #balance = 0;               // Truly private (the _name convention is older)
  deposit(amount) { this.#balance += amount; }
  get balance() { return this.#balance; }
}

// Usage
const dog = new Dog("Rex", 5);
console.log(dog.bark());
```

## File I/O

```js
const fs = require("fs");
const path = require("path");

// Reading (sync for beginner parity — async shown later)
const content = fs.readFileSync("file.txt", "utf8");   // Entire file as string
const lines = fs.readFileSync("file.txt", "utf8").split("\n");  // List of lines

// Writing
fs.writeFileSync("file.txt", "Hello\n");               // Overwrites
fs.appendFileSync("file.txt", "World\n");              // Appends
fs.mkdirSync("folder", { recursive: true });           // mkdir -p

// JSON — the global JSON object, no require needed
fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
const data = JSON.parse(fs.readFileSync("data.json", "utf8"));

// Paths (pathlib equivalent)
const p = path.join("folder", "file.txt");
fs.existsSync(p);          // true/false
fs.statSync(p).isFile();   // true/false
fs.statSync(p).isDirectory();
path.resolve("folder", "..", "file.txt");  // Absolute path
```

## Error Handling

```js
try {
  const result = 10 / 0;      // NOTE: no error! JS returns Infinity
  JSON.parse("{not json");    // This one throws
} catch (e) {                 // catch (e) catches EVERYTHING — check e.name
  if (e instanceof SyntaxError) {
    console.log(`Bad JSON: ${e.message}`);
  } else {
    console.log(`Unexpected: ${e}`);
  }
} finally {
  console.log("Always runs"); // Cleanup code
}

// Python's else-block has no JS analog — put the "success" code inside try

// Raising errors
throw new Error("Invalid input");
throw new RangeError("Index out of bounds");   // Python IndexError analog

// Custom errors
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}
```

## Common Global Utilities

```js
// Math (global Math object — no import)
Math.abs(-5);            // 5
Math.round(3.7);         // 4
Math.floor(3.7);         // 3    Math.ceil(3.2);  // 4
Math.round(3.14159 * 100) / 100;  // 3.14 (round to 2 places)
2 ** 3;                  // 8
Math.trunc(17 / 5);      // 3 (quotient)  —  17 % 5;  // 2 (remainder)
Math.random();           // [0, 1)  — random integer: Math.floor(Math.random() * 6) + 1

// Type conversion
Number("42");            // 42 (NaN if not numeric)
parseInt("42px", 10);    // 42 — always pass the radix 10
parseFloat("3.14");      // 3.14
Math.trunc(3.9);         // 3 — int()-style truncation
String(42);              // "42"
Boolean(0);              // false
Array.from("abc");       // ["a", "b", "c"]
[...new Set([1, 1, 2])]; // [1, 2]

// Iteration helpers
[..."abc"].entries();    // [[0,"a"], [1,"b"]] — enumerate
const zipped = [1, 2].map((n, i) => [n, ["a", "b"][i]]);  // zip
[1, 2, 3].map(String);               // map
[-1, 0, 1, 2].filter(n => n > 0);    // filter
[3, 1, 2].toSorted();                // sorted
[1, 2, 3].reverse();                 // reversed (in place — copy first!)
[false, true].some(Boolean);         // any
[true, true].every(Boolean);         // all
```

## Higher-Order Functions (no decorators in JS)

```js
// JS has no decorator syntax — wrap functions manually (same idea, closures)
function logged(func) {
  return (...args) => {
    console.log("Before");
    const result = func(...args);
    console.log("After");
    return result;
  };
}

function sayHello() { console.log("Hello!"); }
const loudHello = logged(sayHello);
loudHello();

// A function that returns a function (partial application)
const multiply = a => b => a * b;
const double = multiply(2);
double(5);  // 10
```

## Useful Node.js Built-in Modules

```js
const fs = require("fs");            // File system
const path = require("path");        // Path joining/resolving
const os = require("os");            // OS info (os.platform(), os.homedir())
const util = require("util");        // util.format, util.inspect
const crypto = require("crypto");    // Hashes, random bytes
const http = require("http");        // Low-level HTTP server/client
const readline = require("readline/promises");  // Interactive input
const { execSync } = require("child_process");  // Run shell commands
// No import needed: JSON, Math, console, process, Buffer are globals
```

## npm (Python's pip + virtualenvs in one tool)

```bash
# Create a project (creates package.json — no separate venv needed)
npm init -y

# Install packages (goes into node_modules/)
npm install express

# Dev-only dependencies (like installing linters/test tools)
npm install --save-dev eslint

# Save dependencies for reproducibility
# package.json + package-lock.json ARE your requirements.txt — commit both

# Install from package.json (clone a repo, then:)
npm install

# Run scripts declared in package.json
npm test

# Run a package's CLI without installing globally
npx prettier --write .
```

```js
// Using an installed package
const _ = require("lodash");   // resolves from node_modules/
```
