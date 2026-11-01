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
