# Lecture 08: Functions

Functions are named blocks of code designed to perform a specific task. They help make your code reusable, organized, and modular.

---

## 1. Defining a Function
Use the `function` keyword followed by the function name and parentheses:

```js
/**
 * Display a simple greeting.  // JSDoc comment (the docstring of JavaScript)
 */
function greet() {
  console.log("Hello, World!");
}

greet();  // Call the function
```

- **JSDoc**: The `/** ... */` block comment is JavaScript's documentation convention. It describes what the function does, its parameters (`@param`), and return value (`@returns`). Editors show it on hover.

---

## 2. Arguments and Parameters
- **Parameters**: Variables listed in the function definition (e.g., `name` below).
- **Arguments**: Values passed to the function when calling it (e.g., `"Alice"` below).

```js
function greetUser(name) {
  console.log(`Hello, ${name}!`);
}

greetUser("Alice");
```

---

## 3. Positional vs "Keyword" Arguments
You can pass arguments by position. **JavaScript has no keyword arguments** — you cannot write `greetUser(name: "Rex")`. The idiomatic replacement for Python's keyword arguments is passing an object and destructuring it:

```js
function describePet(animalType, petName) {
  console.log(`I have a ${animalType} named ${petName}.`);
}

// Positional (order matters)
describePet("dog", "Rex");

// "Keyword"-style (order does not matter) — pass one object parameter
function describePetNamed({ animalType, petName }) {
  console.log(`I have a ${animalType} named ${petName}.`);
}

describePetNamed({ petName: "Rex", animalType: "dog" });
```

---

## 4. Default Values
Parameters can have default values. Like Python, parameters with default values must come *after* parameters without defaults.

```js
function describePet(petName, animalType = "dog") {
  console.log(`I have a ${animalType} named ${petName}.`);
}

describePet("Rex");               // Uses default "dog"
describePet("Whiskers", "cat");   // Overrides default
```

---

## 5. Return Values
Functions can send data back to the caller using the `return` statement. If no `return` is executed, the function returns `undefined` (Python's analog of `None`).

```js
function add(a, b) {
  return a + b;
}

const result = add(5, 3);
console.log(result);  // 8
```

---

## 6. Arbitrary Arguments (rest parameters)
Sometimes you don't know how many arguments will be passed to a function.

- **Rest parameters (`...args`)**: Collect extra positional arguments into an **array** (Python's `*args`).
- **Rest object (`...userInfo`)**: Collects the remaining properties of an object argument (the closest analog to Python's `**kwargs`).

```js
// Arbitrary positional arguments
function makePizza(...toppings) {
  console.log(toppings);  // e.g., ['mushrooms', 'peppers']
}

makePizza("mushrooms", "peppers");

// Arbitrary "keyword" arguments
function buildProfile(first, last, ...rest) {
  return { firstName: first, lastName: last, ...rest };
}

const profile = buildProfile("Albert", "Einstein", { location: "Princeton", field: "Physics" });
console.log(profile);
```

---

## 7. Variable Scope
- **Local scope**: Variables defined inside a function can only be accessed inside that function.
- **Global scope**: Variables defined outside functions can be accessed anywhere.

```js
const x = 10;  // Global variable

function myFunc() {
  const y = 5;  // Local variable
  console.log(x);  // Accessible
  console.log(y);  // Accessible
}

myFunc();
// console.log(y);  // ReferenceError: y is not defined
```

---

## 8. Arrow Functions
Arrow functions are small, anonymous functions defined with `=>`. They are the analog of Python's lambdas — but unlike lambdas, they can have full function bodies:

```js
// Concise body: the expression is returned automatically
const square = (num) => num ** 2;
console.log(square(5));  // 25

// Full body (needs an explicit return)
const squareFull = (num) => {
  return num ** 2;
};
```

**Callout**: Arrow functions also differ from regular functions in how they bind `this` — a topic for the OOP lecture. For now: use arrow functions for small callbacks, regular functions for named top-level ones.

---

## 🧠 Try It Yourself
1. Write a function called `cityCountry()` that takes the name of a city and its country. The function should return a string formatted like `"Santiago, Chile"`.
2. Write a function that accepts an array of numbers and returns a new array containing only the even numbers from the original array.
