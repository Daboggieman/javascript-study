# Tree Sum All Values

Source: tree_sum_all_values

Files to submit
- solution.js

Allowed functions
- --allow-builtin

Instructions
Given a general (N-ary) tree where each `TreeNode` has `data` and a `children` array, write a function that returns the sum of all node values in the tree, using recursion.

Expected function
```js
class TreeNode {
  constructor(data) {
    this.data = data;
    this.children = [];
  }
}

function treeSum(node) {}
```


Here is a possible program to test your function :
```js
const root = new TreeNode(1);
const childA = new TreeNode(2);
const childB = new TreeNode(3);
root.children = [childA, childB];
childA.children = [new TreeNode(4), new TreeNode(5)];
console.log(treeSum(root));
```

And its output :
```text
15
```
