# DSA 13: Binary Search

**Binary search** finds a target value in a **sorted** array in O(log n) time by repeatedly cutting the search space in half. It's the canonical example of a "divide and conquer" algorithm.

---

## 1. The Core Idea

1. Look at the middle element.
2. If it's the target, done.
3. If the target is smaller, it must be in the left half — repeat there.
4. If the target is larger, it must be in the right half — repeat there.
5. If the search space becomes empty, the target isn't present.

Each step eliminates **half** of the remaining elements — that's what makes it O(log n): starting from n elements, you halve, halve, halve... until 1 element remains, which takes about log₂(n) steps.

---

## 2. Iterative Implementation

```js
function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      low = mid + 1;        // search the right half
    } else {
      high = mid - 1;       // search the left half
    }
  }
  return -1;
}
```

**Important pitfall:** `mid = Math.floor((low + high) / 2)` can overflow in some languages with fixed-size integers (not an issue in JavaScript — numbers are 64-bit floats and arrays max out around 2³² elements — but worth knowing; the safer form used in other languages is `low + Math.floor((high - low) / 2)`).

---

## 3. Recursive Implementation

```js
function binarySearchRecursive(arr, target, low = 0, high = arr.length - 1) {
  if (low > high) {
    return -1;
  }
  const mid = Math.floor((low + high) / 2);
  if (arr[mid] === target) {
    return mid;
  } else if (arr[mid] < target) {
    return binarySearchRecursive(arr, target, mid + 1, high);
  } else {
    return binarySearchRecursive(arr, target, low, mid - 1);
  }
}
```

> **JS-specific note:** unlike Python (where a default can't reference other parameters), JS default parameter values *can* reference earlier parameters — that's how `high = arr.length - 1` works above.

---

## 4. Complexity

| Case | Time | Space (iterative) | Space (recursive) |
|---|---|---|---|
| Best | O(1) | O(1) | O(1) |
| Average / Worst | O(log n) | O(1) | O(log n) — call stack |

**Prerequisite: the array must already be sorted.** If it isn't, binary search will silently give wrong answers rather than error out — always double check this assumption.

---

## 5. A Real Use Case: Insertion Points (`bisect` in Python, hand-rolled in JS)

Python's standard library has binary search built in via the `bisect` module — useful for finding insertion points to keep a list sorted. **JavaScript has no `bisect`**, so you write it yourself (it's the same binary search, returning `low` instead of -1):

```js
function bisectLeft(arr, target) {
  let low = 0;
  let high = arr.length;
  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] < target) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return low;
}

const scores = [10, 20, 30, 40, 50];
console.log(bisectLeft(scores, 25));   // 2 -- 25 would be inserted at index 2 to keep the array sorted

scores.splice(bisectLeft(scores, 25), 0, 25);
console.log(scores);      // [10, 20, 25, 30, 40, 50]
```

---

## 6. Binary Search on the *Answer* (a powerful pattern)

Binary search doesn't just work on arrays — it works on any **monotonic** search space (where the answer to "is X good enough?" flips from false to true exactly once). This pattern shows up constantly in harder algorithm problems (e.g., "find the minimum speed to eat all bananas in H hours").

---

## 📚 Resources

- **W3Schools:** [DSA Binary Search](https://www.w3schools.com/dsa/dsa_algo_binarysearch.php)
- **YouTube:** [mycodeschool — Binary Search](https://www.youtube.com/watch?v=P3YID7liBug)
- **YouTube:** [Abdul Bari — Binary Search](https://www.youtube.com/watch?v=fDKIpRe8GW4)
- **Docs:** [MDN — Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) (for `indexOf`/`findIndex`, the built-in linear-search tools)

---

## 🧠 Try It Yourself

1. Implement both the iterative and recursive versions and confirm they give identical results on the same sorted array.
2. Modify binary search to return the *insertion point* for a value that isn't in the array (i.e., reimplement `bisectLeft` yourself).
3. Trace `binarySearch([1,3,5,7,9,11,13], 7)` by hand, writing down `low`, `high`, `mid` at every step, before running the code.
4. Explain in a comment why running binary search on an *unsorted* array can silently return the wrong answer instead of crashing.
