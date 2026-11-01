// Exercise 17: The switch Statement
// Run this script with: node exercises.js


// TODO: Exercise 1
function describeStatus(code) {
  // Write your code here
}


// TODO: Exercise 2
// Handle commands: ["go", direction], ["take", item], ["look"], anything else
function handleCommand(command) {
  // Write your code here
}


// TODO: Exercise 3 - use if/else if (JS has no guards on switch cases)
function classify(n) {
  // Write your code here
}


class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}


// TODO: Exercise 4
function describePoint(p) {
  // Write your code here
}


// Test calls (run this file to see the results):
console.log(describeStatus(200));               // OK (or similar)
console.log(describeStatus(404));               // Not Found (or similar)
console.log(handleCommand(["go", "north"]));    // Moving north
console.log(handleCommand(["take", "key"]));    // Taking key
console.log(classify(-5));                      // negative
console.log(classify(4));                       // positive even
console.log(describePoint(new Point(0, 0)));    // Origin
