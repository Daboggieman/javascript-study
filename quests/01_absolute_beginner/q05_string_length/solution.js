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
