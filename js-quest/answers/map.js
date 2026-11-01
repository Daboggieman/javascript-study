// Write your solution here
function mapValues(predicate, itemList) {
  if (itemList.length < 1) {
    return "Item array is Empty";
  }
  const checkItems = itemList.map(predicate);
  const boolList = [];

  for (const conditions of checkItems) {
    boolList.push(conditions);
  }
  return boolList;
}

console.log(mapValues((x) => x > 3, [6, 1, 2, 3, 4, 6, 0]));
