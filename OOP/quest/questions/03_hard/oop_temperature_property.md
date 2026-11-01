# OOP Temperature Property

Source: oop_temperature_property

Files to submit
- solution.js

Allowed functions
- --allow-builtin

Instructions
Define a `Temperature` class that stores the value internally in Celsius (`this._celsius`), with a `celsius` accessor (getter + setter) AND a `fahrenheit` accessor (getter + setter) that stay in sync -- setting either one updates the underlying Celsius value so BOTH accessors reflect the change consistently. Use `fahrenheit = celsius * 9/5 + 32`.

Expected function
```js
class Temperature {
  constructor(celsius = 0) {
    this._celsius = celsius;
  }

  get celsius() {
    // Write your solution here
  }

  set celsius(value) {
    // Write your solution here
  }

  get fahrenheit() {
    // Write your solution here
  }

  set fahrenheit(value) {
    // Write your solution here
  }
}
```


Here is a possible program to test your function :
```js
const t = new Temperature(0);
console.log(t.fahrenheit);
t.fahrenheit = 212;
console.log(Math.round(t.celsius * 100) / 100);
```

And its output :
```text
32
100
```
