# Lecture 09: Classes & OOP

Object-Oriented Programming (OOP) is a programming paradigm that organizes software design around data, or objects, rather than functions and logic. An object can be defined as a data field that has unique attributes and behavior.

---

## 1. What is a Class?
A **class** is a blueprint or template for creating objects. An **object** is an instance of a class.

```js
/** A simple class representing a dog. */
class Dog {
  /**
   * Constructor: Initializes name and breed properties.
   */
  constructor(name, breed) {
    this.name = name;
    this.breed = breed;
  }

  /** A simple method. */
  bark() {
    return `${this.name} says Woof!`;
  }
}
```

- **`constructor`**: The special method called automatically when creating a new instance (Python's `__init__`).
- **`this`**: A reference to the current instance of the class. It is used to access class properties and methods (Python's `self`, but implicit — you never declare it).
- **Properties**: Variables bound to a class or instance (e.g., `this.name`).
- **Methods**: Functions defined inside a class (note: no `function` keyword and no commas between them).

### Creating an Instance:
```js
const myDog = new Dog("Rex", "German Shepherd");
console.log(myDog.name);  // Access property: Rex
console.log(myDog.bark());  // Call method: Rex says Woof!
```

**Callout**: Python uses `_name` as a "please don't touch this" convention. JavaScript has real privacy: prefix a field with `#` (e.g., `#secret`) and it becomes truly private — accessible only inside the class.

---

## 2. Modifying Property Values
You can modify instance properties directly, or write helper methods to update them:

```js
class Car {
  constructor(make, model) {
    this.make = make;
    this.model = model;
    this.odometer = 0;  // Default value
  }

  updateOdometer(mileage) {
    if (mileage >= this.odometer) {
      this.odometer = mileage;
    } else {
      console.log("You cannot roll back an odometer!");
    }
  }
}
```

---

## 3. Inheritance
Inheritance allows a new class (child class) to inherit properties and methods from an existing class (parent class). Use the `extends` keyword, and call `super()` to run the parent constructor.

```js
/** Represent aspects of a car, specific to electric vehicles. */
class ElectricCar extends Car {
  /** Initialize properties of the parent class. */
  constructor(make, model, batterySize = 75) {
    super(make, model);
    this.batterySize = batterySize;
  }

  charge() {
    return "Charging the battery...";
  }
}
```

**Callout**: In JavaScript you must call `super(...)` in a subclass constructor *before* using `this` — otherwise you get a `ReferenceError`.

---

## 4. Overriding Methods
A child class can redefine a method from the parent class to customize its behavior.

```js
class ElectricCar extends Car {
  // ...
  updateOdometer(mileage) {
    // Custom logic or override behavior entirely
    console.log("Updating electric odometer...");
    super.updateOdometer(mileage);
  }
}
```

---

## 🧠 Try It Yourself
1. Create a class called `Restaurant` with two properties: `restaurantName` and `cuisineType`. Add a method `describeRestaurant()` that prints these two pieces of information, and a method `openRestaurant()` that prints a message indicating the restaurant is open. Create an instance and test them.
2. Create an `IceCreamStand` class that inherits from `Restaurant`. Add a property called `flavors` that stores an array of ice cream flavors. Write a method that displays these flavors.
