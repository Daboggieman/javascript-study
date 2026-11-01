// Write your solution here
const fs = require("fs");
const path = require("path");

function main() {
  for (const filename of process.argv.slice(2)) {
    const content = fs.readFileSync(filename, "utf8");
    console.log(`\x1b[32m \n ${filename}\x1b[0m`);
    console.log(`${content}\n`);
  }
}

main();
