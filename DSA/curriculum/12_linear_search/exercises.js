// DSA Exercise 12: Linear Search
// Run this script with: node exercises.js


// TODO: Exercise 1
function linearSearch(arr, target) {
  // Write your solution here
}


// TODO: Exercise 2
function findAll(arr, target) {
  // Write your solution here
}


// TODO: Exercise 3
// Reuse the LinkedList/Node classes from Lesson 03 (rewritten here for
// convenience) and implement linear search over a chain of nodes instead
// of an array.
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}


function linearSearchLinkedList(head, target) {
  // Write your solution here
}


// Main program
const data = Array.from({ length: 1000 }, (_, i) => i);
console.log(linearSearch(data, 500));   // 500
console.log(linearSearch(data, 9999));  // -1
console.log(findAll([1, 2, 3, 2, 1], 2));  // [1, 3]

const n1 = new Node(10);
const n2 = new Node(20);
const n3 = new Node(30);
n1.next = n2;
n2.next = n3;
console.log(linearSearchLinkedList(n1, 20));  // true
console.log(linearSearchLinkedList(n1, 99));  // false
