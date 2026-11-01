# OOP Bank Account Self

Source: oop_bank_account_self

Files to submit
- solution.js

Allowed functions
- --allow-builtin

Instructions
Define a `BankAccount` class with `constructor(owner, balance = 0)`, `deposit(amount)`, and `withdraw(amount)` (withdraw should not go below 0 -- if there are insufficient funds, do not change the balance and instead return the string `"Insufficient funds"`; a successful withdraw or deposit should return the new balance).

Expected function
```js
class BankAccount {
  constructor(owner, balance = 0) {
    // Write your solution here
  }

  deposit(amount) {
    // Write your solution here
  }

  withdraw(amount) {
    // Write your solution here
  }
}
```


Here is a possible program to test your function :
```js
const acc = new BankAccount("Alice", 100);
console.log(acc.deposit(50));
console.log(acc.withdraw(200));
console.log(acc.withdraw(30));
```

And its output :
```text
150
Insufficient funds
120
```
