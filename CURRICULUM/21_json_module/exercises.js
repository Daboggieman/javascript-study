// Exercise 21: The JSON Object
// Run this script with: node exercises.js


// TODO: Exercise 1
function roundTrip(data) {
  /** Convert data to a JSON string (pretty-printed) and back, returning the result. */
  // Write your code here
}


// TODO: Exercise 3
function safeParse(jsonString) {
  /** Parse jsonString; return the parsed value, or the string 'INVALID JSON' if parsing fails. */
  // Write your code here
}


if (require.main === module) {
  const data = { name: "Ada", tags: ["dev", "admin"], active: true };
  console.log(roundTrip(data));

  console.log(safeParse('{"valid": true}'));
  console.log(safeParse("{not valid json}"));
}
