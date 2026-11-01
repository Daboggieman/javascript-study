"use strict";
const fs = require("fs");
const path = require("path");

class BankAccount {
  constructor(name, balance = 0) {
    this.name = name;
    this.balance = balance;
    this.history = [];
  }

  deposit(amount) {
    if (amount < 1) {
      return "minimum deposit is 1";
    }
    this.balance += amount;
    this.history.push(`Deposited ${amount}`);
    return {
      name: this.name,
      action: "deposit",
      amount: amount,
      balance: this.balance,
      message: `${amount} has been credited to your account`,
    };
  }

  withdraw(amount) {
    if (amount < 1) {
      return "minimum withdrawal is 1";
    }
    if (amount > this.balance) {
      return "Insufficient Balance";
    }
    this.balance -= amount;
    this.history.push(`Withdrew ${amount}`);
    return {
      name: this.name,
      action: "withdraw",
      amount: amount,
      balance: this.balance,
      message: `${amount} has been withdrawn from your account balance`,
    };
  }

  getBalance() {
    return this.balance;
  }

  getHistory() {
    return this.history;
  }
}

function appendJson(filepath, record) {
  let data = [];
  if (fs.existsSync(filepath) && fs.statSync(filepath).size > 0) {
    data = JSON.parse(fs.readFileSync(filepath, "utf8"));
  }
  data.push(record);
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
}

const filepath1 = path.join(__dirname, "json_output", "account_history.json");

const acc = new BankAccount("Raph'el", 100);
let result = acc.deposit(50);
appendJson(filepath1, result);

result = acc.withdraw(70);
appendJson(filepath1, result);

console.log(acc.getBalance());
console.log(acc.getHistory());
result = acc.withdraw(1000);
console.log(result);

// TODO: give accounts ID beside their variable name, i.e acc2 would be the account
// id/account number which carries the details of the account, including name,
// tier, balance, e.t.c
// account_number = ...;  BankAccount(...)
// result = acc2.deposit(32);
// appendJson(filepath1, result);
// result = acc2.withdraw(44);
// appendJson(filepath1, result);
// console.log(acc2.getBalance());
// console.log(acc2.getHistory());
