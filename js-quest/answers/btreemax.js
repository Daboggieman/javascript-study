// Write your solution here

function btreeMax(node) {
  if (node.length === 0) {
    console.log("node list is empty");
    return null;
  }
  let currentNode = node[0];
  let maxNode = currentNode;
  let i = 1;
  while (i <= node.length - 1) {
    if (maxNode > node[i]) {
      maxNode = maxNode;
    } else {
      maxNode = node[i];
    }
    i++;
  }
  console.log(`the maximum value in the node is \x1b[32m${maxNode}\x1b[0m`);
  return maxNode;
}

btreeMax([-4, 5, 7, 2, 23, 1, -7, 1, 6]);
