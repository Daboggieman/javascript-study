// Write your solution here
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class SLL {
  constructor() {
    this.head = null;
    const n1 = new Node(linkedList[0]);
    this.head = n1;
    for (const i of linkedList) {
      // n2 = new Node(20);
      // n1.next = n2;
      // n3 = new Node(30);
      // n2.next = n3;
    }
  }

  display() {
    let temp = this.head;
    if (this.head === null) {
      console.log("EMPTY");
    }
    while (temp) {
      console.log(temp.data);
      temp = temp.next;
    }
  }

  ListForEach() {
    // empty
  }
}

const linkedList = [1, 2, 3, 4, 5, 6];
const linked = new SLL();
linked.display();
