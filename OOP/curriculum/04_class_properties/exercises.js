// OOP Exercise 04: Class Properties (Attributes)
// Run this script with: node exercises.js


class Dog {
  static species = "Canis familiaris";   // class attribute
  static population = 0;                 // class attribute used as a counter

  constructor(name) {
    this.name = name;                    // instance attribute
    // TODO: Exercise 2 - increment Dog.population here
    // Write your solution here
  }
}


class Circle {
  constructor(radius) {
    this._radius = radius;   // JS convention: underscore prefix means "internal"
  }

  // TODO: Exercise 3 - radius getter
  get radius() {
    // Write your solution here
  }

  // TODO: Exercise 3 - radius setter (must reject negative values)
  set radius(value) {
    // Write your solution here
  }

  // TODO: Exercise 3 - read-only area getter
  get area() {
    // Write your solution here
  }
}


if (require.main === module) {
  const rex = new Dog("Rex");
  const fido = new Dog("Fido");
  console.log(Dog.population);   // expect: 2

  const c = new Circle(5);
  console.log(c.radius, Math.round(c.area * 100) / 100);   // expect: 5 78.54
  c.radius = 10;
  console.log(c.radius, Math.round(c.area * 100) / 100);   // expect: 10 314.16
  try {
    c.radius = -3;
  } catch (e) {
    console.log("Correctly rejected:", e.message);
  }
}
