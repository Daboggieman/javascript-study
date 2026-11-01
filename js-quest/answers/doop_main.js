// Write your solution here
function main() {
  const args = process.argv.slice(2);
  if (args.length !== 3) {
    console.log("arguments to 'doop' are not complete");
    console.log("if u used the multiplication(*) operator, \nplease be sure to insert it in a or double quote as thus '*' ");
    return;
  }
  const firstInt = parseInt(args[0], 10);
  const secondInt = parseInt(args[2], 10);
  const operator = args[1];

  let result;
  switch (operator) {
    case "+":
      result = firstInt + secondInt;
      break;
    case "-":
      result = firstInt - secondInt;
      break;
    case "/":
      result = firstInt / secondInt;
      break;
    case "*":
      result = firstInt * secondInt;
      break;
    case "%":
      result = firstInt % secondInt;
      break;
    case "//":
      result = Math.floor(firstInt / secondInt);
      break;
    default:
      console.log("unknown operator");
      return "Error";
  }
  console.log(result);
}

main();
