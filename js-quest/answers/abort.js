// Write your solution here
function abort(a, b, c, d, e) {
  const numbers = [a, b, c, d, e].sort((x, y) => x - y);
  return numbers[2];
}

console.log(abort(5, 3, 4, 1, 2));
