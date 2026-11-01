# Q04: Even or Odd

## Description
Write a script that prompts the user for an integer, and prints `"Even"` if the number is even, and `"Odd"` if the number is odd.

## Example Interaction
```text
Enter an integer: 7
Odd
```

## Constraints
- Use an integer conversion (`parseInt(value, 10)`) for input.

## Hints
- Use the modulo operator `%`. A number is even if `number % 2 === 0`.

---

## Solution
<details>
<summary>View Solution</summary>

```js
const readline = require("node:readline/promises");

async function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  const num = parseInt(await rl.question("Enter an integer: "), 10);
  if (num % 2 === 0) {
    console.log("Even");
  } else {
    console.log("Odd");
  }

  rl.close();
}

main();
```
</details>
