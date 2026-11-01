// Write your solution here
function atoi(n) {
  if (/^\d+$/.test(n)) {
    return parseInt(n, 10);
  } else {
    return 0;
  }
}

console.log(atoi("123"));
console.log(atoi("abc"));
