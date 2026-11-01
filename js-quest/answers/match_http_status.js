// Write your solution here
function describeStatus(code) {
  switch (code) {
    case 200:
      return "OK";
    case 201:
      return "Created";
    case 404:
      return "Not Found";
    case 500:
      "Server Error";
    default:
      return "Unknown";
  }
}

console.log(describeStatus(200));
console.log(describeStatus(404));
console.log(describeStatus(999));
