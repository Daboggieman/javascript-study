# Binary Tree Traversals

Source: binary_tree_traversals

Files to submit
- solution.js

Allowed functions
- --allow-builtin

Instructions
Given a binary tree (`TreeNode` with `data`, `left`, `right`), write three functions returning arrays: `inorder(node)` (Left, Node, Right), `preorder(node)` (Node, Left, Right), and `postorder(node)` (Left, Right, Node).

Expected function
```js
class TreeNode {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

function inorder(node) {}

function preorder(node) {}

function postorder(node) {}
```


Here is a possible program to test your function :
```js
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
console.log(inorder(root));
console.log(preorder(root));
console.log(postorder(root));
```

And its output :
```text
[ 4, 2, 5, 1, 3 ]
[ 1, 2, 4, 5, 3 ]
[ 4, 5, 2, 3, 1 ]
```
