# Linked List Has Cycle

Source: linked_list_has_cycle

Files to submit
- solution.js

Allowed functions
- --allow-builtin

Instructions
Write a function that detects whether a singly linked list contains a cycle, using Floyd's slow/fast pointer technique (constant extra space -- no Sets, no WeakMap identity tracking). Return true if a cycle exists, false otherwise.

Expected function
```js
function hasCycle(head) {}
```


Here is a possible program to test your function :
```js
const head = buildChain([1, 2, 3, 4]);
console.log(hasCycle(head));

// manually create a cycle: last node points back to the second node
let current = head;
while (current.next !== null) {
  current = current.next;
}
const second = head.next;
current.next = second;
console.log(hasCycle(head));
```

And its output :
```text
false
true
```
