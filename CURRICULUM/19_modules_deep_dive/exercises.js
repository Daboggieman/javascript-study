// Exercise 19: Modules Deep Dive
// Run this script with: node exercises.js


// TODO: Exercise 2
// Print the first 3 entries of module.paths (Node's module search paths)
function showFirstThreePaths() {
  // Write your code here
}


// TODO: Exercise 1 (conceptual, no code needed here -- see instructions.md)
// Create a separate file `mathutils_demo.js` in this folder with:
//   function square(x) { return x * x; }
//   module.exports = { square };
//   if (require.main === module) {
//       console.log("running directly!");
//       console.log(square(4));
//   }
// Then require it below and confirm the "running directly!" line does NOT print.


if (require.main === module) {
  showFirstThreePaths();
  console.log(`This file's module.id is: ${module.id}`);
}
