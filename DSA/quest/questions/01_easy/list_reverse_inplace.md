# List Reverse Inplace

Source: list_reverse_inplace

Files to submit
- solution.js

Allowed functions
- --allow-builtin

Instructions
Write a function that reverses an array **in place** (modifying the original array) without using `.reverse()`, `.toReversed()`, or slicing. Use a two-pointer swap instead. The function should return the same array object, now reversed.

Expected function
```js
function listReverseInplace(arr) {}
```


Here is a possible program to test your function :
```js
const nums = [1, 2, 3, 4, 5];
console.log(listReverseInplace(nums));
console.log(nums);
```

And its output :
```text
[ 5, 4, 3, 2, 1 ]
[ 5, 4, 3, 2, 1 ]
```
