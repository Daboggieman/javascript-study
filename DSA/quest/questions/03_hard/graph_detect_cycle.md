# Graph Detect Cycle

Source: graph_detect_cycle

Files to submit
- solution.js

Allowed functions
- --allow-builtin

Instructions
Given a **directed** graph as an adjacency-list object, write a function that detects whether it contains a cycle. Use DFS with node coloring (unvisited / in-progress / done) rather than a simple visited set, since a simple visited set alone cannot distinguish "still on the current path" from "already fully explored" in a directed graph.

Expected function
```js
function hasCycle(graph) {}
```


Here is a possible program to test your function :
```js
const acyclic = { A: ["B"], B: ["C"], C: [] };
console.log(hasCycle(acyclic));

const cyclic = { A: ["B"], B: ["C"], C: ["A"] };
console.log(hasCycle(cyclic));
```

And its output :
```text
false
true
```
