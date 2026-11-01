// Write your solution here
const readline = require("node:readline/promises");
const { stdin: input, stdout: output } = require("node:process");

async function askInput() {
  const rl = readline.createInterface({ input, output });
  let baseFrom = parseInt(await rl.question(" what is the number's current base: \n "), 10);
  while (baseFrom < 2 || baseFrom > 16) {
    baseFrom = parseInt(await rl.question(" the base was invalid (must be 1-16), please reinsert the base: \n "), 10);
  }

  let numberStr = await rl.question(" input the NUMBER in its base form: \n ");
  let number;
  while (true) {
    number = parseInt(numberStr, baseFrom);
    if (!isNaN(number)) {
      break;
    }
    numberStr = await rl.question(
      ` '${numberStr}' isn't valid for base ${baseFrom}, please reinsert the number: \n `
    );
  }

  let baseTo = parseInt(await rl.question(" what base are u converting the number to: \n "), 10);
  while (baseTo < 2 || baseTo > 16) {
    baseTo = parseInt(await rl.question(" the base was invalid (must be 2-16), please reinsert the base: \n "), 10);
  }
  rl.close();

  console.log("\ngive me a sec...... \n");
  return [number, baseFrom, baseTo];
}

function convertbase(number, baseFrom, baseTo) {
  if (number === 0) {
    return "0";
  }

  if (baseTo === 10) {
    return String(number);
  }

  const digitMap = "0123456789abcdef";
  const conv = [];
  while (number > 0) {
    conv.push(number % baseTo);
    number = Math.floor(number / baseTo);
  }
  const convAnswer = conv.reverse();
  return convAnswer.map((nums) => digitMap[nums]).join("");
}

async function main() {
  const [numberA, baseFromA, baseToA] = await askInput();
  console.log(convertbase(numberA, baseFromA, baseToA));
}

main();
