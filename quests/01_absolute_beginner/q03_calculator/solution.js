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
