# Tree Max Depth And Leaves

Source: tree_max_depth_and_leaves

Files to submit
- solution.js

Allowed functions
- --allow-builtin

Instructions
Given a general (N-ary) tree, write two functions: `treeHeight(node)` returning the height (longest root-to-leaf path in edges; a single node has height 0), and `countLeaves(node)` returning how many leaf nodes (no children) exist.

Expected function
```js
function treeHeight(node) {}

function countLeaves(node) {}
```


Here is a possible program to test your function :
```js
const root = new TreeNode("A");
const b = new TreeNode("B");
const c = new TreeNode("C");
root.children = [b, c];
b.children = [new TreeNode("D"), new TreeNode("E")];
console.log(treeHeight(root));
console.log(countLeaves(root));
```

And its output :
```text
2
3
```
