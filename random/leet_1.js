// You are given an integer array nums consisting of unique integers.
// Originally, nums contained every integer within a certain range. However, some integers might have gone missing from the array.
// The smallest and largest integers of the original range are still present in nums.
// Return a sorted array of all the missing integers in this range. If no integers are missing, return an empty array.




function findMissingElements(nums) {
  // const minNum = Math.min(...nums);
  // const maxNum = Math.max(...nums);
  const originalNums = [];
  let i = Math.min(...nums);
  while (i <= Math.max(...nums)) {
    originalNums.push(i);
    i += 1;
  }
  const originalSet = new Set(originalNums);
  const numsSet = new Set(nums);
  const comparedNums = [];
  for (const n of originalSet) {
    if (!numsSet.has(n)) {
      comparedNums.push(n);
    }
  }
  for (const n of numsSet) {
    if (!originalSet.has(n)) {
      comparedNums.push(n);
    }
  }
  return comparedNums;
}
const nums = [1, 4, 2, 5, 9, 3];
console.log(findMissingElements(nums));
