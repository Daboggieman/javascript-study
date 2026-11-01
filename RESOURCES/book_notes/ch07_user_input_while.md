# Chapter 7: User Input and while Loops

> Reading notes for Eloquent JavaScript, Chapter 2 (Loops) + Node.js `readline/promises` for input.

## Key Concepts

### How Terminal Input Works in Node
Python's `input()` blocks until the user types a line. Node's `readline/promises` module does the same with async/await — the program pauses at `await rl.question(...)` and stores the answer as a **string**.

```js
// poll.js — run with: node poll.js
const readline = require("readline/promises");
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

(async () => {
  const message = await rl.question("Tell me something, and I will repeat it back to you: ");
  console.log(message);
  rl.close();
})();
```

- **Type casting**: Since input always arrives as a string, use `Number()` to convert it for math.

```js
const age = Number(await rl.question("How old are you? "));
if (age >= 18) {
  console.log("You are eligible to vote!");
}
```

- **Modulo Operator (`%`)**: Often used to check division properties (e.g., even or odd).

```js
const number = Number(await rl.question("Enter a number: "));
if (number % 2 === 0) {
  console.log("Even");
} else {
  console.log("Odd");
}
```

### Introducing `while` Loops
A `for...of` loop takes a collection of items and executes a block once for each item. A `while` loop runs as long as a certain condition remains `true`.

```js
let currentNumber = 1;
while (currentNumber <= 5) {
  console.log(currentNumber);
  currentNumber += 1;
}
```

### Letting the User Choose When to Quit
```js
(async () => {
  const prompt = "\nTell me something, and I will repeat it back to you:\nEnter 'quit' to end the program. ";

  let message = "";
  while (message !== "quit") {
    message = await rl.question(prompt);
    if (message !== "quit") {
      console.log(message);
    }
  }
  rl.close();
})();
```

### Using a Flag
For complex programs with many conditions that should end the program, define one variable (a **flag**) that acts as a signal to keep the program running.

```js
let active = true;
while (active) {
  const message = await rl.question(prompt);
  if (message === "quit") {
    active = false;
  } else {
    console.log(message);
  }
}
```

### Using `break` to Exit a Loop
To exit a `while` loop immediately — regardless of the loop condition — use `break`.

```js
while (true) {
  const city = await rl.question("Please enter a city you have visited (or 'quit'): ");
  if (city === "quit") {
    break;
  }
  console.log(`I'd love to go to ${city}!`);
}
```

### Using `continue` in a Loop
To skip the rest of the current iteration and return to the beginning of the loop, use `continue`.

```js
// Print only odd numbers
let currentNumber = 0;
while (currentNumber < 10) {
  currentNumber += 1;
  if (currentNumber % 2 === 0) {
    continue;
  }
  console.log(currentNumber);
}
```

### Using a `while` Loop with Arrays and Objects
Using loops with collections allows you to collect, store, and organize input.

```js
// Moving items from one array to another
const unconfirmedUsers = ["alice", "brian", "candace"];
const confirmedUsers = [];

while (unconfirmedUsers.length > 0) {
  const currentUser = unconfirmedUsers.pop();
  console.log(`Verifying user: ${currentUser}`);
  confirmedUsers.push(currentUser);
}

// Removing all instances of a specific value from an array
const pets = ["dog", "cat", "dog", "goldfish", "cat", "rabbit", "cat"];
while (pets.includes("cat")) {
  pets.splice(pets.indexOf("cat"), 1);
}

// Filling an object with user input (inside an async main function)
const responses = {};
let pollingActive = true;

while (pollingActive) {
  const name = await rl.question("\nWhat is your name? ");
  const response = await rl.question("Which mountain would you like to climb someday? ");
  responses[name] = response;

  const repeat = await rl.question("Would you like to let another person respond? (yes/no) ");
  if (repeat === "no") {
    pollingActive = false;
  }
}
```

## Common Pitfalls
- **Infinite Loops**: Loops that never terminate because the condition is always true. Always ensure there is a clear path to make the condition false, or call a `break`.
- **TypeError with Inputs**: Forgetting to convert string inputs with `Number()` before doing math — `"5" + 5` is `"55"`.
- **Forgetting `rl.close()`**: The process hangs because stdin is still open.
- **Top-level await**: In CommonJS, `await` only works inside an `async` function — wrap your main code in one.

## Try It Yourself
1. Write a program that asks the user what kind of rental car they would like, then print a message about it.
2. Write a loop that prompts the user to enter a series of pizza toppings until they enter a "quit" value. As they enter toppings, print a message saying you'll add that topping to their pizza.
3. Write a program that asks users about their dream vacation destination. Run a poll and print the results when the poll ends.
