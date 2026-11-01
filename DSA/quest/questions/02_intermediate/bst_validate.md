# BST Validate

Source: bst_validate

Files to submit
- solution.js

Allowed functions
- --allow-builtin

Instructions
Write a function that checks whether a given binary tree is a valid Binary Search Tree. Every node's value must be strictly greater than every value in its left subtree and strictly less than every value in its right subtree (not just compared to its immediate children).

Expected function
```js
function isValidBst(root) {}
```


Here is a possible program to test your function :
```js
const valid = new TreeNode(5);
valid.left = new TreeNode(3);
valid.right = new TreeNode(8);
console.log(isValidBst(valid));

const invalid = new TreeNode(5);
invalid.left = new TreeNode(3);
invalid.right = new TreeNode(8);
invalid.right.left = new TreeNode(4);   // 4 < 5 but sits in the right subtree -- invalid!
console.log(isValidBst(invalid));
```

And its output :
```text
true
false
```
