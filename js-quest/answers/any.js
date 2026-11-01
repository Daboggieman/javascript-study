// Write your solution here
function anyValue(predicate, items) {
  if (!Array.isArray(items)) {
    items = [items];
  }

  const checkThrough = items.map(predicate);

  let trueCount = 0;

  for (const j of checkThrough) {
    if (j === true) {
      trueCount++;
    }
  }

  return trueCount > 0;
}

console.log(anyValue((x) => x < 8, [1, 2, 3, 4, 5, 6]));
