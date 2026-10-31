// Exercise 11: Testing
// Run this script with: node exercises.js
// (or run it through the test runner: node --test exercises.js)

const test = require("node:test");
const assert = require("node:assert");

// Below is the function we want to test:
function addNumbers(a, b) {
  /** Adds two numbers together. Returns null if inputs are not numbers. */
  if (typeof a !== "number" || typeof b !== "number") {
    return null;
  }
  return a + b;
}


// TODO: Write tests named as follows (use test() from node:test):
// 1. test positive numbers: assert.strictEqual(addNumbers(2, 3), 5).
// 2. test negative numbers: assert.strictEqual(addNumbers(-1, -1), -2).
// 3. test invalid input: assert.strictEqual(addNumbers("2", 3), null).
//
// Remember: node:test runs every test() call automatically when this file runs,
// so there is no __main__-style boilerplate needed.
