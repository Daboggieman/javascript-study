// Write your solution here
function divide(a, b) {
  let result;
  try {
    if (b === 0) {
      throw new Error("zero division");
    }
    result = a / b;
    // "else" equivalent: runs only when the try block succeeded
    console.log("Division succeeded");
  } catch (err) {
    console.log("Cannot divide by zero!");
    return null;
  } finally {
    console.log("Done");
  }
  return result;
}

console.log(divide(10, 2));
console.log(divide(10, 0));
