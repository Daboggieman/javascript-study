# Exception Custom Error

Source: exception_custom_error

Files to submit
- solution.js

Allowed functions
- --allow-builtin

Instructions
Define a custom error class `InsufficientFundsError` extending `Error` that stores `balance` and `amount` properties and produces the message `` `Cannot withdraw ${amount}, balance is only ${balance}` ``. Write a `withdraw(balance, amount)` function that throws this error when `amount > balance`, otherwise returns `balance - amount`.

Expected function
```js
class InsufficientFundsError extends Error {
  constructor(balance, amount) {}
}

function withdraw(balance, amount) {}
```


Here is a possible program to test your function :
```js
console.log(withdraw(100, 30));
try {
  withdraw(100, 500);
} catch (e) {
  console.log(e.message);
  console.log(e.amount - e.balance);
}
```

And its output :
```text
70
Cannot withdraw 500, balance is only 100
400
```
