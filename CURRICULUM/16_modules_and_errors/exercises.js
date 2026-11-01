// Exercise 16: Modules, Requires, and Error Handling
// Run this script with: node exercises.js

const readline = require("node:readline/promises");
const { stdin: input, stdout: output } = require("node:process");

async function main() {
  const rl = readline.createInterface({ input, output });

  // TODO: Exercise 1
  // Use the global Math object and print the square root of 49.
  console.log();

  // TODO: Exercise 2
  // Write a try/catch block that converts a user input string into a number.
  const value = await rl.question("Enter a number: ");
  try {
    console.log();
  } catch (err) {
    console.log("That is not a valid number.");
  }

  // TODO: Exercise 3
  // Use crypto.randomInt and print a random number between 1 and 10.
  console.log();

  rl.close();
}

main();
