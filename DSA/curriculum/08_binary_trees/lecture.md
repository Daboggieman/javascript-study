# DSA 08: Binary Trees

A **binary tree** is a tree where every node has **at most two children**, conventionally called `left` and `right`. This constraint (max 2 children) is what makes binary trees so useful and analyzable — most tree algorithms you'll meet in interviews and real systems are binary trees or their descendants (BSTs, heaps, AVL trees).

---

## 1. The Node

```js
class TreeNode {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
```

```
        1
       / \
      2   3
     / \
    4   5
```

```js
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
```

---

## 2. Types of Binary Trees

| Type | Definition |
|---|---|
| **Full** | Every node has 0 or 2 children (never exactly 1) |
| **Complete** | Every level is fully filled except possibly the last, which fills left-to-right |
| **Perfect** | Every internal node has 2 children AND every leaf is at the same depth |
| **Balanced** | Height stays O(log n) — the difference in height between left/right subtrees is bounded (this is what AVL trees enforce automatically) |
| **Degenerate/Pathological** | Every node has only one child — effectively a linked list, worst case O(n) height |

---

## 3. The Three Depth-First Traversals

These differ only in *when* you visit the current node relative to its children:

```js
function inorder(node) {     // Left, Node, Right — gives sorted order for a BST
  if (node === null) {
    return;
  }
  inorder(node.left);
  process.stdout.write(node.data + " ");
  inorder(node.right);
}

function preorder(node) {    // Node, Left, Right — useful for copying/serializing a tree
  if (node === null) {
    return;
  }
  process.stdout.write(node.data + " ");
  preorder(node.left);
  preorder(node.right);
}

function postorder(node) {   // Left, Right, Node — useful for safely deleting a tree bottom-up
  if (node === null) {
    return;
  }
  postorder(node.left);
  postorder(node.right);
  process.stdout.write(node.data + " ");
}
```

> **JS-specific note:** Python's `print(x, end=" ")` has no direct JS equivalent — in Node, `process.stdout.write(x + " ")` prints without a trailing newline. (In these exercises you'll mostly collect results into an array instead, which is more idiomatic.)

For the tree above:
- inorder:   `4 2 5 1 3`
- preorder:  `1 2 4 5 3`
- postorder: `4 5 2 3 1`

---

## 4. Level-Order Traversal (Breadth-First)

> **JS-specific note:** Python uses `collections.deque` for O(1) dequeues; JS has no deque, so a plain array with `shift()` is the readable choice here (Lesson 05 shows O(1) alternatives).

```js
function levelOrder(root) {
  if (root === null) {
    return;
  }
  const queue = [root];
  while (queue.length > 0) {
    const node = queue.shift();
    process.stdout.write(node.data + " ");
    if (node.left !== null) {
      queue.push(node.left);
    }
    if (node.right !== null) {
      queue.push(node.right);
    }
  }
}
```

---

## 5. Height and Size

```js
function height(node) {
  if (node === null) {
    return -1;               // convention: empty tree has height -1, single node has height 0
  }
  return 1 + Math.max(height(node.left), height(node.right));
}

function size(node) {
  if (node === null) {
    return 0;
  }
  return 1 + size(node.left) + size(node.right);
}
```

---

## 📚 Resources

- **W3Schools:** [DSA Binary Trees](https://www.w3schools.com/dsa/dsa_data_binarytrees.php) · [Binary Tree Traversal](https://www.w3schools.com/dsa/dsa_data_binarytrees_traversal.php)
- **YouTube:** [mycodeschool — Binary Tree Traversal (Inorder/Preorder/Postorder)](https://www.youtube.com/watch?v=gm8DUJJhmY4)
- **YouTube:** [William Fiset — Binary Trees](https://www.youtube.com/watch?v=BHB0B1jFKQc)

---

## 🧠 Try It Yourself

1. Build the sample tree above and print all three DFS traversals plus the level-order traversal.
2. Implement `height(node)` and `size(node)` and confirm the values by counting on paper.
3. Write `isFull(node)` that checks whether every node has either 0 or 2 children.
4. Write `mirror(node)` that swaps `left` and `right` at every node, turning the tree into its mirror image, and print the inorder traversal before/after to confirm.
