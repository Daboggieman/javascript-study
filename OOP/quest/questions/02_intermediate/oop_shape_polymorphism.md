# OOP Shape Polymorphism

Source: oop_shape_polymorphism

Files to submit
- solution.js

Allowed functions
- --allow-builtin

Instructions
Define a `Shape` base class with a method `area()` that throws (JS's stand-in for Python's `NotImplementedError`). Define `Circle` and `Square` subclasses that each override `area()` correctly. Write a function `totalArea(shapes)` that sums the `.area()` of every shape in an array, regardless of which subclass each one is.

Expected function
```js
class Shape {
  area() {
    throw new Error("Subclasses must implement area()");
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    // Write your solution here
  }
  area() {
    // Write your solution here
  }
}

class Square extends Shape {
  constructor(side) {
    super();
    // Write your solution here
  }
  area() {
    // Write your solution here
  }
}

function totalArea(shapes) {
  // Write your solution here
}
```


Here is a possible program to test your function :
```js
const shapes = [new Circle(2), new Square(3)];
console.log(Math.round(totalArea(shapes) * 100) / 100);
```

And its output :
```text
21.57
```
