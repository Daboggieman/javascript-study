# DSA 16: Insertion Sort

**Insertion sort** builds the final sorted array one item at a time, the same way most people sort a hand of playing cards: pick up the next card and insert it into the correct position among the cards you're already holding.

---

## 1. The Algorithm

```js
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];   // shift larger element right
      j -= 1;
    }
    arr[j + 1] = key;            // insert key into its correct spot
  }
  return arr;
}
```

Walk through `[5, 2, 4, 1]`:
- i=1 (key=2): shift 5 right → `[5,5,4,1]` → insert 2 → `[2,5,4,1]`
- i=2 (key=4): shift 5 right → `[2,5,5,1]` → insert 4 → `[2,4,5,1]`
- i=3 (key=1): shift 5,4,2 right → insert 1 at front → `[1,2,4,5]`

---

## 2. Complexity Table

| Case | Time | When |
|---|---|---|
| Best | O(n) | Already sorted — inner `while` never runs |
| Average | O(n²) | Random order |
| Worst | O(n²) | Reverse sorted |

Insertion sort is **stable** and **in-place**, and — importantly — it's **adaptive**: its running time scales with how "close to sorted" the input already is. This makes it genuinely useful (not just educational) for small arrays or nearly-sorted data.

---

## 3. Real-World Relevance

Insertion sort is actually used **inside** production sorting algorithms! JavaScript's built-in `Array.prototype.sort()` (V8) uses **TimSort**, a hybrid algorithm that switches to insertion sort for small sub-arrays because insertion sort's low overhead beats merge sort's overhead at small sizes. (Python's `sorted()` is also TimSort — same idea.) This is a great example of "big-O isn't the whole story — constant factors matter at small n."

---

## 4. Binary Insertion Sort (a nice variant)

Since the "already sorted" portion of the array is sorted, you can use **binary search** (Lesson 13!) to find the insertion point faster — this reduces *comparisons* to O(log n) per element, though shifting elements is still O(n), so overall time complexity stays O(n²) but with fewer comparisons in practice.

> **JS-specific note:** Python reaches for the `bisect` module here; JS has no `bisect`, so we hand-roll `bisectLeft` (exactly what Lesson 13 built).

```js
function bisectLeft(arr, target, low = 0, high = arr.length) {
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

function binaryInsertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    const pos = bisectLeft(arr, key, 0, i);
    arr.splice(i, 1);
    arr.splice(pos, 0, key);
  }
  return arr;
}
```

---

## 📚 Resources

- **W3Schools:** [DSA Insertion Sort](https://www.w3schools.com/dsa/dsa_algo_insertionsort.php)
- **YouTube:** [mycodeschool — Insertion Sort](https://www.youtube.com/watch?v=OGzPmgsI-pQ)
- **YouTube:** [Abdul Bari — Insertion Sort](https://www.youtube.com/watch?v=JU767SDMDvA)

---

## 🧠 Try It Yourself

1. Implement `insertionSort` and trace `[5, 2, 4, 1]` by hand first, matching each `while` loop iteration to a shift.
2. Time insertion sort on an already-sorted array of 10,000 items vs. a reverse-sorted array of the same size. Confirm the huge difference (O(n) vs O(n²)).
3. Implement `binaryInsertionSort` using `bisectLeft` and compare comparison counts (not runtime) against plain insertion sort.
4. Explain in a comment why insertion sort is a good choice for "almost sorted" data (e.g., a mostly-sorted array with a few new elements appended).
