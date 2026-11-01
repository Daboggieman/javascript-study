# List Rotate K

Source: list_rotate_k

Files to submit
- solution.js

Allowed functions
- --allow-builtin

Instructions
Write a function that rotates an array to the right by `k` positions, in place, without using `slice()`/`splice()` to build a new array (you may use at most O(1) extra temporary variables, not a second full-size array). Handle `k` larger than the array length by taking `k % arr.length`.

Expected function
```js
function listRotateK(arr, k) {}
```


Here is a possible program to test your function :
```js
const nums = [1, 2, 3, 4, 5, 6, 7];
console.log(listRotateK(nums, 3));
```

And its output :
```text
[ 5, 6, 7, 1, 2, 3, 4 ]
```
