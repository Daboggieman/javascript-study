// DSA Exercise 19: Merge Sort
// Run this script with: node exercises.js

// Note: Python's sys.setrecursionlimit has no JS equivalent — Node's default
// stack is more than deep enough for merge sort's O(log n) recursion depth.


// TODO: Exercise 1
function merge(left, right) {
  // Write your solution here
}


// TODO: Exercise 2
function mergeSort(arr) {
  // Write your solution here
}


// TODO: Exercise 3 - count inversions (pairs i < j where arr[i] > arr[j])
// while merge-sorting, returning [sortedArray, inversionCount]
function mergeSortCountInversions(arr) {
  // Write your solution here
}


// Main program
console.log(mergeSort([5, 2, 4, 1]));              // [1, 2, 4, 5]
console.log(mergeSortCountInversions([2, 4, 1, 3, 5]));  // [[1, 2, 3, 4, 5], 3]
