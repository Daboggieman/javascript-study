// Write your solution here
function isPrime(n) {
  if (n < 2) {
    return false;
  }
  const limit = Math.floor(Math.sqrt(n)) + 1;
  for (let i = 2; i < limit; i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}

console.log(isPrime(17));
console.log(isPrime(18));
console.log(isPrime(2));
console.log(isPrime(1));
