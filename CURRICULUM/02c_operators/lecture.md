# Lecture 02c: Operators and Expressions

Operators let you build expressions and perform computations in JavaScript.

---

## 1. Arithmetic Operators

```js
console.log(10 + 3);
console.log(10 - 3);
console.log(10 * 3);
console.log(10 / 3);
console.log(Math.floor(10 / 3));
console.log(10 % 3);
console.log(2 ** 3);
```

- `+` addition
- `-` subtraction
- `*` multiplication
- `/` division (always produces a decimal-friendly `number` — there is no integer division)
- `Math.floor(x / y)` — floor division (JavaScript has no `//` operator)
- `%` modulus
- `**` exponentiation

**Callout**: `Math.floor` rounds *down* (towards negative infinity), while `Math.trunc` cuts off the decimal part (towards zero). For positive numbers they agree; for negatives they differ: `Math.floor(-7 / 2)` is `-4`, but `Math.trunc(-7 / 2)` is `-3`.

---

## 2. Comparison Operators

```js
console.log(5 > 3);
console.log(5 < 3);
console.log(5 === 3);
console.log(5 !== 3);
```

These return `true` or `false`.

**Callout**: Always use `===` and `!==`. The looser `==` and `!=` convert types before comparing (`"5" == 5` is `true`, which causes bugs). With `===`, `"5" === 5` is `false`.

---

## 3. Logical Operators

```js
const age = 20;
const isStudent = true;

console.log(age >= 18 && isStudent);
console.log(age < 18 || isStudent);
console.log(!isStudent);
```

- `&&` logical AND (Python's `and`)
- `||` logical OR (Python's `or`)
- `!` logical NOT (Python's `not`)

---

## 4. Assignment Operators

```js
let x = 10;
x += 2;
x -= 1;
x *= 3;
```

These are shorthand for updating a variable. Note they need `let` (or `var`), since `const` variables cannot be reassigned.

---

## 🧠 Try It Yourself
1. Write an expression that calculates the average of two numbers.
2. Compare two values and print whether they are equal (use `===`).
3. Use `&&`, `||`, and `!` in a small example.
