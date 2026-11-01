# 18: Iterators and Generators

Every `for...of` loop you've ever written relies on a concept called the **iterator protocol**. This lesson pulls back the curtain on how `for (const x of something)` actually works, then introduces **generators** — a much simpler way to write your own iterators.

---

## 1. Iterable vs Iterator

- An **iterable** is anything you can loop over (`Array`, `String`, `Map`, `Set`, etc.) — it has a `[Symbol.iterator]` method.
- An **iterator** is the object that actually does the stepping — it has a `next()` method that returns `{ value, done }`, with `done: true` when exhausted.

```js
const nums = [1, 2, 3];          // nums is an ITERABLE
const it = nums[Symbol.iterator]();  // Symbol.iterator asks it for an ITERATOR
console.log(it.next());          // { value: 1, done: false }
console.log(it.next());          // { value: 2, done: false }
console.log(it.next());          // { value: 3, done: false }
console.log(it.next());          // { value: undefined, done: true }
```

A `for...of` loop is just this process automated:
```js
for (const x of nums) {
  console.log(x);
}

// is roughly equivalent to:
const it2 = nums[Symbol.iterator]();
while (true) {
  const { value, done } = it2.next();
  if (done) break;
  console.log(value);
}
```

**Callout**: Instead of raising `StopIteration` like Python, a JS iterator returns a `{ value, done }` result object — exhaustion is a *value*, not an exception.

---

## 2. Building Your Own Iterator (the Verbose Way)

```js
class Countdown {
  constructor(start) {
    this.current = start;
  }

  [Symbol.iterator]() {         // the iterable IS its own iterator here
    return this;
  }

  next() {
    if (this.current <= 0) {
      return { value: undefined, done: true };
    }
    const value = this.current;
    this.current -= 1;
    return { value, done: false };
  }
}

for (const n of new Countdown(3)) {
  console.log(n);     // 3, 2, 1
}
```

This works, but it's a lot of boilerplate for something conceptually simple. That's exactly the problem generators solve.

---

## 3. Generators: The Easy Way

A **generator function** uses `function*` and `yield` instead of `return`. Each call to `yield` pauses the function, remembering exactly where it left off, and resumes from that point the next time a value is requested.

```js
function* countdown(start) {
  let current = start;
  while (current > 0) {
    yield current;
    current -= 1;
  }
}

for (const n of countdown(3)) {
  console.log(n);     // 3, 2, 1
}
```

Same behavior as the `Countdown` class above, in 5 lines instead of 12. `countdown(3)` doesn't run the function immediately — calling a generator function returns a **generator object**, and the code only actually runs step-by-step as you iterate it.

```js
const gen = countdown(3);
console.log(gen);        // Object [Generator] {}
console.log(gen.next()); // { value: 3, done: false } -- runs up to the first yield
console.log(gen.next()); // { value: 2, done: false } -- resumes right after the last yield
```

---

## 4. Why Generators Matter: Laziness and Memory

```js
function* allSquaresList(n) {
  // A plain array version: Array.from({ length: n }, (_, i) => i ** 2)
  // builds the ENTIRE array in memory at once.
  for (let i = 0; i < n; i++) {
    yield i ** 2;         // produces ONE value at a time, on demand
  }
}

// Array.from({ length: 10_000_000 }, ...) allocates a huge array immediately.
// allSquaresList(10_000_000) uses almost no memory until you actually consume it.
for (const sq of allSquaresList(10_000_000)) {
  if (sq > 100) {
    break;     // we only ever computed a handful of squares, not 10 million
  }
}
```

This "produce values one at a time, only when asked" behavior is called **laziness**, and it's why generators are the standard tool for processing large or infinite sequences.

---

## 5. Lazy Sequences Without Generators

Python has a shorthand — the generator expression `(x**2 for x in range(5))`. JavaScript has no such syntax, but two idiomatic lazy alternatives:

```js
// 1. A one-line generator function
function* squaresGen() {
  for (let x = 0; x < 5; x++) yield x ** 2;
}

// 2. Eager building with Array.from + .reduce for the sum
const squaresList = Array.from({ length: 5 }, (_, x) => x ** 2);  // built immediately: [0, 1, 4, 9, 16]
const total = squaresList.reduce((a, b) => a + b, 0);
console.log(total);  // 30
```

**Callout**: Python's `sum(gen)`, `max(gen)` etc. accept any iterable. JS's `.reduce`/`Math.max` work on arrays — so for a lazy sum, accumulate in the loop (or spread a small generator into an array first).

---

## 6. Hand-Rolled Lazy Utilities (No `itertools` in JS)

JavaScript has no `itertools` module — but with generators, the toolbox is a few lines away:

```js
// itertools.count(start, step): infinite counter
function* count(start = 0, step = 1) {
  let n = start;
  while (true) yield n, (n += step);
}

const counter = count(1, 2);                     // infinite: 1, 3, 5, 7, ...
const first5 = Array.from({ length: 5 }, () => counter.next().value);
console.log(first5);                             // [1, 3, 5, 7, 9]

// itertools.chain: several iterables, one after another
function* chain(...iterables) {
  for (const iterable of iterables) yield* iterable;
}
console.log([...chain([1, 2], [3, 4])]);         // [1, 2, 3, 4]

// itertools.permutations: all orderings of a given length
function* permutations(arr, k = arr.length) {
  if (k === 0) { yield []; return; }
  for (let i = 0; i < arr.length; i++) {
    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
    for (const perm of permutations(rest, k - 1)) {
      yield [arr[i], ...perm];
    }
  }
}
console.log([...permutations([1, 2, 3], 2)]);    // all length-2 orderings
```

(`yield*` delegates to another generator — the analog of `yield from` in Python.)

---

## 📚 Resources

- **MDN:** [Iterators and generators | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_generators)
- **MDN:** [`function*` — Generator functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)
- **MDN:** [`for...of` statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)

---

## 🧠 Try It Yourself

1. Build the `Countdown` iterator class exactly as shown, then rewrite it as a `countdown()` generator function — confirm both produce identical output.
2. Write a generator `fibonacci(n)` that yields the first `n` Fibonacci numbers, one at a time.
3. Write a generator that produces squares from 1 to 1,000,000 lazily, and sum them in a `for...of` loop with an accumulator — without ever building a full array.
4. Explore the `count`, `chain`, and `permutations` generators above — write one small example program using each.
