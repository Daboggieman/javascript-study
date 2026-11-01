# Chapter 9: Classes

> Reading notes for Eloquent JavaScript, Chapter 6: The Secret Life of Objects.

## Key Concepts

### Creating and Using a Class
Object-oriented programming (OOP) is one of the most effective approaches to writing software. In OOP, you write **classes** that represent real-world things or situations, and create **objects** (instances) based on these classes.

```js
class Dog {
  /** A simple attempt to model a dog. */

  constructor(name, age) {
    // Initialize name and age properties (runs automatically on `new`)
    this.name = name;
    this.age = age;
  }

  sit() {
    // Simulate a dog sitting in response to a command
    console.log(`${this.name} is now sitting.`);
  }

  rollOver() {
    // Simulate rolling over in response to a command
    console.log(`${this.name} rolled over!`);
  }
}
```

- **`constructor()` Method**: A special method JavaScript runs automatically whenever we create a new instance with `new`.
- **`this` Keyword**: Represents the specific instance being created/called, giving the object access to its properties and methods. No `self` parameter — it is implicit.
- **Properties**: Values attached to `this` (e.g., `this.name`) are instance properties.

### Creating an Instance of a Class
```js
const myDog = new Dog("Willie", 6);
console.log(`My dog's name is ${myDog.name}.`);
console.log(`My dog is ${myDog.age} years old.`);
myDog.sit();
myDog.rollOver();
```

### Working with Classes and Instances

#### Setting a Default Value for a Property
Properties can be defined as class fields with default values. You don't have to pass an argument for them.

```js
class Car {
  constructor(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.odometerReading = 0;  // Default value
  }
}
```

#### Modifying Property Values
1. **Directly**: `myCar.odometerReading = 23;`
2. **Through a Method** (a method inside `class Car`):
```js
class Car {
  updateOdometer(mileage) {
    if (mileage >= this.odometerReading) {
      this.odometerReading = mileage;
    } else {
      console.log("You can't roll back an odometer!");
    }
  }
}
```
3. **Incrementing through a method**:
```js
class Car {
  incrementOdometer(miles) {
    this.odometerReading += miles;
  }
}
```

### Getters and Setters
Use `get`/`set` accessors to expose computed values like properties:

```js
class Car {
  get description() {
    return `${this.year} ${this.make} ${this.model}`;
  }
  set odometer(miles) {
    if (miles >= 0) this.odometerReading = miles;
  }
}
```

### Inheritance
If the class you're writing is a specialized version of another class, you can use **inheritance**. The original class is the **parent class** (or superclass), and the new class is the **child class** (or subclass).

```js
class ElectricCar extends Car {
  constructor(make, model, year) {
    super(make, model, year);       // Initialize the parent class
    this.batterySize = 40;          // Child-specific property
  }
}
```

- **`super()` Call**: Calls parent methods — required before using `this` in a child constructor.
- **Overriding Parent Methods**: To override, define a method in the child class with the same name as the method in the parent class.

### Instances as Properties (Composition)
You can break a large class into smaller classes and use instances of those classes as properties in the larger class.

```js
class Battery {
  constructor(batterySize = 40) {
    this.batterySize = batterySize;
  }

  describeBattery() {
    console.log(`This car has a ${this.batterySize}-kWh battery.`);
  }
}

class ElectricCar extends Car {
  constructor(make, model, year) {
    super(make, model, year);
    this.battery = new Battery();  // Instance as property
  }
}
```

### Importing Classes
Just like functions, you can store your classes in modules and import them (CommonJS):

```js
// car.js ends with:  module.exports = { Car, ElectricCar };

// Each line is an alternative (use one per file):
const car = require("./car");                             // whole module: car.Car, car.ElectricCar
const { Car: Vehicle, ElectricCar } = require("./car");   // destructure, with a rename
```

### Private Fields and Static Members
```js
class BankAccount {
  #balance = 0;                       // Private — only the class can see it
  static bankName = "JS Bank";        // Class-level (like a Python class attribute)

  deposit(amount) { this.#balance += amount; }
  get balance() { return this.#balance; }
}
```

## Common Pitfalls
- **Forgetting `new`**: Calling `Dog("Rex", 5)` without `new` pollutes globals / errors in strict mode — always `new Dog("Rex", 5)`.
- **Shared Class-Level State**: Fields declared as class fields *without* the constructor are created once per class (like `static`) — initialize mutable state (arrays/objects) in the `constructor`, or it will be shared across instances.
- **`this` in Callbacks**: Passing `myCar.updateOdometer` as a bare callback detaches `this` — wrap it: `() => myCar.updateOdometer(23)`.
- **Naming Conflicts**: Importing multiple modules that contain classes with duplicate names — destructure with renaming: `const { Car: Truck } = require("./vehicles")`.

## Try It Yourself
1. Make a class called `Restaurant` with `restaurantName` and `cuisineType`. Create an instance, print the properties, and call the methods.
2. Make a class called `User` with user properties, `describeUser()`, and `greetUser()`.
3. Create an `Admin` class that extends `User`. Add an array of privileges as a property and a method to print them.
