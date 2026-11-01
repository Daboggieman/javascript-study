# DSA 09: Binary Search Trees (BST)

A **Binary Search Tree** is a binary tree with one extra rule that makes searching fast:

> For every node: everything in its **left** subtree is **smaller**, and everything in its **right** subtree is **larger**.

This single rule turns a tree into something you can binary-search, just like a sorted list — except insertion and deletion stay fast too.

---

## 1. The Node (same shape as a binary tree)

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
        8
       / \
      3   10
     / \    \
    1   6    14
       / \   /
      4   7 13
```
Notice: everything left of 8 is < 8, everything right of 8 is > 8, and the same holds recursively at every node.

---

## 2. Insertion

```js
function insert(root, value) {
  if (root === null) {
    return new TreeNode(value);
  }
  if (value < root.data) {
    root.left = insert(root.left, value);
  } else if (value > root.data) {
    root.right = insert(root.right, value);
  }
  // if value === root.data: typically ignore duplicates
  return root;
}
```

---

## 3. Searching

```js
function search(root, target) {
  if (root === null) {
    return false;
  }
  if (root.data === target) {
    return true;
  }
  if (target < root.data) {
    return search(root.left, target);
  }
  return search(root.right, target);
}
```

Because at each step you eliminate one whole subtree, search is **O(h)** where `h` is the tree's height. For a *balanced* BST, `h = O(log n)`. But for an unlucky/unbalanced BST (e.g., inserting sorted data 1,2,3,4,5...), the tree degenerates into a straight line and `h = O(n)` — no better than a linked list! (This is exactly the problem **AVL trees**, next lesson, solve.)

---

## 4. Deletion (the trickiest BST operation)

Three cases:
1. **Node is a leaf** → just remove it.
2. **Node has one child** → replace the node with its child.
3. **Node has two children** → replace the node's value with its **in-order successor** (the smallest value in its right subtree), then delete that successor from the right subtree.

```js
function findMin(node) {
  while (node.left !== null) {
    node = node.left;
  }
  return node;
}

function deleteNode(root, value) {
  if (root === null) {
    return null;
  }
  if (value < root.data) {
    root.left = deleteNode(root.left, value);
  } else if (value > root.data) {
    root.right = deleteNode(root.right, value);
  } else {
    if (root.left === null) {
      return root.right;
    }
    if (root.right === null) {
      return root.left;
    }
    const successor = findMin(root.right);
    root.data = successor.data;
    root.right = deleteNode(root.right, successor.data);
  }
  return root;
}
```

> **JS-specific note:** `delete` is a reserved word in JavaScript (it's the `delete obj.prop` operator), so the conventional function name is `deleteNode` (or `remove`). Python has no such collision with its `del`.

---

## 5. In-Order Traversal Gives You Sorted Order (for free!)

This is the "party trick" of a BST — traverse it in-order and you get every value in sorted order, no separate sort needed.

```js
function inorder(node, result = []) {
  if (node !== null) {
    inorder(node.left, result);
    result.push(node.data);
    inorder(node.right, result);
  }
  return result;
}
```

---

## 6. Complexity Table

| Operation | Balanced BST | Unbalanced (worst case) |
|---|---|---|
| Search | O(log n) | O(n) |
| Insert | O(log n) | O(n) |
| Delete | O(log n) | O(n) |

---

## 📚 Resources

- **W3Schools:** [DSA Binary Search Trees](https://www.w3schools.com/dsa/dsa_data_binarysearchtrees.php)
- **YouTube:** [mycodeschool — Binary Search Tree Insertion/Deletion](https://www.youtube.com/watch?v=COZK7NATh4k)
- **YouTube:** [Abdul Bari — Binary Search Tree](https://www.youtube.com/watch?v=9Jry5-82I68)

---

## 🧠 Try It Yourself

1. Build the sample tree above through repeated `insert()` calls (start from an empty tree), then confirm `inorder()` returns a sorted list.
2. Implement `search()` and test both a value that exists and one that doesn't.
3. Implement `deleteNode()` and test all three deletion cases (leaf, one child, two children).
4. Insert the sorted sequence `1, 2, 3, 4, 5` one at a time and print the tree's height. Compare it to inserting `3, 1, 4, 5, 2` — same 5 values, very different height. This is exactly the motivation for the next lesson.
