// Write your solution here
const fs = require("fs");

function main() {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.log("needs two files");
    return;
  }

  for (const filename of args) {
    try {
      const content = fs.readFileSync(filename, "utf8");
      console.log(`--- ${filename} ---`);
      console.log(content);
    } catch (err) {
      if (err.code === "ENOENT") {
        console.log(`Error: '${filename}' not found.`);
      } else {
        console.log(`Error reading '${filename}': ${err.message}`);
      }
    }
  }
}

main();
