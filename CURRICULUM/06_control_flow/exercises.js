// Exercise 06: Control Flow
// Run this script with: node exercises.js

const readline = require("node:readline/promises");
const { stdin: input, stdout: output } = require("node:process");

async function main() {
  const rl = readline.createInterface({ input, output });

  // TODO: Exercise 1
  // Given the score below, write an if-else if-else chain that prints:
  // - "Excellent" if score is 90 or above.
  // - "Good" if score is 70 to 89.
  // - "Needs Improvement" if score is below 70.
  const score = 85;
  if (score >= 90 && score <= 100) {
    console.log(`score is ${score}, EXCELLENT!`);
  } else if (score < 90 && score >= 70) {
    console.log(`score is ${score}, GOOD!`);
  } else if (score < 70 && score >= 0) {
    console.log(`score is ${score}, NEEDS IMPROVEMENT!`);
  } else {
    console.log("invalid score, score must be between 0 to 100");
  }


  // TODO: Exercise 2
  // Write a print statement using a ternary operator (one line) that prints "Can Vote"
  // if the age variable is 18 or older, and "Cannot Vote" otherwise.
  const age = 20;

  const canVote = age > 17 ? "can vote" : "cannot vote";
  console.log(canVote);


  // TODO: Exercise 3
  // Write a switch statement for the variable 'role' below:
  // - If role is "admin", print "Full access"
  // - If role is "editor" or "author", print "Write access"
  // - If role is "guest", print "Read access"
  // - Otherwise, print "No access"
  const role = await rl.question("Are you an admin, editor, author, or guest? \n Enter your role: ");
  switch (role) {
    case "admin":
      console.log("full access");
      break;
    case "editor":
    case "author":
      console.log("write access");
      break;
    case "guest":
      console.log("read access");
      break;
    default:
      console.log("no access");
  }


  // TODO: Exercise 4
  // Check if the array 'items' is empty or not. Careful: an empty array is TRUTHY in JS!
  // Use its .length to check, and print "Empty array" or "Items present".
  const items = [];

  if (items.length > 0) {
    console.log("Items present");
  } else {
    console.log("Empty array");
  }

  rl.close();
}

main();
