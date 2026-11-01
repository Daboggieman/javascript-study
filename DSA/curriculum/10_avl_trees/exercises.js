// DSA Exercise 10: AVL Trees
// Run this script with: node exercises.js


class AVLNode {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}


function getHeight(node) {
  return node !== null ? node.height : 0;
}


function getBalance(node) {
  if (node === null) {
    return 0;
  }
  return getHeight(node.left) - getHeight(node.right);
}


// TODO: Exercise 1 - single right rotation (fixes Left-Left case)
function rotateRight(y) {
  // Write your solution here
}


// TODO: Exercise 2 - single left rotation (fixes Right-Right case)
function rotateLeft(x) {
  // Write your solution here
}


// TODO: Exercise 3 - standard BST insert + rebalance using the 4 cases
function insert(node, value) {
  // Write your solution here
}


// TODO: Exercise 4 - confirm rotations preserve sorted order
function inorder(node, result = []) {
  // Write your solution here
}


// Main program
let root = null;
for (const value of [1, 2, 3, 4, 5, 6, 7]) {  // sorted insert -- the BST killer
  root = insert(root, value);
}

console.log("height after sorted insert:", getHeight(root));  // should be small, e.g. 2 or 3
console.log(inorder(root));                                       // [1, 2, 3, 4, 5, 6, 7]
