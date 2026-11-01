// let's attempt to manually convert - from base 10 to base 2,

function base10toX(number, targetBase) {
  if (number === 0) {
    return 0;
  }

  const checkNegative = number < 0;

  const absNumber = Math.abs(number);
  if (absNumber === 0) {
    return 0;
  }

  const remainder = [];

  let n = absNumber;
  while (n > 0) {
    if (n > 1) {
      remainder.push(n % targetBase);
      n = Math.trunc(n / targetBase);
    } else if (n === 1) {
      remainder.push(1);
      n = 0;
    } else {
      n = 0;
    }
  }

  const remsMap = {};
  for (let i = 0; i < targetBase; i++) {
    if (i < 10) {
      remsMap[i] = String(i);
    } else {
      remsMap[i] = String.fromCharCode(65 + i - 10);
    }
  }

  const mappedRemainder = [];
  for (const r of remainder) {
    mappedRemainder.push(remsMap[r]);
  }

  if (checkNegative) {
    mappedRemainder.push("-");
  }

  const reversedRemainder = mappedRemainder.slice().reverse();
  let revRemsToString = "";

  for (const rems of reversedRemainder) {
    revRemsToString += String(rems);
  }
  return revRemsToString;
}

function baseXto10(number, initialBase) {
  if (number === 0) {
    return 0;
  }

  const listCharacters = [];

  for (const char of number) {
    listCharacters.push(char);
  }

  let checkNegative = false;
  let i = 0;
  while (i < listCharacters.length) {
    if (listCharacters[i] === "-") {
      checkNegative = true;
      listCharacters.splice(i, 1);
    }
    i += 1;
  }
  // for (const chars of listCharacters) {
  //   if (chars === "-") {
  //     checkNegative = true;
  //     listCharacters = listCharacters.slice(1);
  //   }
  // }

  const digitMap = {};
  for (let i = 0; i < initialBase; i++) {
    if (i < 10) {
      digitMap[String(i)] = i;
    } else {
      digitMap[String.fromCharCode(65 + i - 10)] = i;
    }
  }

  const listCharToInts = [];
  for (const char of listCharacters) {
    listCharToInts.push(digitMap[char]);
  }

  let result = 0;
  let j = 0;
  while (j < listCharToInts.length) {
    const conv = listCharToInts[j] * (initialBase ** (listCharToInts.length - j - 1));
    result += conv;
    j += 1;
  }

  if (checkNegative) {
    result = result * -1;
  }

  return result;
}

function baseXtoY(initialBase, number, targetBase) {
  // to achieve the conversion from any base to another base, we could use the base x to 10 and base 10 to x functions
  // first u convert the number from its initial base to base 10, then u convert the base 10 int to the target base

  const initBase = initialBase;
  const origNumber = number;
  const targBase = targetBase;

  const origNumberToStr = String(origNumber);

  if (number === 0) {
    return 0;
  }

  if (initialBase === 10) {
    return base10toX(origNumber, targBase);
  }
  if (targetBase === 10) {
    return baseXto10(origNumberToStr, initBase);
  }

  const initBaseToBase10 = baseXto10(origNumberToStr, initBase);

  const base10ToTargBse = base10toX(initBaseToBase10, targBase);

  return base10ToTargBse;

  // const strNumber = String(number);
  // const numberList = [];

  // for (const nums of strNumber) {
  //   numberList.push(parseInt(nums, 10));
  // }

  // for (const digits of numberList) {
  //   // pass
  // }
}

//

const numberA = 406;
const initialBaseA = 7;
const targetBaseA = 16;

// console.log(base10toX(numberA, targetBaseA));
// console.log(baseXto10(numberA, initialBaseA));
console.log(baseXtoY(initialBaseA, numberA, targetBaseA));
