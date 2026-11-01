// Write your solution here
function appendRange(minValue, maxValue) {
  const result = [];
  let i = minValue;
  while (i < maxValue) {
    result.push(i);
    i++;
  }
  console.log(result);
}

appendRange(2, 6);
