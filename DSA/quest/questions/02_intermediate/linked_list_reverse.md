# Linked List Reverse

Source: linked_list_reverse

Files to submit
- solution.js

Allowed functions
- --allow-builtin

Instructions
Write a function that reverses a singly linked list **iteratively** (no recursion, no converting to an array) and returns the new head.

Expected function
```js
function reverseLinkedList(head) {}
```


Here is a possible program to test your function :
```js
// buildChain from the Node Chain question, or build nodes manually
let head = buildChain([1, 2, 3, 4, 5]);
let newHead = reverseLinkedList(head);
const values = [];
while (newHead !== null) {
  values.push(newHead.data);
  newHead = newHead.next;
}
console.log(values);
```

And its output :
```text
[ 5, 4, 3, 2, 1 ]
```
