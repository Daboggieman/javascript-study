// Write your solution here
function countIf(predicate, items) {
  if (items.length < 1) {
    console.log("items array is empty");
    return null;
  }
  const check = items.map(predicate);
  let count = 0;
  for (const j of check) {
    if (j === true) {
      count++;
    }
  }
  return count;
}

console.log(countIf((x) => x > 2, [1, 2, 3, 4]));
