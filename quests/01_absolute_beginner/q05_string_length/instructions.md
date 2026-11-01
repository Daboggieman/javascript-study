# Q05: String Length

## Description
Write a script that prompts the user for a string, and then calculates and prints the number of characters in that string **without** using the built-in `.length` property.

## Example Interaction
```text
Enter a string: JavaScript
Length: 10
```

## Constraints
- **Do not** use the built-in `.length` property.

## Hints
- Use a `for...of` loop to iterate over characters in the string, maintaining a counter variable that starts at `0`.

---

## Solution
<details>
<summary>View Solution</summary>

```js
const readline = require("node:readline/promises");

async function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  const text = await rl.question("Enter a string: ");
  let count = 0;
  for (const char of text) {
    count += 1;
  }
  console.log(`Length: ${count}`);

  rl.close();
}

main();
```
</details>
