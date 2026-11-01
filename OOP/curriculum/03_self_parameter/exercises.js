// OOP Exercise 03: The this Parameter
// Run this script with: node exercises.js


class BankAccount {
  constructor(owner, balance = 0) {
    this.owner = owner;
    this.balance = balance;
  }

  // TODO: Exercise 2
  deposit(amount) {
    // Write your solution here
  }

  // TODO: Exercise 2
  withdraw(amount) {
    // Write your solution here
  }

  // TODO: Exercise 2
  printBalance() {
    // Write your solution here
  }

  // TODO: Exercise 4
  transfer(otherAccount, amount) {
    // Write your solution here
  }
}


if (require.main === module) {
  const acc1 = new BankAccount("Alice", 100);
  const acc2 = new BankAccount("Bob", 50);

  acc1.deposit(50);
  acc1.printBalance();    // Alice's balance: 150

  acc1.transfer(acc2, 100);
  acc1.printBalance();    // Alice's balance: 50
  acc2.printBalance();    // Bob's balance: 150
}
