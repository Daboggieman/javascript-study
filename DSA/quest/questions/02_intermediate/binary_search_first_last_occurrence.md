# Binary Search First Last Occurrence

Source: binary_search_first_last_occurrence

Files to submit
- solution.js

Allowed functions
- --allow-builtin

Instructions
Given a sorted array that may contain duplicates, write a function that returns an array `[firstIndex, lastIndex]` of the first and last occurrence of `target`, both found via binary search (O(log n) each, not a linear scan). Return `[-1, -1]` if `target` isn't present.

Expected function
```js
function firstAndLast(arr, target) {}
```


Here is a possible program to test your function :
```js
console.log(firstAndLast([1, 2, 2, 2, 3, 4, 5], 2));
console.log(firstAndLast([1, 2, 2, 2, 3, 4, 5], 9));
```

And its output :
```text
[ 1, 3 ]
[ -1, -1 ]
```
