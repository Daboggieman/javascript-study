// Write your solution here
function isAlpha(string) {
  return /^[a-zA-Z]+$/.test(string);
}

console.log(isAlpha("Hellhowareyou"));
console.log(isAlpha("Hello1How2Are3You4"));
console.log(isAlpha("Hellhowareyou!!"));
console.log(isAlpha("Hello_how_are_you"));
