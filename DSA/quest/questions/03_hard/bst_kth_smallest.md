# BST Kth Smallest

Source: bst_kth_smallest

Files to submit
- solution.js

Allowed functions
- --allow-builtin

Instructions
Write a function that returns the k-th smallest value (1-indexed) in a Binary Search Tree, using an in-order traversal that stops early once the k-th element is found (don't build the full sorted array if you can avoid it, though a full in-order array is also acceptable for correctness).

Expected function
```js
function kthSmallest(root, k) {}
```


Here is a possible program to test your function :
```js
const root = new TreeNode(8);
root.left = new TreeNode(3);
root.right = new TreeNode(10);
root.left.left = new TreeNode(1);
root.left.right = new TreeNode(6);
console.log(kthSmallest(root, 3));
```

And its output :
```text
6
```
