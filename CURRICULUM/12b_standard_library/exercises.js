// Exercise 12b: Built-in Modules
// Run this script with: node exercises.js

const fs = require("node:fs");
const crypto = require("node:crypto");

// TODO: Exercise 1
// Print the current working directory and the list of files in it.
console.log("CWD:", process.cwd());
console.log("Files:", fs.readdirSync("."));

// TODO: Exercise 2
// Calculate the length of the hypotenuse for sides 3 and 4.
console.log(Math.hypot(3, 4));

// TODO: Exercise 3
// Convert an object into a JSON string and print it.
const person = { name: "Sam", age: 28 };
console.log(JSON.stringify(person));

// TODO: Exercise 4
// Print the current date and time.
console.log(new Date());
