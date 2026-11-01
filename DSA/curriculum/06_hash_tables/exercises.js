// DSA Exercise 06: Hash Tables
// Run this script with: node exercises.js

// JS does not expose its built-in hash(), so we use this small
// deterministic string hash (same input, same output, every run).
function stringHash(key) {
  let h = 0;
  for (const ch of String(key)) {
    h = (h * 31 + ch.charCodeAt(0)) | 0;
  }
  return Math.abs(h);
}


class HashTable {
  constructor(capacity = 8) {
    this.capacity = capacity;
    this.buckets = Array.from({ length: capacity }, () => []);
  }

  _hash(key) {
    return stringHash(key) % this.capacity;
  }

  // TODO: Exercise 1
  put(key, value) {
    // Write your solution here
  }

  // TODO: Exercise 2
  get(key) {
    // Write your solution here
  }

  // TODO: Exercise 3
  remove(key) {
    // Write your solution here
  }
}


// TODO: Exercise 4
// Return the first character that repeats in `s`, using O(n) time (a Set or Map).
// Return null if there are no repeats.
function firstRepeatedChar(s) {
  // Write your solution here
}


// TODO: Exercise 5
// Classic "two sum": return an array of the two INDICES whose values sum to
// `target`. Must run in O(n) using a Map (not the O(n^2) nested loop).
function twoSum(nums, target) {
  // Write your solution here
}


// Main program
const ht = new HashTable(2);   // tiny capacity on purpose, forces collisions
ht.put("apple", 1.5);
ht.put("banana", 0.5);
ht.put("cherry", 3.0);
console.log(ht.get("banana"));   // 0.5
ht.remove("apple");
try {
  ht.get("apple");
} catch (err) {
  console.log("apple correctly removed");
}

console.log(firstRepeatedChar("swiss"));   // s
console.log(twoSum([2, 7, 11, 15], 9));      // [0, 1]
