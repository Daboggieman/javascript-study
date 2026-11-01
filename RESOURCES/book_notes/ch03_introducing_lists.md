# Chapter 3: Introducing Arrays

> Reading notes for Eloquent JavaScript, Chapter 4 (Data Structures: Arrays).

## Key Concepts

### What Is an Array?
An array is an **ordered, mutable collection** of items. Arrays can hold any data type and mix types.

```js
const bicycles = ["trek", "cannondale", "redline", "specialized"];
console.log(bicycles);  // ['trek', 'cannondale', 'redline', 'specialized']
```

### Accessing Elements
```js
bicycles[0];      // "trek" (first element — zero-indexed!)
bicycles.at(-1);  // "specialized" (last element — no negative indexing otherwise)
bicycles[1];      // "cannondale"
```

### Modifying Arrays

```js
// Change an element
const motorcycles = ["honda", "yamaha", "suzuki"];
motorcycles[0] = "ducati";        // ["ducati", "yamaha", "suzuki"]

// Add elements
motorcycles.push("harley");       // Add to end
motorcycles.unshift("bmw");       // Add to start
motorcycles.splice(1, 0, "kawasaki"); // Insert at position 1

// Remove elements
motorcycles.splice(0, 1);         // Delete by index
const popped = motorcycles.pop(); // Remove & return last
const shifted = motorcycles.shift(); // Remove & return first
const idx = motorcycles.indexOf("yamaha");
if (idx !== -1) motorcycles.splice(idx, 1);  // Remove by value (first match)
```

### Organizing Arrays
```js
const cars = ["bmw", "audi", "toyota", "subaru"];

// Permanent sort
cars.sort();                                // Alphabetical (in place)
cars.sort((a, b) => b.localeCompare(a));    // Reverse alphabetical

// Temporary sort
const sortedCars = cars.toSorted();         // New array, original unchanged

// Reverse order
cars.reverse();                             // Reverses in place

// Length
cars.length;                                // 4
```

### Avoiding Index Errors
```js
const bikes = ["honda", "yamaha"];
// bikes[5];    // undefined — JS does NOT throw, it silently gives undefined!
// bikes.at(5); // undefined
```
- Unlike Python's `IndexError`, out-of-range access returns `undefined` — bugs hide more easily
- Use `.length` to check before accessing
- An empty array `[]` has no valid index

## Common Pitfalls
- **Off-by-one errors**: Arrays are zero-indexed — the first item is `[0]`, not `[1]`
- `indexOf()` + `splice()` only removes the **first** occurrence
- `sort()` mutates in place and returns the same array — `const c = cars.sort()` loses the original
- `sort()` with no comparator sorts **alphabetically** — `[10, 9, 100].sort()` is `[10, 100, 9]`
- Accessing an index beyond the array length returns `undefined` silently instead of raising an error

## Try It Yourself
1. Create an array of 5 friends' names and print each using their index
2. Add a name, remove a name, and replace a name
3. Sort the array alphabetically, then reverse it
4. Try to access an index that doesn't exist — notice you get `undefined`, not an error
