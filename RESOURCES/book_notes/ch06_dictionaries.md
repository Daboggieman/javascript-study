# Chapter 6: Objects and Maps

> Reading notes for Eloquent JavaScript, Chapter 4 (Data Structures: Objects) and Chapter 6 (The Secret Life of Objects).

## Key Concepts

### What Is an Object?
An object in JavaScript is a mutable collection of **key-value pairs** (properties). Keys are strings or Symbols; values can be anything. For dynamic or non-string keys, JavaScript also provides the `Map` type.

```js
const alien0 = { color: "green", points: 5 };
console.log(alien0.color);    // "green"  (no KeyError — undefined if missing)
console.log(alien0["points"]); // 5
```

### Working with Objects
```js
// Adding new key-value pairs
alien0.xPosition = 0;
alien0["yPosition"] = 25;

// Starting with an empty object
const alien1 = {};
alien1.color = "blue";

// Modifying values
alien0.color = "yellow";

// Removing key-value pairs (permanent)
delete alien0.points;
```

### Using `??` to Access Missing Values
If you access a key that doesn't exist, JavaScript returns `undefined` (no error!). To supply a default, use `??` (nullish coalescing) or `||`.

```js
const alien0 = { color: "green", speed: "slow" };
// alien0.points          // undefined — no error, but often a silent bug
const pointsValue = alien0.points ?? "No point value assigned.";
console.log(pointsValue);  // "No point value assigned."
```

### Looping Through an Object
You can loop through all key-value pairs, keys, or values.

```js
const user0 = {
  username: "efermi",
  first: "enrico",
  last: "fermi",
};

// Loop through all key-value pairs
for (const [key, value] of Object.entries(user0)) {
  console.log(`Key: ${key}, Value: ${value}`);
}

// Loop through all keys
for (const name of Object.keys(user0)) {
  console.log(name);
}

// Loop through keys in sorted order
for (const name of Object.keys(user0).sort()) {
  console.log(name);
}

// Loop through all values
for (const val of Object.values(user0)) {
  console.log(val);
}

// Loop through unique values using Set
const favoriteLanguages = { jen: "python", sarah: "c", edward: "ruby", phil: "python" };
for (const lang of new Set(Object.values(favoriteLanguages))) {
  console.log(lang);  // python, c, ruby
}
```

### Map — for Dynamic Keys
Objects are best for fixed, known keys. When keys arrive at runtime or you need non-string keys, use `Map`:

```js
const scores = new Map();
scores.set("alice", 90);
scores.set("bob", 85);
scores.get("alice");     // 90 (undefined if missing)
scores.has("alice");     // true
scores.delete("bob");
scores.size;             // 1 — like len(dict)

// Map iterates pairs directly
for (const [name, score] of scores) {
  console.log(`${name}: ${score}`);
}
```

### Nesting
You can store objects inside arrays, arrays inside objects, or objects inside objects.

```js
// An array of objects
const aliens = [
  { color: "green", points: 5 },
  { color: "yellow", points: 10 },
  { color: "red", points: 15 },
];

// An array inside an object
const pizza = {
  crust: "thick",
  toppings: ["mushrooms", "extra cheese"],
};

// An object inside an object
const users = {
  aeinstein: { first: "albert", last: "einstein", location: "princeton" },
  mcurie: { first: "marie", last: "curie", location: "paris" },
};
```

## Common Pitfalls
- **Silent `undefined`**: Accessing a missing property returns `undefined` instead of raising an error. Use `??` with a default, or check `if ("key" in obj)`.
- **Python truthiness**: `if (obj)` does not tell you if an object is empty — objects are always truthy. Check `Object.keys(obj).length === 0`.
- **Modifying while looping**: Avoid adding/deleting keys during `for...in` or `Object.keys()` iteration; build a list of changes first.

## Try It Yourself
1. Create an object representing a person with first name, last name, age, and city. Print each piece of information.
2. Use an object to store people's favorite numbers. Loop through and print each person's name and favorite number.
3. Make three objects representing different pets. Store all three in an array called `pets`. Loop through your array and print everything you know about each pet.
