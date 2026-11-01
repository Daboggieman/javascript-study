// Write your solution here
function main() {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.log("no string found, please insert string");
    return;
  }
  if (args.length > 1) {
    console.log("more than one string found, only one string is Required");
    return;
  }

  let word = args[0];
  for (const char of word) {
    if (!/[a-zA-Z]/.test(char)) {
      word = word.split(char).join("");
    }
  }
  const titleWord = word
    .split(" ")
    .map((w) => (w.length > 0 ? w[0].toUpperCase() + w.slice(1).toLowerCase() : w))
    .join(" ");
  return titleWord;
}

function fixthemainMain() {
  return main();
}

console.log(fixthemainMain());
