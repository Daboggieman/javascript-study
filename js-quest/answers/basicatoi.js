// Write your solution here
function basicAtoi(s) {
  if (/^\d+$/.test(s)) {
    return parseInt(s, 10);
  } else {
    return 0;
  }
}

console.log(basicAtoi("42"));
console.log(basicAtoi("x"));
