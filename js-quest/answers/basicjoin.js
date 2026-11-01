// Write your solution here
function basicJoin(items) {
  let result = "";
  if (items.length === 0) {
    console.log("ERROR: the array is EMPTY");
  } else {
    let i = 0;
    while (i <= items.length - 1) {
      result += items[i] + " ";
      i++;
    }
    console.log(result + "\n");
  }
}

basicJoin(["these", "are", "the", "items", "to", "concantenate"]);
basicJoin([]);
