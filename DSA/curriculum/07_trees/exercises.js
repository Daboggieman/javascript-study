// DSA Exercise 07: Trees (General N-ary Trees)
// Run this script with: node exercises.js


class TreeNode {
  constructor(data) {
    this.data = data;
    this.children = [];
  }

  addChild(childNode) {
    this.children.push(childNode);
  }
}


// TODO: Exercise 1 - depth-first traversal, print indented by depth
function dfs(node, depth = 0) {
  // Write your solution here
}


// TODO: Exercise 2 - breadth-first (level-order) traversal, print level by level
function bfs(root) {
  // Write your solution here
}


// TODO: Exercise 3 - return the height of the tree (longest root-to-leaf path, in edges)
function treeHeight(node) {
  // Write your solution here
}


// TODO: Exercise 4 - count how many leaf nodes (no children) exist
function countLeaves(node) {
  // Write your solution here
}


// Main program
const root = new TreeNode("CEO");
const vpEng = new TreeNode("VP Engineering");
const vpSales = new TreeNode("VP Sales");
root.addChild(vpEng);
root.addChild(vpSales);
vpEng.addChild(new TreeNode("Engineer A"));
vpEng.addChild(new TreeNode("Engineer B"));
vpSales.addChild(new TreeNode("Sales Rep A"));

dfs(root);
console.log("---");
bfs(root);
console.log("Height:", treeHeight(root));       // 2
console.log("Leaves:", countLeaves(root));      // 3
