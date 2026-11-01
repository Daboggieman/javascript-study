# DSA 10: AVL Trees (Self-Balancing BSTs)

The previous lesson ended on a cliffhanger: a plain BST can degenerate into a straight line (O(n) height) if you insert data in sorted order. An **AVL tree** (named after inventors Adelson-Velsky and Landis) fixes this by automatically rebalancing itself after every insertion/deletion, **guaranteeing** O(log n) height at all times.

---

## 1. The Balance Factor

Every node tracks its own `height`. The **balance factor** of a node is:

```
balance_factor = height(left subtree) - height(right subtree)
```

An AVL tree requires that **every node's balance factor is -1, 0, or 1**. If an insertion/deletion pushes any node outside that range, the tree performs a **rotation** to fix it.

```js
class AVLNode {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
    this.height = 1;     // height of subtree rooted here (leaf = 1)
  }
}
```

---

## 2. Helper Functions

```js
function getHeight(node) {
  return node !== null ? node.height : 0;
}

function getBalance(node) {
  if (node === null) {
    return 0;
  }
  return getHeight(node.left) - getHeight(node.right);
}
```

---

## 3. The Four Rotation Cases

When a node becomes unbalanced, there are exactly four possible shapes, each with its own fix:

| Case | Shape | Fix |
|---|---|---|
| Left-Left (LL) | heavy on left, then left again | single **right rotation** |
| Right-Right (RR) | heavy on right, then right again | single **left rotation** |
| Left-Right (LR) | heavy on left, then right | left rotation on child, then right rotation |
| Right-Left (RL) | heavy on right, then left | right rotation on child, then left rotation |

### Right Rotation (fixes Left-Left)
```js
function rotateRight(y) {
  const x = y.left;
  const T2 = x.right;

  // perform rotation
  x.right = y;
  y.left = T2;

  // update heights (order matters: y first, since it's now lower)
  y.height = 1 + Math.max(getHeight(y.left), getHeight(y.right));
  x.height = 1 + Math.max(getHeight(x.left), getHeight(x.right));

  return x;   // new subtree root
}
```

### Left Rotation (fixes Right-Right)
```js
function rotateLeft(x) {
  const y = x.right;
  const T2 = y.left;

  y.left = x;
  x.right = T2;

  x.height = 1 + Math.max(getHeight(x.left), getHeight(x.right));
  y.height = 1 + Math.max(getHeight(y.left), getHeight(y.right));

  return y;
}
```

---

## 4. Insertion With Rebalancing

```js
function insert(node, value) {
  // 1. normal BST insertion
  if (node === null) {
    return new AVLNode(value);
  }
  if (value < node.data) {
    node.left = insert(node.left, value);
  } else if (value > node.data) {
    node.right = insert(node.right, value);
  } else {
    return node;  // no duplicates
  }

  // 2. update this node's height
  node.height = 1 + Math.max(getHeight(node.left), getHeight(node.right));

  // 3. check the balance factor
  const balance = getBalance(node);

  // 4. rebalance if needed (4 cases)
  if (balance > 1 && value < node.left.data) {        // Left-Left
    return rotateRight(node);
  }
  if (balance < -1 && value > node.right.data) {      // Right-Right
    return rotateLeft(node);
  }
  if (balance > 1 && value > node.left.data) {        // Left-Right
    node.left = rotateLeft(node.left);
    return rotateRight(node);
  }
  if (balance < -1 && value < node.right.data) {      // Right-Left
    node.right = rotateRight(node.right);
    return rotateLeft(node);
  }

  return node;
}
```

---

## 5. Why Bother?

| | Plain BST (worst case) | AVL Tree (always) |
|---|---|---|
| Search | O(n) | O(log n) |
| Insert | O(n) | O(log n) |
| Delete | O(n) | O(log n) |

The cost: every insert/delete does a *small* amount of extra bookkeeping (updating heights, checking balance, maybe rotating). That small constant overhead buys you a **guarantee** that never degrades, which is why AVL trees (and their cousin, Red-Black trees) power real-world systems like database indexes and language runtime libraries.

---

## 📚 Resources

- **W3Schools:** [DSA AVL Trees](https://www.w3schools.com/dsa/dsa_data_avltrees.php)
- **YouTube:** [mycodeschool — AVL Tree Insertion](https://www.youtube.com/watch?v=jDM6_TnYIqE)
- **YouTube:** [Abdul Bari — AVL Tree](https://www.youtube.com/watch?v=jDM6_TnYIqE)
- **GeeksforGeeks:** [AVL Tree | Set 1 (Insertion)](https://www.geeksforgeeks.org/avl-tree-set-1-insertion/)

---

## 🧠 Try It Yourself

1. Implement `rotateLeft` and `rotateRight`, and trace one rotation by hand on paper before running any code.
2. Implement `insert()` with all four rebalancing cases, then insert `1, 2, 3, 4, 5, 6, 7` (sorted order — the BST killer from last lesson) and print the resulting height. It should be much shorter than 6!
3. Add an `inorder()` traversal and confirm the AVL tree still returns sorted order (rotations preserve the BST property).
4. (Challenge) Implement deletion with rebalancing — it's the same idea as insertion's rebalancing, just triggered after a standard BST delete.
