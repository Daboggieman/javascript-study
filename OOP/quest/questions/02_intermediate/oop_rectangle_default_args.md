# OOP Rectangle Default Args

Source: oop_rectangle_default_args

Files to submit
- solution.js

Allowed functions
- --allow-builtin

Instructions
Define a `Rectangle` class with `constructor(width, height = null)`. If `height` is not given, treat the rectangle as a square (`height = width`). Add a method `area()` returning `width * height`.

Expected function
```js
class Rectangle {
  constructor(width, height = null) {
    // Write your solution here
  }

  area() {
    // Write your solution here
  }
}
```


Here is a possible program to test your function :
```js
const square = new Rectangle(4);
const rect = new Rectangle(4, 6);
console.log(square.area());
console.log(rect.area());
```

And its output :
```text
16
24
```
