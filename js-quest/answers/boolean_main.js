// Write your solution here
const readline = require("node:readline/promises");
const { stdin: input, stdout: output } = require("node:process");

async function main() {
  const rl = readline.createInterface({ input, output });
  const insert = await rl.question("insert command line to check it's lenght: \n");
  rl.close();

  if (insert.length === 0) {
    console.log("Error: EMPTY argumets passed");
  } else if (insert.length % 2 === 0) {
    console.log("even");
  } else {
    console.log("odd");
  }
}

main();
