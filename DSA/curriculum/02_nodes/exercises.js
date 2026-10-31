// DSA Exercise 02: Nodes
// Run this script with: node exercises.js

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}


// TODO: Exercise 1
// Manually create 4 nodes holding the values 10, 20, 30, 40 and link them
// together in order (10 -> 20 -> 30 -> 40 -> null).
function buildChain() {
  // Write your solution here
}


// TODO: Exercise 2
// Write a function that counts how many nodes are in a chain starting at `head`.
function countNodes(head) {
  // Write your solution here
}


// TODO: Exercise 3
// Write a function that returns the sum of all `.data` values in a chain
// of nodes (assume all data is numeric).
function sumChain(head) {
  // Write your solution here
}


// TODO: Exercise 4
// Write a function that returns true if `target` value exists anywhere
// in the chain, false otherwise. Do NOT use an array.
function contains(head, target) {
  // Write your solution here
}


// Main program
const head = buildChain();
console.log(countNodes(head));   // 4
console.log(sumChain(head));     // 100
console.log(contains(head, 30)); // true
console.log(contains(head, 99)); // false
