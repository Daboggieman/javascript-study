// DSA Exercise 08: Binary Trees
// Run this script with: node exercises.js


class TreeNode {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}


// TODO: Exercise 1 - Left, Node, Right
function inorder(node, result = []) {
  // Write your solution here
}


// TODO: Exercise 2 - Node, Left, Right
function preorder(node, result = []) {
  // Write your solution here
}


// TODO: Exercise 3 - Left, Right, Node
function postorder(node, result = []) {
  // Write your solution here
}


// TODO: Exercise 4 - breadth-first, level by level
function levelOrder(root) {
  // Write your solution here
}


// TODO: Exercise 5 - height of the tree (empty = -1, single node = 0)
function height(node) {
  // Write your solution here
}


// TODO: Exercise 6 - swap left/right at every node (mirror the tree)
function mirror(node) {
  // Write your solution here
}


// Main program
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);

console.log(inorder(root));     // [4, 2, 5, 1, 3]
console.log(preorder(root));    // [1, 2, 4, 5, 3]
console.log(postorder(root));   // [4, 5, 2, 3, 1]
console.log(levelOrder(root));  // [1, 2, 3, 4, 5]
console.log(height(root));      // 2

mirror(root);
console.log(inorder(root));     // [3, 1, 5, 2, 4]
