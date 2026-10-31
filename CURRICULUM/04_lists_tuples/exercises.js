// Exercise 04: Lists & Tuples
// Run this script with: node exercises.js

// TODO: Exercise 1
// Create an array called 'colors' containing: "red", "green", "blue".
// Add "yellow" to the end of the array.
// Insert "orange" at index 1.
// Print the final array.
const colors = ["red", "green", "blue"];
colors.push("yellow");
colors.splice(1, 0, "orange");
console.log(colors);


// TODO: Exercise 2
// Given the array 'numbers' below, sort it permanently in descending order and print it.
// (Remember: .sort() needs a comparator for numbers!)
const numbers = [42, 7, 19, 99, 1];
numbers.sort((a, b) => a - b);
numbers.reverse();
console.log(numbers);

// TODO: Exercise 3
// Create an array named 'point' representing 3D coordinates: x=10, y=20, z=30.
// Destructure the array into three variables: px, py, pz.
// Print px, py, and pz.

const point = ["x=10", "y=20", "z=30"];
const [x, y, z] = point;

console.log(x);
console.log(y);
console.log(z);

// color_grade
const navyBlue = [5, 0, 128];

const [red, green, blue] = navyBlue;

console.log(`the RGB color palette value of NAVY-BLUE is \n > red = ${red}\n > green =${green} \n > blue = ${blue}`);

// TODO: Exercise 4
// Demonstrate the difference between sort() and toSorted() on the array below.
// Print the temporarily sorted version, print the original array to show it hasn't changed,
// then run sort() and print the array to show the permanent change.
const grades = [88, 72, 95, 60];
