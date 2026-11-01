# Chapter 4: Working with Arrays

> Reading notes for Eloquent JavaScript, Chapter 4 (Data Structures) and Chapter 5 (Higher-Order Functions).

## Key Concepts

### Looping Through an Array
```js
const magicians = ["alice", "david", "carolina"];
for (const magician of magicians) {          // for...of — Python's for...in
  console.log(`${magician}, that was a great trick!`);
  console.log(`I can't wait to see your next trick, ${magician}.\n`);
}

console.log("Thank you, everyone!");  // Outside the loop (not inside the block)
```
- The `for...of` loop assigns each item to the loop variable
- **Braces matter** — lines inside `{}` are inside the loop
- `let` declared in the loop header is fresh per iteration (unlike `var`)

### The range equivalent
```js
// JS has no built-in range() — loop with a counter, or build arrays
for (let value = 0; value < 5; value++) console.log(value);   // 0..4
for (let value = 1; value <= 5; value++) console.log(value);  // 1..5
for (let value = 2; value <= 10; value += 2) console.log(value); // 2,4,6,8,10

// Build an array of 1..5
const numbers = Array.from({ length: 5 }, (_, i) => i + 1);   // [1,2,3,4,5]
```

### Numeric Array Functions
```js
const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
Math.min(...digits);                       // 0
Math.max(...digits);                       // 9
digits.reduce((sum, n) => sum + n, 0);     // 45
```

### Map / Filter (Comprehensions)
The compact way to transform arrays — JS's answer to list comprehensions:
```js
// Traditional way
const squares = [];
for (let value = 1; value <= 10; value++) {
  squares.push(value ** 2);
}

// map + Array.from (same result, one line)
const squares2 = Array.from({ length: 10 }, (_, i) => (i + 1) ** 2);
// [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

// With condition — filter
const evens = Array.from({ length: 20 }, (_, i) => i).filter(n => n % 2 === 0);
// [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]
```

### Slicing Arrays
```js
const players = ["charles", "martina", "michael", "florence", "eli"];

players.slice(0, 3);   // ["charles", "martina", "michael"]
players.slice(1, 4);   // ["martina", "michael", "florence"]
players.slice(0, 4);   // First 4
players.slice(2);      // From index 2 to end
players.slice(-3);     // Last 3
// No [::2] step syntax — filter by index:
players.filter((_, i) => i % 2 === 0);   // Every other item

// Looping through a slice
for (const player of players.slice(0, 3)) {
  console.log(player);
}
```

### Copying Arrays
```js
// Correct: spread copy (independent copy)
const myFoods = ["pizza", "falafel", "cake"];
const friendFoods = [...myFoods];

// Wrong: assignment (same array, two names!)
const notACopy = myFoods;   // Both variables point to SAME array!

// Also correct: slice() or Array.from()
const copy2 = myFoods.slice();
const copy3 = Array.from(myFoods);
```

### Destructuring (Python's tuples)
```js
// JS has no tuples — fixed-shape arrays + destructuring play that role
const dimensions = [200, 50];
console.log(dimensions[0]);   // 200
dimensions[0] = 250;          // Allowed — arrays are mutable; use Object.freeze to lock

const [width, height] = dimensions;   // Unpacking

// Swap variables
let a = 1, b = 2;
[a, b] = [b, a];
```

## Common Pitfalls
- **Forgetting the braces** — a `for`/`if` body without `{}` only includes the next statement
- `for...of` iterates **values**; `for...in` iterates **keys** and should be avoided on arrays
- `range(1, 5)` has no direct analog — remember JS loops are `i < n`, not `i <= n`
- Copying with `=` creates a **reference**, not a copy — use spread or `.slice()`
- `sort()` without a comparator sorts alphabetically — pass `(a, b) => a - b` for numbers

## Try It Yourself
1. Use a `for` loop to print numbers 1 through 20
2. Create an array of cubes from 1 to 10 using `Array.from` and `map`
3. Print the first 3 and last 3 items of an array using `slice`
4. Make a copy of an array using spread — modify the copy and confirm the original is unchanged
