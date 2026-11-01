// DSA Exercise 13: Binary Search
// Run this script with: node exercises.js


// TODO: Exercise 1 - iterative binary search, return index or -1
function binarySearch(arr, target) {
  const sortArr = arr.slice().sort((a, b) => a - b);
  let startpoint = sortArr[0];
  let endpoint = sortArr[sortArr.length - 1];

  while (startpoint <= endpoint) {
    const midpoint = startpoint + Math.floor((endpoint - startpoint) / 2);
    const midvalue = sortArr[midpoint];

    // after successfully calculating midpoint, then proceed to check if the midpoint is equal the value of the target
    if (midpoint === target) {
      return midpoint;
    } else if (midpoint < target) {
      endpoint = midpoint - 1;
    } else {
      endpoint = midpoint + 1;
    }
  }
  return null;
}


// TODO: Exercise 2 - recursive binary search, return index or -1
// find a target in an array with no le
function binarySearchRecursive(arr, target, low = 0, high = null) {
  // Write your solution here
}


// TODO: Exercise 3 - reimplement bisect_left: return the index where
// `target` would be inserted to keep `arr` sorted (target may not be present)
function bisectLeftManual(arr, target) {
  // Write your solution here
}


// Main program
const data = [1, 3, 5, 7, 9, 11, 13];
console.log(binarySearch(data, 7));              // 3
console.log(binarySearch(data, 4));              // -1
console.log(binarySearchRecursive(data, 11));   // 5
console.log(bisectLeftManual(data, 6));         // 3 (would go between 5 and 7)
