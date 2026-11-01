# AVL Insert And Balance

Source: avl_insert_and_balance

Files to submit
- solution.js

Allowed functions
- --allow-builtin

Instructions
Implement AVL tree insertion with all four rebalancing cases (Left-Left, Right-Right, Left-Right, Right-Left), so the tree height never exceeds O(log n). Each `AVLNode` tracks its own `height`.

Expected function
```js
class AVLNode {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

function insert(node, value) {}

function getHeight(node) {
  return node !== null ? node.height : 0;
}
```


Here is a possible program to test your function :
```js
let root = null;
for (const value of [1, 2, 3, 4, 5, 6, 7]) {
  root = insert(root, value);
}
console.log(getHeight(root));
```

And its output :
```text
2
```
