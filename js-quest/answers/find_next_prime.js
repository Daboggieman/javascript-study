// Write your solution here
// find the next prime number, greater to or even to the provided number
function findNextPrime(n) {
  let i = n;
  while (n) {
    if (i % 2 !== 0 || i % 3 !== 0 || i % 5 !== 0) {
      return i;
    } else {
      i++;
    }
  }
  return i;
}

console.log(findNextPrime(10));
