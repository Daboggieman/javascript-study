// Write your solution here
function divmod(a, b) {
  const result = [];

  if (a === 0) {
    return "cannot divide zero(0)";
  } else if (b === 0) {
    return "cannot divide by zero (0)";
  } else {
    result.push(Math.floor(a / b));
    result.push(a % b);
  }

  return [result[0], result[1]];
}

const answer = divmod(13, 2);
console.log(answer[0]);
console.log(answer[1]);
