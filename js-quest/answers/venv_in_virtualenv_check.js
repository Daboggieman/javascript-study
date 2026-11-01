// Write your solution here
function inVirtualEnv() {
  return process.execPath.includes("node_modules");
}
