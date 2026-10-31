// DSA Exercise 03: Linked Lists
// Run this script with: node exercises.js

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}


class LinkedList {
  constructor() {
    this.head = null;
  }

  // TODO: Exercise 1 - insert a new node at the front, O(1)
  pushFront(data) {
    // Write your solution here
  }

  // TODO: Exercise 2 - insert a new node at the back, O(n) is fine here
  pushBack(data) {
    // Write your solution here
  }

  // TODO: Exercise 3 - remove and return the value at the front, or null if empty
  popFront() {
    // Write your solution here
  }

  // TODO: Exercise 4 - return the middle node's data using slow/fast pointers
  findMiddle() {
    // Write your solution here
  }

  // TODO: Exercise 5 - reverse the list in place (iterative, O(n), O(1) extra space)
  reverse() {
    // Write your solution here
  }

  display() {
    const values = [];
    let current = this.head;
    while (current !== null) {
      values.push(String(current.data));
      current = current.next;
    }
    console.log(values.length > 0 ? values.join(" -> ") : "EMPTY");
  }
}


// Main program
const ll = new LinkedList();
for (const value of [3, 2, 1]) {
  ll.pushFront(value);     // expect 1 -> 2 -> 3
}
ll.pushBack(4);               // expect 1 -> 2 -> 3 -> 4
ll.display();
console.log(ll.findMiddle());       // expect 2 or 3 depending on convention
ll.reverse();
ll.display();                  // expect reversed order
console.log(ll.popFront());
ll.display();
