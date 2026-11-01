# Node Chain Build And Count

Source: node_chain_build_and_count

Files to submit
- solution.js

Allowed functions
- --allow-builtin

Instructions
Given a `Node` class with `data` and `next` properties, write a function that builds a chain of nodes from an array of values (returning the `head` node), and a second function that counts how many nodes are in a chain.

Expected function
```js
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

function buildChain(values) {}

function countNodes(head) {}
```


Here is a possible program to test your function :
```js
const head = buildChain([10, 20, 30, 40]);
console.log(countNodes(head));
```

And its output :
```text
4
```
