// OOP Exercise 02: The Constructor
// Run this script with: node exercises.js


// TODO: Exercise 1 & 2
// Define a Car class with constructor(make, model, year = 2024, mileage = 0)
// Write it from scratch — the stub below is just a reminder.

class Car {
  constructor(make, model, year = 2024, mileage = 0) {
    // YOUR CODE HERE — assign the four properties to `this`
    // Write your solution here
  }

  // TODO: Exercise 3
  // Add a drive(miles) method that increases this.mileage
  // Write your solution here
}


// TODO: Exercise 5 — mutable shared-default trap
// Define a RepairShop class whose constructor takes a `repairs` parameter.
// When repairs is not passed, each RepairShop should have its own empty array.
// Prove two shops don't share it (shop1.repairs !== shop2.repairs).
// Then uncomment the SHARED constant and use it as the default:
//   constructor(repairs = SHARED)
// and show that the bug appears (they share the same array).
// Write your solution here

// const SHARED = [];


if (require.main === module) {
  // --- Exercises 1 & 2: constructor with defaults ---
  const car1 = new Car("Toyota", "Corolla", 2020);
  const car2 = new Car("Honda", "Civic");             // uses default year
  console.log(car1.year, car2.year);                   // expect: 2020 2024

  // --- Exercise 3: drive ---
  car1.drive(50);
  car1.drive(100);
  console.log(car1.mileage);                           // expect: 150

  // --- Exercise 4: trigger TypeError on missing required arg ---
  // (run with --check to verify syntax, but uncomment to see JS behaviour)
  // new Car("Toyota");   // missing `model` -- in JS this is undefined, no error
  //                      // Python would TypeError; JS is silent here

  // --- Exercise 5: mutable-default trap ---
  // In JS, default parameter expressions are evaluated fresh per call,
  // so `constructor(repairs = [])` gives each instance its own array.
  // The bug only appears when the default is a SHARED object:
  //   const SHARED = [];
  //   constructor(repairs = SHARED) { ... }
  // Run the same append-on-one/test-other experiment to see it.
}
