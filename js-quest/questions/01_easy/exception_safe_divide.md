# Exception Safe Divide

Source: exception_safe_divide

Files to submit
- solution.js

Allowed functions
- --allow-builtin

Instructions
Write a function that divides `a` by `b` using a full `try`/`catch`/`else`/`finally` structure: catch a division by zero and return `null` in that case (after printing "Cannot divide by zero!"); on success, print "Division succeeded" after the `try` block; always print "Done" from the `finally` block; return the result on success.

Expected function
```js
function divide(a, b) {}
```


Here is a possible program to test your function :
```js
console.log(divide(10, 2));
console.log(divide(10, 0));
```

And its output :
```text
Division succeeded
Done
5
Cannot divide by zero!
Done
null
```
