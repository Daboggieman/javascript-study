// Write your solution here
function basicAtoi2(s) {
  let i = 0;
  let sign = 1;
  if (s[i] === "-" || s[i] === "+") {
    if (s[i] === "-") {
      sign = -1;
    }
    i++;
  }

  let result = 0;
  while (i < s.length) {
    const digit = s.charCodeAt(i) - "0".charCodeAt(0);
    if (digit < 0 || digit > 9) {
      return 0;
    }
    result = result * 10 + digit;
    i++;
  }
  return sign * result;
}

console.log(basicAtoi2("42"));
console.log(basicAtoi2("-7"));
