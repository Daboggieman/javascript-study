# OOP Singleton Pattern

Source: oop_singleton_pattern

Files to submit
- solution.js

Allowed functions
- --allow-builtin

Instructions
Implement the Singleton pattern using a static method: define a `Config` class where calling `Config.getInstance()` always returns the SAME object, creating it only the first time it's called (store it on a static class attribute). Direct instantiation with `new Config()` should still work normally and create a separate object -- only `getInstance()` guarantees a shared single instance.

Expected function
```js
class Config {
  static _instance = null;

  constructor() {
    // Write your solution here
  }

  static getInstance() {
    // Write your solution here
  }
}
```


Here is a possible program to test your function :
```js
const a = Config.getInstance();
const b = Config.getInstance();
console.log(a === b);

const c = new Config();
console.log(a === c);
```

And its output :
```text
true
false
```
