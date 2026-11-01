// DSA Exercise 17: Counting Sort
// Run this script with: node exercises.js


// TODO: Exercise 1
function countingSort(arr) {
  // Write your solution here
}


// TODO: Exercise 2 - sort an array of [score, name] pairs by score only,
// keeping it stable (equal scores preserve original relative order)
function countingSortByKey(items, key = (x) => x[0]) {
  // Write your solution here
}


// Main program
console.log(countingSort([4, 2, 2, 8, 3, 3, 1]));  // [1, 2, 2, 3, 3, 4, 8]

const students = [[85, "Bob"], [90, "Ada"], [85, "Amy"], [70, "Cy"]];
console.log(countingSortByKey(students));
// [85, "Bob"] should still come before [85, "Amy"] -- stability check
