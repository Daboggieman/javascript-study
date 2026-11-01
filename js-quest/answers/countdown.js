// Write your solution here
function countdown() {
  const j = [];
  for (let i = 1; i < 10; i++) {
    j.push(i);
  }
  const k = j.reverse();

  for (const nums of k) {
    console.log(nums);
  }
}

countdown();
