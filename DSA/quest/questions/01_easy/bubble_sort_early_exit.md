# Bubble Sort Early Exit

Source: bubble_sort_early_exit

Files to submit
- solution.js

Allowed functions
- --allow-builtin

Instructions
Implement an optimized bubble sort that stops early if a full pass makes zero swaps (best case O(n) for already-sorted input). Return an array of `[sortedArray, numberOfPasses]`.

Expected function
```js
function bubbleSortOptimized(arr) {}
```


Here is a possible program to test your function :
```js
console.log(bubbleSortOptimized([1, 2, 3, 4, 5]));
console.log(bubbleSortOptimized([5, 4, 3, 2, 1]));
```

And its output :
```text
[ [ 1, 2, 3, 4, 5 ], 1 ]
[ [ 1, 2, 3, 4, 5 ], 4 ]
```
