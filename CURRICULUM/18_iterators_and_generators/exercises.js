// Exercise 18: Iterators and Generators
// Run this script with: node exercises.js


// TODO: Exercise 1 - iterator class version
class Countdown {
  constructor(start) {
    this.current = start;
  }

  [Symbol.iterator]() {
    // Write your code here (the iterable IS its own iterator)
  }

  next() {
    // Write your code here (return { value, done })
  }
}


// TODO: Exercise 1 - generator function version
function* countdown(start) {
  // Write your code here
}


// TODO: Exercise 2
function* fibonacci(n) {
  // Write your code here
}


// TODO: Exercise 3 - use a generator function, not an eagerly built array
function* squaresUpTo(n) {
  // Write your code here
}


function sumOfSquares(n) {
  let total = 0;
  for (const sq of squaresUpTo(n)) {
    total += sq;
  }
  return total;
}


// Test calls (run this file to see the results):
// NOTE: these will throw (e.g. "Result of the Symbol.iterator method is not an object")
// until you implement the stubs above -- exactly like list(Countdown(3)) errors on
// empty pass-stubs in Python.
console.log([...new Countdown(3)]);        // [3, 2, 1]
console.log([...countdown(3)]);            // [3, 2, 1]
console.log([...fibonacci(8)]);            // [0, 1, 1, 2, 3, 5, 8, 13]
console.log(sumOfSquares(10));             // 385

// A hand-rolled count() generator (the itertools.count analog):
function* count(start = 0, step = 1) {
  let current = start;
  while (true) {
    yield current;
    current += step;
  }
}

const counter = count(1, 2);
const first5 = Array.from({ length: 5 }, () => counter.next().value);
console.log(first5);                       // [1, 3, 5, 7, 9]
