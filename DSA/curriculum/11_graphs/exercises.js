// DSA Exercise 11: Graphs
// Run this script with: node exercises.js


const graph = {
  A: ["B", "C"],
  B: ["A", "D"],
  C: ["A", "D"],
  D: ["B", "C"],
};

const weightedGraph = {
  A: [["B", 4], ["C", 1]],
  B: [["A", 4], ["D", 1]],
  C: [["A", 1], ["D", 5]],
  D: [["B", 1], ["C", 5]],
};


// TODO: Exercise 1
function dfs(g, start, visited = new Set()) {
  // Write your solution here
}


// TODO: Exercise 2
function bfs(g, start) {
  // Write your solution here
}


// TODO: Exercise 3
function hasPath(g, start, end) {
  // Write your solution here
}


// TODO: Exercise 4 - unweighted shortest path length using BFS
function shortestPathLength(g, start, end) {
  // Write your solution here
}


// TODO: Exercise 5 - Dijkstra's algorithm for weighted graphs
// (no heapq in JS -- a sorted array or your own MinHeap works as the priority queue)
function dijkstra(g, start) {
  // Write your solution here
}


// Main program
console.log(dfs(graph, "A"));
console.log(bfs(graph, "A"));
console.log(hasPath(graph, "A", "D"));    // true
console.log(shortestPathLength(graph, "A", "D"));  // 2
console.log(dijkstra(weightedGraph, "A"));  // { A: 0, B: 4, C: 1, D: 5 }
