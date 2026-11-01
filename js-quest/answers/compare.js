// Write your solution here
const readline = require("node:readline/promises");
const { stdin: input, stdout: output } = require("node:process");

async function main() {
  const rl = readline.createInterface({ input, output });
  const firstString = (await rl.question(" insert the first string: \n ")).split("");
  const secondString = (await rl.question(" insert the second string: \n ")).split("");
  rl.close();

  function compare(firList, othList) {
    const copFirList = firList.slice();
    const copOthList = othList.slice();
    while (copFirList.length !== copOthList.length) {
      if (copFirList.length < copOthList.length) {
        copFirList.push(" ");
      } else {
        copOthList.push(" ");
      }
    }
    let i = 0;
    const listOfUnidentical = [];
    const listOfIdentical = [];
    let noncomp = 0;
    let identical = 0;
    while (i < copFirList.length) {
      if (copFirList[i] !== copOthList[i]) {
        noncomp++;
        listOfUnidentical.push(i);
      } else {
        identical++;
        listOfIdentical.push(i);
      }
      i++;
    }
    console.log(`index position(s) of unmatching characters: \x1b[31m ${listOfUnidentical} \x1b[0m`);
    console.log(`total numbers of unidentical characters at same indexes: \x1b[31m ${noncomp} \x1b[0m`);
    console.log(`index position(s) of matching characters:  \x1b[32m ${listOfIdentical} \x1b[0m`);
    console.log(`total numbers of identical characters at same indexes: \x1b[32m ${identical} \x1b[0m`);
  }

  compare(firstString, secondString);
}

main();
