# 🧠 DSA Cheatsheet

An exhaustive quick-reference for Data Structures & Algorithms in JavaScript. Pairs with `DSA/curriculum/` (theory) and `DSA/quest/` (practice problems).

---

## Big-O Complexity, At a Glance

From fastest to slowest (n = input size):

| Notation | Name | Example |
|---|---|---|
| O(1) | Constant | Array index, hash table lookup (average) |
| O(log n) | Logarithmic | Binary search, balanced BST operations |
| O(n) | Linear | Linear search, single loop |
| O(n log n) | Linearithmic | Merge sort, heap sort, `Array.prototype.sort` |
| O(n²) | Quadratic | Bubble/selection/insertion sort, nested loops |
| O(2ⁿ) | Exponential | Naive recursive Fibonacci, subset generation |
| O(n!) | Factorial | Brute-force traveling salesman, permutations |

**Rules of thumb:**
- Drop constants: O(2n) → O(n).
- Drop lower-order terms: O(n² + n) → O(n²).
- Different variables get different letters: O(V + E) for graphs, not O(n).
- Nested loops over the same input generally multiply: loop inside loop → O(n²).
- A loop that halves its range each time is O(log n).

---

## Master Complexity Table — All Data Structures

| Structure | Access | Search | Insert | Delete | Notes |
|---|---|---|---|---|---|
| JS Array | O(1) | O(n) | O(n) worst, O(1) amortized at end | O(n) worst, O(1) at end | Contiguous-ish, index-based |
| Linked List (singly) | O(n) | O(n) | O(1) at head | O(1) at head | No random access |
| Stack | O(n) | O(n) | O(1) push | O(1) pop | LIFO, top only |
| Queue | O(n) | O(n) | O(1) enqueue | O(1) dequeue | FIFO, both ends |
| Hash Table (Map/Set/object) | — | O(1) avg, O(n) worst | O(1) avg | O(1) avg | Collisions degrade worst case |
| Binary Search Tree | O(log n) avg, O(n) worst | O(log n) avg, O(n) worst | O(log n) avg, O(n) worst | O(log n) avg, O(n) worst | Degenerates if unbalanced |
| AVL Tree | O(log n) | O(log n) | O(log n) | O(log n) | Always balanced |
| Graph (adj. list) | — | O(V+E) | O(1) edge | O(E) edge | BFS/DFS traversal |

---

## Master Complexity Table — All Sorting Algorithms

| Algorithm | Best | Average | Worst | Space | Stable | In-Place |
|---|---|---|---|---|---|---|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) | Yes | Yes |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) | No | Yes |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) | Yes | Yes |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes | No |
| Counting Sort | O(n+k) | O(n+k) | O(n+k) | O(n+k) | Yes | No |
| Radix Sort | O(d(n+k)) | O(d(n+k)) | O(d(n+k)) | O(n+k) | Yes | No |
| JS `Array.prototype.sort` (TimSort in V8) | O(n) | O(n log n) | O(n log n) | O(n) | Yes (required by spec) | No (returns the same array, sorted) |

Note: JS's built-in sort takes a **comparator** — `arr.sort((a, b) => a - b)` for numbers (the default sorts strings!).

---

## 1. Arrays

```js
const nums = [1, 2, 3];
nums.push(4);             // O(1) amortized
nums.pop();               // O(1)
nums.shift();             // O(n) — front, everything shifts left
nums.unshift(0);          // O(n) — front, everything shifts right
nums.includes(x);         // O(n)
nums[1];                  // O(1)
nums.length;              // O(1)
```
**Rule:** front/middle operations are O(n); end operations are O(1).

## 2. Nodes

```js
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;    // or .left/.right for trees, .children for N-ary
  }
}
```
Nodes live anywhere in memory; they're connected by references, not physical adjacency.

## 3. Linked Lists

```js
function reverse(head) {
  let prev = null;
  while (head) {
    const nxt = head.next;
    head.next = prev;
    prev = head;
    head = nxt;
  }
  return prev;
}

function findMiddle(head) {          // slow/fast pointer
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}

function hasCycle(head) {            // Floyd's algorithm
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}
```

## 4. Stacks (LIFO)

```js
const stack = [];
stack.push(x);        // push
stack.pop();          // pop
stack[stack.length - 1];  // peek
stack.length === 0;   // is_empty
```
Uses: function call stack, undo/redo, DFS, balanced brackets, expression evaluation.

## 5. Queues (FIFO)

```js
class Queue {
  constructor() { this.items = []; }
  enqueue(x) { this.items.push(x); }   // O(1)
  dequeue()  { return this.items.shift(); }  // O(n) — teach a linked-list/two-stack version for O(1)!
}
```
Uses: BFS, task scheduling, buffering. Never use `array.shift()` for a hot queue — it's O(n); build a linked-list queue (Lesson 05) instead.

**Priority Queue:**
JS has no built-in heap. Use a sorted array for small inputs, or build a binary heap (a `MinHeap` class) when performance matters.

## 6. Hash Tables

```js
const m = new Map();
m.set(key, value);      // O(1) avg insert/update
m.get(key);             // O(1) avg lookup, undefined if missing
m.has(key);             // O(1) avg
m.delete(key);          // O(1) avg

const s = new Set();
s.add(x); s.has(x); s.delete(x);   // all O(1) avg

const obj = {};          // plain object = fixed string keys only
```
`Map` keys can be any type (objects, functions, NaN); object keys are always strings/symbols. Prefer `Map` for dynamic keys, object literals for fixed record shapes.

## 7. Trees (General / N-ary)

```js
class TreeNode {
  constructor(data) {
    this.data = data;
    this.children = [];
  }
}

function dfs(node) {
  console.log(node.data);
  for (const c of node.children) dfs(c);
}

function bfs(root) {
  const queue = [root];
  while (queue.length) {
    const node = queue.shift();   // fine for small trees; O(1) with a linked-list queue
    console.log(node.data);
    queue.push(...node.children);
  }
}
```

## 8. Binary Trees

```js
class TreeNode {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

function inorder(n, r = []) {   // Left, Node, Right (sorted order for a BST)
  if (n) {
    inorder(n.left, r); r.push(n.data); inorder(n.right, r);
  }
  return r;
}

function preorder(n, r = []) {  // Node, Left, Right
  if (n) {
    r.push(n.data); preorder(n.left, r); preorder(n.right, r);
  }
  return r;
}

function postorder(n, r = []) { // Left, Right, Node
  if (n) {
    postorder(n.left, r); postorder(n.right, r); r.push(n.data);
  }
  return r;
}

function height(n) {
  return n === null ? -1 : 1 + Math.max(height(n.left), height(n.right));
}
```

## 9. Binary Search Trees (BST)

```js
function insert(root, v) {
  if (root === null) return new TreeNode(v);
  if (v < root.data) root.left = insert(root.left, v);
  else if (v > root.data) root.right = insert(root.right, v);
  return root;
}

function search(root, target) {
  if (root === null) return false;
  if (root.data === target) return true;
  return target < root.data ? search(root.left, target) : search(root.right, target);
}
```
**Rule:** left subtree < node < right subtree, recursively, everywhere. In-order traversal = sorted output.

## 10. AVL Trees

```js
const getHeight = (n) => (n ? n.height : 0);
const getBalance = (n) => (n === null ? 0 : getHeight(n.left) - getHeight(n.right));

// balance_factor outside [-1, 0, 1] -> rotate
// LL -> rotate_right | RR -> rotate_left
// LR -> rotate_left(child) then rotate_right | RL -> rotate_right(child) then rotate_left
```
Self-balancing BST: guarantees O(log n) height always, at the cost of bookkeeping on every insert/delete.

## 11. Graphs

```js
const graph = { A: ["B", "C"], B: ["A"], C: ["A"] };   // adjacency list (object or Map)

function dfs(g, start, visited = new Set()) {
  visited.add(start);
  for (const nb of g[start]) {
    if (!visited.has(nb)) dfs(g, nb, visited);
  }
  return visited;
}

function bfs(g, start) {
  const visited = new Set([start]);
  const queue = [start];
  const order = [];
  while (queue.length) {
    const node = queue.shift();
    order.push(node);
    for (const nb of g[node]) {
      if (!visited.has(nb)) {
        visited.add(nb);
        queue.push(nb);
      }
    }
  }
  return order;
}
```
**BFS finds shortest path in unweighted graphs. Dijkstra (heap-based) finds shortest path in weighted graphs.**

## 12. Linear Search

```js
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}
```
O(n), works on unsorted data and any iterable. Best when searching only once.

## 13. Binary Search

```js
function binarySearch(arr, target) {
  let lo = 0;
  let hi = arr.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}
```
O(log n), **requires sorted input**. JS has no built-in bisect — write it yourself (Lesson 13).

## 14. Bubble Sort

```js
function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return arr;
}
```

## 15. Selection Sort

```js
function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
  return arr;
}
```
Fewest swaps of any comparison sort (at most n-1), but always O(n²) comparisons.

## 16. Insertion Sort

```js
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j -= 1;
    }
    arr[j + 1] = key;
  }
  return arr;
}
```
Adaptive: O(n) on already-sorted data. Used inside V8's TimSort for small sub-arrays.

## 17. Counting Sort

```js
function countingSort(arr) {
  if (arr.length === 0) return arr;
  const lo = Math.min(...arr);
  const hi = Math.max(...arr);
  const count = new Array(hi - lo + 1).fill(0);
  for (const x of arr) count[x - lo] += 1;
  for (let i = 1; i < count.length; i++) count[i] += count[i - 1];
  const out = new Array(arr.length).fill(0);
  for (let i = arr.length - 1; i >= 0; i--) {
    const x = arr[i];
    count[x - lo] -= 1;
    out[count[x - lo]] = x;
  }
  return out;
}
```
Not comparison-based. O(n+k). Only good when the value range k is small relative to n.

## 18. Radix Sort

```js
function radixSort(arr) {
  if (arr.length === 0) return arr;
  let maxVal = Math.max(...arr);
  let exp = 1;
  let result = arr;
  while (Math.floor(maxVal / exp) > 0) {
    result = countingSortByDigit(result, exp);   // stable counting sort on one digit
    exp *= 10;
  }
  return result;
}
```
Sorts digit-by-digit using a stable counting sort at each digit position. O(d·(n+k)).

## 19. Merge Sort

```js
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]); i += 1;
    } else {
      result.push(right[j]); j += 1;
    }
  }
  return result.concat(left.slice(i), right.slice(j));
}
```
O(n log n) guaranteed in every case. Stable. Not in-place (needs O(n) extra space).

---

## Common Patterns Cheat Sheet

| Pattern | Used For | Key Idea |
|---|---|---|
| Two pointers | Palindromes, sorted-array pair sums | Move pointers from both ends inward |
| Sliding window | Subarray/substring problems | Grow/shrink a window, track a running stat |
| Fast & slow pointers | Cycle detection, middle of list | Fast moves 2x speed of slow |
| Divide and conquer | Merge sort, binary search | Break problem into smaller identical subproblems |
| Hashing for O(1) lookup | Two Sum, duplicates, grouping | Trade space for time (`Map`/`Set`) |
| BFS | Shortest path (unweighted), level order | Queue-based, level by level |
| DFS | Path existence, cycle detection, backtracking | Stack-based (or recursion) |
| Greedy | Interval scheduling, coin change (some variants) | Make the locally-best choice at each step |
| Dynamic Programming | Overlapping subproblems (Fibonacci, knapsack) | Cache/memoize repeated subproblem results |

---

## 📚 More Resources

See `DSA/resources/links.md` for the full curated list of docs, YouTube playlists, and articles referenced throughout every `DSA/curriculum/` lesson.
