# OOP Dog Alt Constructor

Source: oop_dog_alt_constructor

Files to submit
- solution.js

Allowed functions
- --allow-builtin

Instructions
Define a `Dog` class with `constructor(name, age)`, a static class attribute `population` starting at 0 and incremented on every creation, a static method `fromBirthYear(name, birth_year, current_year = 2026)` that computes age and returns a new `Dog`, and a static method `getPopulation()`.

Expected function
```js
class Dog {
  static population = 0;

  constructor(name, age) {
    // Write your solution here
  }

  static fromBirthYear(name, birthYear, currentYear = 2026) {
    // Write your solution here
  }

  static getPopulation() {
    // Write your solution here
  }
}
```


Here is a possible program to test your function :
```js
const rex = Dog.fromBirthYear("Rex", 2022);
const fido = new Dog("Fido", 1);
console.log(rex.age);
console.log(Dog.getPopulation());
```

And its output :
```text
4
2
```
