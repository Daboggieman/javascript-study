// Exercise 10b: File Access, Reading, and Writing
// Run this script with: node exercises.js

const fs = require("node:fs");

// TODO: Exercise 1
// Create or overwrite a file named sample.txt and write two lines of text.
fs.writeFileSync("sample.txt", "Line one\n");
fs.appendFileSync("sample.txt", "Line two\n");

// TODO: Exercise 2
// Read sample.txt and print each line without extra blank lines.
const lines = fs.readFileSync("sample.txt", "utf8").split("\n");
for (const line of lines) {
  if (line.length > 0) {
    console.log(line.trim());
  }
}

// TODO: Exercise 3
// Check if sample.txt exists, then remove it.
console.log(fs.existsSync("sample.txt"));
fs.unlinkSync("sample.txt");
console.log(fs.existsSync("sample.txt"));
