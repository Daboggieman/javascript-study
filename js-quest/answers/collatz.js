// Write your solution here

function collatzCountdown(s) {
  if (s === 1) {
    return 1;
  } else if (s < 1) {
    console.log("invalid value cannot collatz values less than 1");
    return null;
  }
  let i = 0;
  while (s > 1) {
    if (s % 2 === 0) {
      s = s / 2;
    } else {
      s = 3 * s + 1;
    }
    // console.log(s)
    i++;
  }
  return i;
}
console.log(collatzCountdown(12));
