# Chapter 8: Functions

> Reading notes for Eloquent JavaScript, Chapter 3: Functions.

## Key Concepts

### Defining a Function
A function is a named block of code designed to do one specific job.

```js
/**
 * Display a simple greeting.
 */
function greetUser(username) {
  console.log(`Hello, ${username}!`);
}

greetUser("jesse");
```

- **JSDoc comment**: The `/** ... */` block above a function is JS's docstring — it describes what the function does, and editors surface it.
- **Parameters vs Arguments**: `username` in the definition is a **parameter**. `"jesse"` in the call is an **argument**.

### Passing Arguments

#### Positional Arguments
Arguments matched based on the order in which they are written.

```js
function describePet(animalType, petName) {
  console.log(`\nI have a ${animalType}.`);
  console.log(`My ${animalType}'s name is ${petName}.`);
}

describePet("hamster", "harry");
```

#### Keyword-Style Arguments
JavaScript has no true keyword arguments — pass an object and destructure it, making order irrelevant:

```js
describePet({ petName: "harry", animalType: "hamster" });  // with object param below

function describePet({ animalType, petName }) {
  console.log(`\nI have a ${animalType}.`);
  console.log(`My ${animalType}'s name is ${petName}.`);
}
```

#### Default Values
Parameters can have default values.

```js
function describePet({ petName, animalType = "dog" }) {
  console.log(`\nI have a ${animalType}.`);
  console.log(`My ${animalType}'s name is ${petName}.`);
}

describePet({ petName: "willie" });     // Uses default "dog"
describePet({ petName: "harry", animalType: "hamster" });
```

### Return Values
Functions return values to the calling line using the `return` statement (no explicit `undefined` if you omit it).

```js
function getFormattedName(firstName, lastName) {
  const fullName = `${firstName} ${lastName}`;
  return fullName.toUpperCase();  // (no built-in title case in JS)
}

const musician = getFormattedName("jimi", "hendrix");
console.log(musician);  // "JIMI HENDRIX"
```

- **Returning an Object**:
```js
function buildPerson(firstName, lastName, age = null) {
  const person = { first: firstName, last: lastName };
  if (age) {
    person.age = age;
  }
  return person;
}
```

### Passing an Array to a Function
When you pass an array to a function, the function gets a reference to it. Any changes made inside the function modify the original array.

```js
function printModels(unprintedDesigns, completedModels) {
  while (unprintedDesigns.length > 0) {
    const currentDesign = unprintedDesigns.pop();
    console.log(`Printing model: ${currentDesign}`);
    completedModels.push(currentDesign);
  }
}
```

- **Preventing Modification**: To keep the original array intact, pass a copy using spread:
```js
printModels([...unprintedDesigns], completedModels);
```

### Passing an Arbitrary Number of Arguments
Use **rest parameters** to accept an unknown number of arguments (they arrive as a real array — better than Python's tuple):

```js
function makePizza(...toppings) {
  // toppings is collected as an array
  console.log(toppings);
}

makePizza("pepperoni");
makePizza("mushrooms", "green peppers", "extra cheese");
```

- **Options object** (the `**kwargs` pattern):
```js
function buildProfile(first, last, ...userInfoPairs) {
  const profile = Object.fromEntries(userInfoPairs);
  profile.firstName = first;
  profile.lastName = last;
  return profile;
}
// More idiomatic: take an options object
function buildProfile2(first, last, info = {}) {
  return { firstName: first, lastName: last, ...info };
}
const userProfile = buildProfile2("albert", "einstein", { location: "princeton", field: "physics" });
```

### Storing Functions in Modules
You can store functions in a separate file (a **module**) and import them with `require` (CommonJS).

Assuming a module named `pizza.js` with `module.exports = { makePizza }`:
```js
// Import the entire module
const pizza = require("./pizza");
pizza.makePizza(16, "pepperoni");

// Destructure specific functions
const { makePizza } = require("./pizza");
makePizza(16, "pepperoni");

// Rename on import (alias)
const mp = require("./pizza").makePizza;
mp(16, "pepperoni");

// Note: JS has no "import *" — destructuring picks exactly what you need
```

## Common Pitfalls
- **Positional Argument Mix-up**: Writing arguments in the wrong order when calling a function — prefer an options object when there are several.
- **Modifying Arrays Unintentionally**: Passing an array to a function and forgetting that operations like `.pop()` or `.splice()` will affect the caller's array.
- **Shadowing Names**: Using a variable name inside a function that masks an outer variable, causing confusion.
- **Arrow function `this`**: Arrow functions don't get their own `this` — great for callbacks, wrong for object methods.

## Try It Yourself
1. Write a function called `displayMessage()` that prints a sentence telling everyone what you are learning about in this chapter. Call the function.
2. Write a function called `makeShirt()` that accepts a size and the text of a message that should be printed on the shirt. Use both positional and object-style arguments to call it.
3. Write a function called `sendMessages()` that prints each text message from an array and moves them to a new array. Ensure the original array is preserved.
