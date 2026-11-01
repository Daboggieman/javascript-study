// Write your solution here
function makeRange(startNum, endNum) {
  const result = [];
  for (let i = startNum; i < endNum; i++) {
    result.push(i);
  }
  return result;
}

console.log(makeRange(2, 6));
