// OOP Exercise 01: Classes and Objects
// Run this script with: node exercises.js
//
// Work top to bottom. Each exercise maps to a Part of lecture.md, noted in
// brackets. Once Exercise 1 is done the file runs end to end -- the remaining
// unfinished exercises just print nothing, so run it often to track progress.

class Car {
  honk() {
    console.log("Beep beep!");
  }

  describe() {
    console.log(`${this.year}, ${this.make}, ${this.model}`);
  }
}


// TODO: Exercise 1  [lecture Part 1.2 - 1.3]
// Define a class Car with an empty body for now.
// Then look at the main block below: it creates two Cars and checks
// that they are separate objects.


// TODO: Exercise 2  [lecture Part 2.1]
// Nothing to write in this section -- the main block attaches
// `make`, `model` and `year` directly to car1 and prints them.
// Read it and make sure you can say what each line does.


// TODO: Exercise 3  [lecture Part 3.1]
// Add a `honk` method to Car that prints exactly: Beep beep!
// Remember that `this` is set for you by the dot.



// TODO: Exercise 4  [lecture Part 3.2 - 3.3]
// Add a `describe` method that uses this to print "<year> <make> <model>",
// e.g. "2020 Toyota Corolla".
// The main block calls it BOTH ways -- car1.describe() and
// Car.prototype.describe.call(car1) -- to prove they are the same thing.


// TODO: Exercise 5  [lecture Part 2.4]
// The main block deliberately calls describe() on a car with no
// attributes attached. Run it and read the output (JS reads missing
// attributes as `undefined` -- there is no error like Python's
// AttributeError), then replace this comment with one line explaining
// what Lesson 02 (the constructor) will do to make this harder:
//
// YOUR ANSWER:


if (require.main === module) {
  // --- Exercise 1: two objects are genuinely separate [Part 1.3] ---
  const car1 = new Car();
  const car2 = new Car();
  console.log("car1 === car2 ->", car1 === car2);   // expect: false
  console.log("car1 === car1 ->", car1 === car1);   // expect: true

  // --- Exercise 2: attach attributes by hand [Part 2.1] ---
  car1.make = "Toyota";
  car1.model = "Corolla";
  car1.year = 2020;
  console.log(`${car1.year} ${car1.make} ${car1.model}`);   // expect: 2020 Toyota Corolla

  // --- Exercise 3: a method [Part 3.1] ---
  car1.honk();                                    // expect: Beep beep!

  // --- Exercise 4: this, and the two equivalent call forms [Part 3.3] ---
  car1.describe();                                // expect: 2020, Toyota, Corolla
  Car.prototype.describe.call(car1);              // expect: the exact same line

  // --- Exercise 5: why hand-attaching is fragile [Part 2.4] ---
  const car3 = new Car();                         // no attributes attached
  car3.describe();                                // prints "undefined, undefined, undefined"
  // JS does NOT throw here -- missing attributes read as `undefined`,
  // so the failure is silent. Read that output carefully.

  // --- Exercise 6: everything is already an object [Part 5] ---
  console.log(typeof 3.14);      // "number"
  console.log(typeof true);      // "boolean"
  console.log(typeof null);      // "object" -- famous JS quirk
  console.log(typeof console.log); // "function"
  console.log(typeof Car);       // "function" -- the class is a function under the hood
}
