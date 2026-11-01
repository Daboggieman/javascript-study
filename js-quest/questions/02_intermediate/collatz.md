### DONE

# Collatz Countdown

Source: collatz

Files to submit
- solution.js

Allowed functions
- --allow-builtin

Instructions
Write a function that returns the number of steps needed to reach 1 using the Collatz sequence.

Expected function
```js
function collatzCountdown(start) {}
```


Here is a possible program to test your function :
```js
console.log(collatzCountdown(12));
```

And its output :
```text
9
```

if number is even divide by 2, if number is odd multiply number by 3 and add 1 and repeat the sequence again till the final answer is 1
