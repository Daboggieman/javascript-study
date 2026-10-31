# Lecture 07: Loops

Loops allow you to execute a block of code repeatedly. JavaScript supports `for` loops (several flavors) and `while` loops.

---

## 1. For Loops
JavaScript's plain `for` loop is a counted loop — the direct replacement for Python's `range()`:

```js
for (let i = 0; i < 5; i++) {   // like: for i in range(5)   # 0, 1, 2, 3, 4
  console.log(i);
}

for (let i = 2; i < 6; i++) {   // like: for i in range(2, 6)  # 2, 3, 4, 5
  console.log(i);
}

for (let i = 0; i < 10; i += 2) {  // like: for i in range(0, 10, 2)  # 0, 2, 4, 6, 8
  console.log(i);
}
```

### The for...of Loop
To iterate over a sequence (array, string), use `for...of` — the analog of Python's `for item in sequence`:

```js
const fruits = ["apple", "banana", "cherry"];
for (const fruit of fruits) {
  console.log(fruit);
}
```

**Callout**: Need the index too (Python's `enumerate`)? Use `.entries()` or `forEach`:
```js
fruits.forEach((fruit, i) => console.log(i, fruit));
```

---

## 2. While Loops
`while` loops run as long as a specified condition is `true`.

```js
let count = 1;
while (count <= 5) {
  console.log(count);
  count += 1;
}
```

---

## 3. Break and Continue
- **`break`**: Exits the loop immediately.
- **`continue`**: Skips the remaining code in the current iteration and jumps to the next iteration.

```js
// Break example
for (let num = 0; num < 10; num++) {
  if (num === 5) {
    break;
  }
  console.log(num);  // Prints 0, 1, 2, 3, 4
}

// Continue example
for (let num = 0; num < 5; num++) {
  if (num === 2) {
    continue;
  }
  console.log(num);  // Prints 0, 1, 3, 4
}
```

---

## 4. There Is No Loop-Else in JavaScript
Python has an optional `else` block for loops. **JavaScript does not.** The idiomatic replacement is a flag variable:

```js
let finishedNaturally = true;
for (let num = 0; num < 5; num++) {
  console.log(num);
  // ...if some condition were met, we would break and set finishedNaturally = false;
}
if (finishedNaturally) {
  console.log("Loop finished successfully!");
}
```

---

## 5. Map, Filter, and Friends (instead of comprehensions)
JavaScript has no comprehension syntax. The concise way to build arrays and objects is with array methods:

### .map + .filter (list comprehension)
`[expression for item in iterable if condition]` becomes a `.filter().map()` chain:

```js
// Create a list of squares of even numbers
const squares = Array.from({ length: 10 }, (_, x) => x)  // 0..9 (the "range" of JS)
  .filter((x) => x % 2 === 0)
  .map((x) => x ** 2);
console.log(squares);  // [0, 4, 16, 36, 64]
```

### Object building (dictionary comprehension)
```js
// Key: number, Value: square of number
const squaresDict = Object.fromEntries(
  Array.from({ length: 5 }, (_, x) => x).map((x) => [x, x ** 2])
);
console.log(squaresDict);  // { '0': 0, '1': 1, '2': 4, '3': 9, '4': 16 }
```

---

## 🧠 Try It Yourself
1. Write a `while` loop that prompts the user for inputs and prints them, terminating only when the user inputs `"quit"`.
2. Using `.filter()`, extract all words starting with 'a' from the array `["apple", "banana", "apricot", "cherry"]`.
