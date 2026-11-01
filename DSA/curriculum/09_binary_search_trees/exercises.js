// DSA Exercise 09: Binary Search Trees
// Run this script with: node exercises.js


class TreeNode {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}


// TODO: Exercise 1
function insert(root, value) {
  // Write your solution here
}


// TODO: Exercise 2
function search(root, target) {
  // Write your solution here
}


function findMin(node) {
  while (node.left !== null) {
    node = node.left;
  }
  return node;
}


// TODO: Exercise 3 (note: `delete` is a reserved word in JS, so this is deleteNode)
function deleteNode(root, value) {
  // Write your solution here
}


// TODO: Exercise 4
function inorder(node, result = []) {
  // Write your solution here
}


// TODO: Exercise 5
// Return the height of a BST (empty = -1, single node = 0). Reuse your
// solution from the Binary Trees lesson if you like.
function height(node) {
  // Write your solution here
}


// Main program
let root = null;
for (const value of [8, 3, 10, 1, 6, 14, 4, 7, 13]) {
  root = insert(root, value);
}

console.log(inorder(root));          // sorted list of all values
console.log(search(root, 6));         // true
console.log(search(root, 99));        // false

root = deleteNode(root, 3);          // delete a node with two children
console.log(inorder(root));

// Compare balanced vs unbalanced height for the same 5 values
let balanced = null;
for (const value of [3, 1, 4, 5, 2]) {
  balanced = insert(balanced, value);
}
console.log("balanced-ish height:", height(balanced));

let unbalanced = null;
for (const value of [1, 2, 3, 4, 5]) {
  unbalanced = insert(unbalanced, value);
}
console.log("sorted-insert height:", height(unbalanced));
