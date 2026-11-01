# 📋 Common JavaScript Mistakes

This document highlights common pitfalls and bugs encountered by beginners and intermediate JavaScript developers, along with how to avoid them.

---

## 1. Using `==` Instead of `===`
The loose equality operator `==` performs type coercion before comparing, which produces surprising results. Almost always use the strict operators `===` and `!==`.

### ❌ Bad:
```js
console.log("5" == 5);          // true  (string coerced to number)
console.log(0 == "");           // true  ("" coerces to 0)
console.log(null == undefined); // true
console.log([] == false);       // true  ([] becomes "" then 0!)
```

### ✅ Good:
```js
console.log("5" === 5);          // false — different types, no surprises
console.log(null === undefined); // false

// Convert explicitly, THEN compare
const guess = Number("5");
if (guess === 5) {
  console.log("Match");
}
```

---

## 2. Confusing `undefined` and `null`
JS has two "no value" values: `undefined` (never assigned, missing property or argument) and `null` (deliberately set to nothing). They behave differently in arithmetic and with default parameters.

### ❌ Bad:
```js
const user = { name: "Ada" };
console.log(user.age + 1);   // NaN — undefined + 1
console.log(typeof null);    // "object" — a famous historical bug!

function greet(name = "stranger") {
  return `Hello, ${name}`;
}
console.log(greet(null));    // "Hello, null" — defaults only trigger on undefined
```

### ✅ Good:
```js
const user = { name: "Ada" };
console.log(user.age ?? 0);  // 0 — nullish coalescing handles both

function greet(name = "stranger") {
  return `Hello, ${name}`;
}
console.log(greet());        // "Hello, stranger" — missing argument
console.log(greet(null));    // "Hello, null" — null is deliberate, it is respected
```

---

## 3. Assuming Python Truthiness
If you are coming from Python: in JS an **empty array or empty object is truthy**. Only `false`, `0`, `""`, `null`, `undefined`, and `NaN` are falsy.

### ❌ Bad:
```js
const items = [];
if (items) {
  console.log("has items");   // Prints anyway — [] is truthy in JS!
}
```

### ✅ Good:
```js
const items = [];
if (items.length > 0) {
  console.log("has items");
}
```

---

## 4. `var` Hoisting vs `let`/`const`
`var` is function-scoped and hoisted, so it is usable (as `undefined`) before its line — and inside loops each iteration shares one binding. Always use `const`, or `let` when reassigning.

### ❌ Bad:
```js
console.log(count);        // undefined — no error, silently wrong
var count = 10;

for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);  // 3, 3, 3 — one shared i
}
```

### ✅ Good:
```js
console.log(count);        // ReferenceError — caught immediately
let count = 10;

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);  // 0, 1, 2 — fresh binding per iteration
}
```

---

## 5. Losing `this` Binding
A regular function's `this` depends on *how it is called*. Extracting a method or passing it as a callback detaches it from its object, so `this` becomes `undefined` (strict mode).

### ❌ Bad:
```js
const counter = {
  count: 0,
  incrementLater() {
    setTimeout(function () {
      this.count++;       // this is undefined here — TypeError
    }, 100);
  },
};
```

### ✅ Good:
```js
const counter = {
  count: 0,
  incrementLater() {
    setTimeout(() => {    // Arrow functions inherit this from the enclosing scope
      this.count++;
      console.log(this.count);  // 1
    }, 100);
  },
};
```

---

## 6. Comparing with `NaN`
`NaN` ("not a number") is produced by failed numeric conversions and impossible math. It is the only value not equal to itself.

### ❌ Bad:
```js
const n = Number("abc");
if (n === NaN) {            // NEVER true
  console.log("invalid");
}
```

### ✅ Good:
```js
const n = Number("abc");    // NaN
console.log(Number.isNaN(n)); // true — the correct check
console.log(Number.isNaN(Number("42"))); // false
```

---

## 7. Mutating `const` Objects and Arrays
`const` freezes the *binding* (the name cannot be reassigned), not the value. The contents of a const object or array can still change — and that is usually fine, but you must know it.

### ❌ Bad (surprising):
```js
const config = { debug: true };
config.debug = false;        // Works! No error.
config = {};                 // TypeError: Assignment to constant variable
```

### ✅ Good:
```js
// If you need an object that cannot be changed:
const config = Object.freeze({ debug: true });
config.debug = false;        // Silently ignored (or TypeError in strict mode)
console.log(config.debug);   // true — note: Object.freeze is shallow

// If mutation is intended, prefer let or accept mutation consciously
const list = [1, 2];
list.push(3);                // Fine and idiomatic — the array grows, binding unchanged
```

---

## 8. String + Number Coercion with `+`
The `+` operator concatenates if either operand is a string — a silent bug when reading input or doing math.

### ❌ Bad:
```js
const a = "5";                  // e.g. from a form or prompt
const b = 10;
console.log(a + b);             // "510" — string concatenation!
```

### ✅ Good:
```js
const a = Number("5");
const b = 10;
console.log(a + b);             // 15

// Interpolating values into text? Use template literals, not +:
console.log(`a is ${a}, b is ${b}`);
```

---

## 9. `parseInt` Without a Radix
Always pass base 10 as the second argument. Without it, strings starting with `0` were historically parsed as octal, and the behavior is implementation-dependent — a classic source of off-by-one bugs.

### ❌ Bad:
```js
parseInt("08");    // 0 in old engines that treated a leading 0 as octal
parseInt("10");    // 10 — works by luck, no radix given
```

### ✅ Good:
```js
parseInt("08", 10);       // 8 — explicit base 10, always
parseInt("42px", 10);     // 42 — parses the leading number
Number("42");             // 42 — strict conversion, NaN on any junk
```

---

## 10. `sort()` Sorts Alphabetically by Default
With no comparator, `sort()` converts elements to strings and sorts them lexicographically — so numbers sort "alphabetically".

### ❌ Bad:
```js
const scores = [10, 9, 100, 2];
scores.sort();
console.log(scores);   // [10, 100, 2, 9] — string order!
```

### ✅ Good:
```js
const scores = [10, 9, 100, 2];
scores.sort((a, b) => a - b);   // Numeric ascending
console.log(scores);            // [2, 9, 10, 100]
// Descending: (a, b) => b - a
```

---

## 11. Copying Arrays by Reference
Assignment `=` does not copy an array (or object) — it creates another reference to the same data in memory.

### ❌ Bad:
```js
const original = [1, 2, 3];
const copy = original;   // Reference copy
copy.push(4);

console.log(original);   // [1, 2, 3, 4] — original was modified!
```

### ✅ Good:
Create a new shallow copy:
```js
const original = [1, 2, 3];

const copy1 = [...original];       // Spread
const copy2 = original.slice();    // slice
const copy3 = Array.from(original);// constructor

// Shallow only! Nested objects are still shared:
const deep = structuredClone(original);  // True deep copy (Node 17+)
```

---

## 12. Modifying an Array While Iterating
Removing items from an array while looping over it skips elements, because indexes shift under the loop.

### ❌ Bad:
```js
const numbers = [1, 2, 3, 4, 5];
for (const num of numbers) {
  if (num % 2 === 0) {
    numbers.splice(numbers.indexOf(num), 1);  // Skips elements!
  }
}
console.log(numbers);   // [1, 3, 5] — by luck here; often worse
```

### ✅ Good:
Build a filtered array instead:
```js
const numbers = [1, 2, 3, 4, 5];
const odds = numbers.filter(num => num % 2 !== 0);
console.log(odds);   // [1, 3, 5]
```

---

## 13. Catching Everything with a Bare `catch`
An empty or overly broad `catch` block swallows real bugs — typos, type errors, Ctrl+C — making failures invisible.

### ❌ Bad:
```js
try {
  const x = Number(process.argv[2]);
  console.log(10 / x);
} catch (e) {                  // Catches EVERYTHING
  console.log("An error occurred");
}
```

### ✅ Good:
Check for the specific errors you expect and know how to handle:
```js
try {
  const x = Number(process.argv[2]);
  if (Number.isNaN(x)) throw new Error("Please enter a valid number.");
  if (x === 0) throw new Error("Cannot divide by zero.");
  console.log(10 / x);
} catch (e) {
  console.log(e.message);
}
```

---

## 14. Floating-Point Precision
JS numbers are 64-bit floats (like Python's float), so `0.1 + 0.2` is not exactly `0.3`.

### ❌ Bad:
```js
console.log(0.1 + 0.2 === 0.3);   // false
console.log(0.1 + 0.2);           // 0.30000000000000004
```

### ✅ Good:
```js
// Compare with an epsilon tolerance
const nearlyEqual = Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON;
console.log(nearlyEqual);         // true

// Round for display
console.log((0.1 + 0.2).toFixed(2));  // "0.30" (a string — convert back if needed)
```
