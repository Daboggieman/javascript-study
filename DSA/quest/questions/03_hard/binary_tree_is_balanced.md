# Binary Tree Is Balanced

Source: binary_tree_is_balanced

Files to submit
- solution.js

Allowed functions
- --allow-builtin

Instructions
Write a function that checks whether a binary tree is height-balanced: for every node, the height difference between its left and right subtrees is at most 1. Aim for an O(n) solution (compute height and balance status together in one pass, rather than recomputing height repeatedly).

Expected function
```js
function isBalanced(root) {}
```


Here is a possible program to test your function :
```js
const balanced = new TreeNode(1);
balanced.left = new TreeNode(2);
balanced.right = new TreeNode(3);
console.log(isBalanced(balanced));

const unbalanced = new TreeNode(1);
unbalanced.left = new TreeNode(2);
unbalanced.left.left = new TreeNode(3);
unbalanced.left.left.left = new TreeNode(4);
console.log(isBalanced(unbalanced));
```

And its output :
```text
true
false
```
