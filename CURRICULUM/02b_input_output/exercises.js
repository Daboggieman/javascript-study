// Exercise 02b: Input, Output, and Formatting
// Run this script with: node exercises.js

const readline = require("node:readline/promises");
const { stdin: input, stdout: output } = require("node:process");

async function main() {
  const rl = readline.createInterface({ input, output });

  // TODO: Exercise 1
  // Ask the user for their name and print: "Hello, <name>"

  // TODO: Exercise 2
  // Ask the user for their age, convert it to a number, and print their age next year.
  const age = Number(await rl.question("Enter your age: "));
  console.log(age + 1);

  // TODO: Exercise 3
  // Use a template literal to print the values of two variables.
  const city = "London";
  const temperature = 18;
  console.log(`It is ${temperature} degrees in ${city}`);

  rl.close();
}

main();
