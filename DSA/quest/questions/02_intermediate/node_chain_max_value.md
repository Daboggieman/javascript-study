# Node Chain Max Value

Source: node_chain_max_value

Files to submit
- solution.js

Allowed functions
- --allow-builtin

Instructions
Write a function that finds the maximum numeric value in a chain of nodes, and a second function that counts how many times a target value occurs in the chain. Do not convert the chain into an array.

Expected function
```js
function chainMax(head) {}

function chainCountValue(head, target) {}
```


Here is a possible program to test your function :
```js
// buildChain from the Node Chain question, or build nodes manually
const head = buildChain([4, 9, 2, 9, 7]);
console.log(chainMax(head));
console.log(chainCountValue(head, 9));
```

And its output :
```text
9
2
```
