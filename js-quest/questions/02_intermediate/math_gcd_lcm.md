# Math Gcd Lcm

Source: math_gcd_lcm

Files to submit
- solution.js

Allowed functions
- --allow-builtin

Instructions
Write a function that returns both the greatest common divisor and least common multiple of two positive integers as an array `[gcd, lcm]` (JS has no tuples — arrays stand in). Recall that `lcm(a, b) = (a * b) / gcd(a, b)`. JS has no built-in `gcd`, so compute it yourself (e.g. the Euclidean algorithm with a loop or recursion).

Expected function
```js
function gcdLcm(a, b) {}
```


Here is a possible program to test your function :
```js
console.log(gcdLcm(48, 18));
console.log(gcdLcm(7, 5));
```

And its output :
```text
[ 6, 144 ]
[ 1, 35 ]
```
