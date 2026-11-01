// OOP Exercise 06: Polymorphism
// Run this script with: node exercises.js


class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    throw new Error("Subclasses must implement speak()");
  }

  describe() {
    return `I am ${this.name}`;
  }
}

// TODO: Exercise 1 - Dog overrides speak()
class Dog extends Animal {
  speak() {
    // Write your solution here
  }
}


// TODO: Exercise 1 - Cat overrides speak()
class Cat extends Animal {
  speak() {
    // Write your solution here
  }
}


// TODO: Exercise 2 - Bird overrides speak() too
class Bird extends Animal {
  speak() {
    // Write your solution here
  }
}


// TODO: Exercise 3 - Robot has NO shared parent with Animal, but has its own speak()
class Robot {
  speak() {
    // Write your solution here
  }
}


// TODO: Exercise 4 - DescriptiveDog extends Animal's describe() using super()
class DescriptiveDog extends Animal {
  describe() {
    // Write your solution here
  }
}


if (require.main === module) {
  const animals = [new Dog("Rex"), new Cat("Whiskers"), new Bird("Tweety")];
  for (const animal of animals) {
    console.log(animal.speak());
  }

  const everything = [new Dog("Fido"), new Robot()];
  for (const thing of everything) {
    console.log(thing.speak());   // works via duck typing, no shared parent needed
  }

  console.log(new DescriptiveDog("Rex").describe());  // I am Rex, a good dog
}
