// Write your solution here
function capitalize(s) {
  console.log(
    s
      .split(" ")
      .map((word) =>
        word.length > 0
          ? word[0].toUpperCase() + word.slice(1).toLowerCase()
          : word
      )
      .join(" ")
  );
}

capitalize("this is the string to capitalize");
