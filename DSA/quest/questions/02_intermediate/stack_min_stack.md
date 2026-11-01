# Stack Min Stack

Source: stack_min_stack

Files to submit
- solution.js

Allowed functions
- --allow-builtin

Instructions
Design a `MinStack` class that supports `push(x)`, `pop()`, `top()`, and `getMin()`, where `getMin()` returns the minimum element currently in the stack, all in O(1) time. (Hint: keep a second stack that tracks the running minimum alongside the main stack.)

Expected function
```js
class MinStack {
  constructor() {}

  push(x) {}

  pop() {}

  top() {}

  getMin() {}
}
```


Here is a possible program to test your function :
```js
const ms = new MinStack();
ms.push(5);
ms.push(2);
ms.push(7);
console.log(ms.getMin());
ms.pop();
console.log(ms.getMin());
console.log(ms.top());
```

And its output :
```text
2
2
2
```
