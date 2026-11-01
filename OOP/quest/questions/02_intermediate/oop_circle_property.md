# OOP Circle Property

Source: oop_circle_property

Files to submit
- solution.js

Allowed functions
- --allow-builtin

Instructions
Define a `Circle` class with a validated `radius` accessor (getter + setter; setter must throw `TypeError`/`Error` for negative values) and a read-only `area` accessor computed as `Math.PI * radius ** 2`.

Expected function
```js
class Circle {
  constructor(radius) {
    this.radius = radius;   // write through the setter so validation applies
  }

  get radius() {
    // Write your solution here
  }

  set radius(value) {
    // Write your solution here
  }

  get area() {
    // Write your solution here
  }
}
```


Here is a possible program to test your function :
```js
const c = new Circle(5);
console.log(c.radius, Math.round(c.area * 100) / 100);
c.radius = 10;
console.log(c.radius, Math.round(c.area * 100) / 100);
```

And its output :
```text
5 78.54
10 314.16
```
