// Write your solution here
const readline = require("node:readline/promises");
const { stdin: input, stdout: output } = require("node:process");

async function main() {
  const rl = readline.createInterface({ input, output });
  const stringListA = (await rl.question("insert the list to sort through, seperate by comma: \n")).split("");
  const withoutA = await rl.question("insert the characted/word to deduct count from the list: \n");
  rl.close();

  function compact(stringList, without) {
    if (stringList.length < 1) {
      console.log("array is empty");
      return [];
    }
    let count = 0;
    let i = 0;
    while (i < stringList.length) {
      if (stringList[i] !== without) {
        count++;
      }
      i++;
    }
    return count;
  }

  console.log(`and there are ${compact(stringListA, withoutA)} indexes without '${withoutA}'`);
}

main();
