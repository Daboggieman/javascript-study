// DSA Exercise 01: Lists (Dynamic Arrays)
// Run this script with: node exercises.js

// TODO: Exercise 1
// Write a function 'timePush' that pushes `n` integers to an array using
// .push() and returns the elapsed time in seconds.
function timePush(n) {
  // Write your solution here
}


// TODO: Exercise 2
// Write a function 'timeUnshiftFront' that inserts `n` integers at index 0
// using .unshift(x) and returns the elapsed time in seconds.
function timeUnshiftFront(n) {
  // Write your solution here
}


// TODO: Exercise 3
// Implement a two-pointer palindrome checker (no reversing, no slicing).
function isPalindrome(s) {
  // Write your solution here
}


// TODO: Exercise 4
// Implement a fixed-size sliding window that returns the maximum sum of any
// contiguous subarray of length k.
function maxSumSubarray(nums, k) {
  // Write your solution here
}


// TODO: Exercise 5
// Without running it, predict (as a comment) the time complexity of the
// function below, then run it to see if larger inputs behave as predicted.
function mystery(nums) {
  let total = 0;
  for (const x of nums) {
    if (nums.includes(x)) {      // <-- think carefully about this line
      total += 1;
    }
  }
  return total;
}


// Main program
function timeIt(fn) {
  const start = Date.now();
  fn();
  return (Date.now() - start) / 1000;
}

console.log("Push 100,000 items:", timeIt(() => timePush(100000)));
console.log("Unshift-at-front 20,000 items:", timeIt(() => timeUnshiftFront(20000)));
console.log(isPalindrome("racecar"));          // true
console.log(isPalindrome("hello"));            // false
console.log(maxSumSubarray([2, 1, 5, 1, 3, 2], 3));  // 9
