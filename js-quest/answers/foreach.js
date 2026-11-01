// Write your solution here
function forEach(fn, items) {
  const results = items.map(fn);
  console.log(results);
}

forEach((x) => x * 2, [1, 2, 3, 4, 5]);
