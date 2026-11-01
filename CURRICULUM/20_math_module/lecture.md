# 20: The `Math` Object

JavaScript's built-in arithmetic (`+`, `-`, `*`, `/`) covers the basics, but real programs frequently need square roots, trigonometry, logarithms, and more precise constants. That's what the global `Math` object provides.

---

## 1. Constants

```js
console.log(Math.PI);   // 3.141592653589793
console.log(Math.E);    // 2.718281828459045
console.log(Infinity);  // infinity -- useful as a starting "worst case" value
console.log(NaN);       // "not a number"
```

```js
let bestSoFar = Infinity;
for (const value of [5, 2, 8, 1]) {
  bestSoFar = Math.min(bestSoFar, value);
}
console.log(bestSoFar);   // 1
```

---

## 2. Rounding and Truncation

```js
console.log(Math.floor(4.7));    // 4  -- always rounds DOWN
console.log(Math.ceil(4.2));     // 5  -- always rounds UP
console.log(Math.trunc(4.9));    // 4  -- chops off the decimal, toward zero
console.log(Math.trunc(-4.9));   // -4 -- note: different from floor(-4.9), which is -5!
console.log(Math.round(4.5));    // 5  -- rounds half UP (Python's round(4.5) is 4 -- banker's rounding!)
```

**Callout**: JS has no separate `round()` function — it's `Math.round`, and it rounds halves *up* (toward +Infinity), not "half to even" like Python.

---

## 3. Powers, Roots, and Logarithms

```js
console.log(Math.sqrt(16));     // 4
console.log(Math.pow(2, 10));   // 1024    -- same result as 2 ** 10
console.log(Math.log(100) / Math.LN10);  // ~2.0  -- no two-argument log; divide by the base's log
console.log(Math.log2(8));      // 3
console.log(Math.log10(1000));  // 3
console.log(Math.exp(1));       // 2.718281828459045 -- e^1
```

**Callout**: `Math.log(x)` is the *natural* log (like Python's `math.log(x)` with one argument), but JavaScript has no `math.log(100, 10)` two-argument form — compute base-10 logs with `Math.log10(x)` instead.

---

## 4. Trigonometry

```js
console.log(Math.sin(Math.PI / 2));  // 1
console.log(Math.cos(0));            // 1
console.log((180 * Math.PI) / 180 === Math.PI);  // degrees-to-radians is manual:
const degrees = 180;
console.log((degrees * Math.PI) / 180);  // 3.141592653589793
```

Trig functions expect **radians**, not degrees — JavaScript has no `Math.degrees()`/`Math.radians()`, so convert by hand: `radians = degrees * Math.PI / 180` and back.

---

## 5. Useful Utility Functions

```js
console.log(Math.abs(-7));       // 7 -- absolute value
console.log(Math.max(3, 9, 2));  // 9
console.log(Math.min(3, 9, 2));  // 2
console.log(Math.sign(-5));      // -1
console.log(Math.hypot(3, 4));   // 5 -- Euclidean distance/hypotenuse
```

**Callout**: JavaScript has no `math.gcd()`, no `math.factorial()`, and no `math.isclose()` — write them yourself (loops/recursion, and epsilon comparison for floats). That's exactly what the exercises below ask you to do.

**Why epsilon comparison matters:** floating-point numbers can't represent every decimal value exactly, so `0.1 + 0.2 === 0.3` is actually `false` in JavaScript! Compare with a small tolerance instead of exact equality, which is almost always what you actually want when comparing floats.

```js
console.log(0.1 + 0.2 === 0.3);   // false (!)
console.log(Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON);  // true
```

---

## 6. `Math` vs Statistics (Do It Yourself)

For averages, medians, and standard deviation, JavaScript has no `statistics` module — the idiomatic tool is `.reduce()`:

```js
const data = [2, 4, 4, 4, 5, 5, 7, 9];

const mean = data.reduce((a, b) => a + b, 0) / data.length;
console.log(mean);  // 5

const sorted = [...data].sort((a, b) => a - b);
const mid = Math.floor(sorted.length / 2);
const median = sorted.length % 2 !== 0
  ? sorted[mid]
  : (sorted[mid - 1] + sorted[mid]) / 2;
console.log(median);  // 4.5
```

---

## 📚 Resources

- **MDN:** [Math — JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math)
- **MDN:** [Number.EPSILON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/EPSILON)

---

## 🧠 Try It Yourself

1. Write a function `hypotenuse(a, b)` using `Math.sqrt` (then check your answer against `Math.hypot(a, b)`).
2. Demonstrate the floating-point precision problem: print `0.1 + 0.2 === 0.3` and then the correct comparison using `Number.EPSILON`.
3. Write a function `isPrime(n)` that checks primality efficiently by only testing divisors up to `Math.sqrt(n)` (no need to check beyond that point).
4. Compute the mean and standard deviation of an array of 10 numbers using `.reduce()`.
