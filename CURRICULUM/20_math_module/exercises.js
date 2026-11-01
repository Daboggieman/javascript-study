// Exercise 20: The Math Object
// Run this script with: node exercises.js


// TODO: Exercise 1
function hypotenuse(a, b) {
  // Write your code here
}


// TODO: Exercise 3 - only test divisors up to Math.sqrt(n)
function isPrime(n) {
  // Write your code here
}


if (require.main === module) {
  console.log(hypotenuse(3, 4));    // 5 (should match!)
  console.log(Math.hypot(3, 4));    // 5

  console.log(0.1 + 0.2 === 0.3);   // false
  console.log(Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON);  // true

  console.log(isPrime(17));         // true
  console.log(isPrime(18));         // false

  const data = [2, 4, 4, 4, 5, 5, 7, 9];
  const mean = data.reduce((a, b) => a + b, 0) / data.length;
  const variance = data.reduce((acc, x) => acc + (x - mean) ** 2, 0) / (data.length - 1);
  const stdev = Math.sqrt(variance);
  console.log(mean);                // 5
  console.log(Math.round(stdev * 100) / 100);  // 2.14 (rounded to 2 decimals)
}
