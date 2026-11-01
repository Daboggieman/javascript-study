// Exercise 23: npm in Practice
//
// This lesson is primarily hands-on with your TERMINAL, not this file --
// see lecture.md's "Try It Yourself" section for the actual exercises
// (initializing a project, installing packages, recreating node_modules, etc).
//
// Use this file to write a short helper and to record what you observed.

const fs = require("node:fs");
const path = require("node:path");


// TODO: Exercise (helper) - print whether the CURRENT script is running
// inside a project that has dependencies installed. Hint: check for a
// `node_modules` folder next to (or above) this file, which exists only
// when `npm install` has been run in this project.
function inInstalledProject() {
  // Write your code here
}


if (require.main === module) {
  console.log("Running inside an installed project:", inInstalledProject());
  console.log("Node executable:", process.execPath);

  // TODO: After completing the terminal exercises in lecture.md, write a
  // one-paragraph comment below summarizing what you observed when you
  // deleted node_modules and ran this script before reinstalling.
}
