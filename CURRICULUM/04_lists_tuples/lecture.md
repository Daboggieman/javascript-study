# Lecture 04: Lists & Tuples

In JavaScript, arrays are used to store multiple items in a single variable. (JavaScript has no separate "tuple" type — more on that in section 3.)

---

## 1. Lists (Arrays)
A **list** (called an *array* in JavaScript) is an ordered, mutable (changeable) collection of items. Arrays are defined using square brackets `[]`.

```js
const motorcycles = ["honda", "yamaha", "suzuki"];
```

### Accessing Elements
Arrays are zero-indexed:
```js
console.log(motorcycles[0]);            // "honda"
console.log(motorcycles[motorcycles.length - 1]);  // "suzuki" (last element)
```

**Callout**: No negative indexing in JavaScript — `motorcycles[-1]` is `undefined`. Use `motorcycles[motorcycles.length - 1]` or the `.at(-1)` method:
```js
console.log(motorcycles.at(-1));  // "suzuki"
```

### Modifying Elements
```js
motorcycles[0] = "ducati";
console.log(motorcycles);  // ["ducati", "yamaha", "suzuki"]
```

**Callout**: Even though the array is declared with `const`, you *can* modify its contents! `const` only stops you from reassigning the variable to a whole different array.

### Adding Elements
- **`.push()`**: Adds an item to the end of the array (Python's `append()`).
- **`.splice(index, 0, item)`**: Adds an item at a specific index (Python's `insert()`).

```js
motorcycles.push("honda");             // Adds to the end
motorcycles.splice(1, 0, "harley");    // Inserts at index 1
```

### Removing Elements
- **`.splice(index, 1)`**: Deletes an item at a specific index (permanent, like Python's `del`).
- **`.pop()`**: Removes and returns the last item.
- **`.indexOf(value)` + `.splice()`**: Removes the first occurrence of a value (Python's `remove()`).

```js
motorcycles.splice(0, 1);                    // Deletes the first element
const poppedBike = motorcycles.pop();        // Removes and returns last element
const i = motorcycles.indexOf("yamaha");
if (i !== -1) motorcycles.splice(i, 1);      // Removes by value
```

---

## 2. Organizing Lists
- **`.sort()`**: Sorts the array in place (permanently).
- **`.toSorted()`**: Returns a sorted copy, leaving the original unchanged (like Python's `sorted()`).
- **`.reverse()`**: Reverses the order of the array permanently.
- **`.length`**: Returns the length (number of items) in the array.

```js
const cars = ["bmw", "audi", "toyota", "subaru"];
cars.sort();               // Permanent sort
console.log(cars.toSorted());  // Temporary sort
cars.reverse();            // Permanent reverse
console.log(cars.length);  // 4
```

**Callout**: JavaScript's `.sort()` converts numbers to strings by default, so `[42, 7, 19].sort()` gives `[19, 42, 7]`! For numbers, always pass a comparator: `.sort((a, b) => a - b)`.

---

## 3. "Tuples" in JavaScript
JavaScript has no built-in tuple type. Your options:

```js
// 1. A plain array — the most common choice
const dimensions = [200, 50];
console.log(dimensions[0]);  // 200

// 2. A frozen array — truly immutable (assignment silently fails or throws in strict mode)
const frozen = Object.freeze([200, 50]);
// frozen[0] = 250;  // No effect in sloppy mode, TypeError in strict mode
```

Remember that `const` alone does not make an array immutable — only the *binding* is constant.

---

## 4. Packing and Unpacking (Destructuring)
You can pack values into an array, and unpack them into individual variables — JavaScript calls this **destructuring**.

```js
// Packing
const coordinates = [10, 20];

// Unpacking
const [x, y] = coordinates;
console.log(x);  // 10
console.log(y);  // 20
```

---

## 🧠 Try It Yourself
1. Create an array of 5 movies. Add one movie to the end, insert one in the middle, and pop the last one. Print the array length.
2. Create a frozen array containing three items of food. Try to change one of the foods in strict mode and look at the error.
