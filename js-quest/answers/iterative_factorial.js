// Write your solution here
function iterativeFactorial(n) {
  if (n < 1) {
    return 0;
  }
  if (n === 1) {
    return 1;
  }
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i;
  }
  return result;
}

console.log(iterativeFactorial(5));
