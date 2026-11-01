# Iter Custom Range

Source: iter_custom_range

Files to submit
- solution.js

Allowed functions
- --allow-builtin

Instructions
Implement a `CustomRange` class that mimics a numeric range `(start, stop, step)` by implementing the iterable protocol (`Symbol.iterator`), without using arrays or generators internally.

Expected function
```js
class CustomRange {
  constructor(start, stop, step = 1) {}

  [Symbol.iterator]() {}
}
```


Here is a possible program to test your function :
```js
console.log([...new CustomRange(0, 10, 2)]);
```

And its output :
```text
[ 0, 2, 4, 6, 8 ]
```
