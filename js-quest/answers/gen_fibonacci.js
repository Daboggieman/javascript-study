// Write your solution here
function* genFibonacci(n) {
  let a = 0;
  let b = 1;
  for (let i = 0; i < n; i++) {
    yield a;
    [a, b] = [b, a + b];
  }
}

console.log([...genFibonacci(8)]);
