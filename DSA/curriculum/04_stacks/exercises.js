// DSA Exercise 04: Stacks
// Run this script with: node exercises.js

class Stack {
  constructor() {
    this._items = [];
  }

  // TODO: Exercise 1
  push(item) {
    // Write your solution here
  }

  // TODO: Exercise 2
  pop() {
    // Write your solution here
  }

  // TODO: Exercise 3
  peek() {
    // Write your solution here
  }

  isEmpty() {
    return this._items.length === 0;
  }

  size() {
    return this._items.length;
  }
}


// TODO: Exercise 4
// Use a Stack to determine whether brackets in `expression` are balanced.
// Supported bracket types: (), [], {}
function isBalanced(expression) {
  // Write your solution here
}


// TODO: Exercise 5
// Use a Stack to reverse a string (do not use .reverse() or slicing tricks).
function reverseString(s) {
  // Write your solution here
}


// Main program
const s = new Stack();
s.push(1);
s.push(2);
s.push(3);
console.log(s.peek());   // 3
console.log(s.pop());     // 3
console.log(s.size());    // 2

console.log(isBalanced("{[()()]}"));  // true
console.log(isBalanced("{[(])}"));    // false

console.log(reverseString("hello"));  // olleh
