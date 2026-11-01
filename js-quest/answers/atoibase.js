// Write your solution here
function atoiBase(number, base) {
  let value = 0;
  for (const ch of number) {
    let digit;
    if (ch >= "0" && ch <= "9") {
      digit = ch.charCodeAt(0) - "0".charCodeAt(0);
    } else {
      digit = ch.toUpperCase().charCodeAt(0) - "A".charCodeAt(0) + 10;
    }

    if (digit < 0 || digit >= base) {
      return 0;
    }

    value = value * base + digit;
  }

  return value;
}

console.log(atoiBase("101", 3));
