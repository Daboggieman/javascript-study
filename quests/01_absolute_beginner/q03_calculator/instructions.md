# Q03: Calculator

## Description
Write a script that asks the user to enter two numbers, and then prints their sum, difference, product, and quotient.

## Example Interaction
```text
Enter first number: 10
Enter second number: 2
Sum: 12
Difference: 8
Product: 20
Quotient: 5
```

## Constraints
- Convert user input to numbers so that calculations handle decimal inputs.

## Hints
- Input read via `readline/promises` arrives as a string. Convert it using `Number(value)`.
- Use formatting or basic math operations (`+`, `-`, `*`, `/`).

---

## Solution
<details>
<summary>View Solution</summary>

```js
const readline = require("node:readline/promises");

async function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  const num1 = Number(await rl.question("Enter first number: "));
  const num2 = Number(await rl.question("Enter second number: "));

  console.log(`Sum: ${num1 + num2}`);
  console.log(`Difference: ${num1 - num2}`);
  console.log(`Product: ${num1 * num2}`);
  console.log(`Quotient: ${num1 / num2}`);

  rl.close();
}

main();
```
</details>
