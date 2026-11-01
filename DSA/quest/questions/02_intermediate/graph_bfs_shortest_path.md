# Graph BFS Shortest Path

Source: graph_bfs_shortest_path

Files to submit
- solution.js

Allowed functions
- --allow-builtin

Instructions
Given a graph as an adjacency-list object (unweighted, undirected), write a function that returns the length (number of edges) of the shortest path between `start` and `end` using BFS. Return `-1` if no path exists.

Expected function
```js
function shortestPathLength(graph, start, end) {}
```


Here is a possible program to test your function :
```js
const graph = {
  A: ["B", "C"],
  B: ["A", "D"],
  C: ["A", "D"],
  D: ["B", "C", "E"],
  E: ["D"],
  F: [],
};
console.log(shortestPathLength(graph, "A", "E"));
console.log(shortestPathLength(graph, "A", "F"));
```

And its output :
```text
3
-1
```
