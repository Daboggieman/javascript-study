// OOP Exercise 05: Class Methods and Static Methods
// Run this script with: node exercises.js
//
// NOTE: Exercise 3 first -- the constructor calls Dog.isValidAge, so until
// it returns a real boolean every `new Dog(...)` will throw. Same ordering
// note as the lecture. See `try it yourself` at the end of the lecture.

class Dog {
  static population = 0;

  constructor(name, age) {
    if (!Dog.isValidAge(age)) {
      throw new Error("invalid age");
    }
    this.name = name;
    this.age = age;
    Dog.population += 1;
  }

  // TODO: Exercise 1 - alternative constructor from a birth year
  static fromBirthYear(name, birthYear, currentYear = 2026) {
    // Write your solution here
  }

  // TODO: Exercise 2
  static getPopulation() {
    // Write your solution here
  }

  // TODO: Exercise 3 - static method, no this/self needed
  static isValidAge(age) {
    // Write your solution here
  }
}


if (require.main === module) {
  const rex = Dog.fromBirthYear("Rex", 2022);
  const fido = new Dog("Fido", 1);
  console.log(rex.age);              // expect: 4
  console.log(Dog.getPopulation());  // expect: 2

  try {
    new Dog("Bad", -5);
  } catch (e) {
    console.log("Correctly rejected:", e.message);
  }
}
