# Insertion Sort Linked List

Source: insertion_sort_linked_list

Files to submit
- solution.js

Allowed functions
- --allow-builtin

Instructions
Implement insertion sort directly on a singly linked list (not by converting it to an array and back). Build a new sorted chain by repeatedly removing the head of the input list and inserting it into the correct position of the sorted chain. Return the new sorted head.

Expected function
```js
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

function insertionSortList(head) {}
```


Here is a possible program to test your function :
```js
function buildChain(values) {
  const dummy = new Node(null);
  let current = dummy;
  for (const v of values) {
    current.next = new Node(v);
    current = current.next;
  }
  return dummy.next;
}

function toList(head) {
  const result = [];
  while (head !== null) {
    result.push(head.data);
    head = head.next;
  }
  return result;
}

const head = buildChain([4, 2, 1, 3]);
const sortedHead = insertionSortList(head);
console.log(toList(sortedHead));
```

And its output :
```text
[ 1, 2, 3, 4 ]
```
