# OOP Method Chaining

Source: oop_method_chaining

Files to submit
- solution.js

Allowed functions
- --allow-builtin

Instructions
Define a `StringBuilder` class with an internal array of parts. Add an `add(text)` method that appends `text` and returns `this` (enabling method chaining), and a `build()` method that returns all parts joined into one string with no separator.

Expected function
```js
class StringBuilder {
  constructor() {
    // Write your solution here
  }

  add(text) {
    // Write your solution here (return this)
  }

  build() {
    // Write your solution here
  }
}
```


Here is a possible program to test your function :
```js
const result = new StringBuilder().add("Hello").add(", ").add("world!").build();
console.log(result);
```

And its output :
```text
Hello, world!
```
