# OOP Object Identity

Source: oop_object_identity

Files to submit
- solution.js

Allowed functions
- --allow-builtin

Instructions
Define an empty `Box` class. Write a function `same_object(a, b)` that returns true only if `a` and `b` are literally the SAME object in memory (not just equal-looking) -- use `===`, not `==`.

Expected function
```js
class Box {
  // empty class
}

function sameObject(a, b) {
  // Write your solution here
}
```


Here is a possible program to test your function :
```js
const box1 = new Box();
const box2 = new Box();
const box3 = box1;
console.log(sameObject(box1, box2));
console.log(sameObject(box1, box3));
```

And its output :
```text
false
true
```
