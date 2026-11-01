# Enigma

Source: enigma

Files to submit
- solution.js

Allowed functions
- --allow-builtin

Instructions
Write a function that swaps values between several variables in the requested order. (JS passes primitives by value — there are no pointers — so the idiomatic equivalent is to swap inside an array, which is passed by reference.)

Expected function
```js
function enigma(values) {}
```


Here is a possible program to test your function :
```js
const values = [1, 2, 3, 4];
enigma(values);
console.log(values.join(' '));
```

And its output :
```text
4 3 2 1
```
