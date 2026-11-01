// Exercise 22: Exception Handling, Advanced
// Run this script with: node exercises.js


// TODO: Exercise 1 - use try/catch/finally
function divide(a, b) {
  // Write your code here
}


// TODO: Exercise 3
class InsufficientFundsError extends Error {
  constructor(balance, amount) {
    // Write your code here (call super(message), set this.name, this.balance, this.amount)
  }
}


// TODO: Exercise 3
function withdraw(balance, amount) {
  // Write your code here
}


if (require.main === module) {
  console.log(divide(10, 2));
  console.log(divide(10, 0));

  try {
    withdraw(100, 500);
  } catch (err) {
    if (err instanceof InsufficientFundsError) {
      console.log(`Error: ${err.message}`);
      console.log(`Shortfall: ${err.amount - err.balance}`);
    } else {
      throw err;
    }
  }
}
