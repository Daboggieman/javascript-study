// Write your solution here
const readline = require("node:readline/promises");
const { stdin: input, stdout: output } = require("node:process");

async function main() {
  const rl = readline.createInterface({ input, output });
  const integer = parseInt(await rl.question("Enter an integer: "), 10);
  rl.close();

  const binaryRepresentation = integer.toString(2).split("");
  let count = 0;
  for (const bit of binaryRepresentation) {
    if (bit === "1") {
      count++;
    }
  }
  console.log(`The number of active 1 bits in the binary representation of ${integer} is: ${count}`);
  return count;
}

main();
