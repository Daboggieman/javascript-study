# Chapter 5: if Statements

> Reading notes for Eloquent JavaScript, Chapter 2 (Program Structure: Conditional Execution).

## Key Concepts

### Conditional Tests
A conditional test is an expression that evaluates to `true` or `false`. JavaScript uses boolean values (`true`, `false`) to decide whether the code in an `if` statement should be executed.

```js
const car = "subaru";
console.log(car === "subaru");  // true (strict equality operator)
console.log(car === "audi");    // false
console.log(car !== "audi");    // true (strict inequality operator)
```

- **Use `===`, never `==`**: `==` coerces types (`"5" == 5` is `true`, `0 == ""` is `true`) — a major source of bugs
- **Case sensitivity**: `"Audi" === "audi"` is `false`. Use `.toLowerCase()` for case-insensitive comparisons: `car.toLowerCase() === "audi"`.

### Comparison Operators
- `===` Strict equality
- `!==` Strict inequality
- `>` Greater than
- `<` Less than
- `>=` Greater than or equal to
- `<=` Less than or equal to

### Checking Multiple Conditions
- **`&&` (and)**: True only if *both* conditions are true.
- **`||` (or)**: True if *at least one* condition is true.

```js
const age0 = 22, age1 = 18;
console.log(age0 >= 21 && age1 >= 21);  // false
console.log(age0 >= 21 || age1 >= 21);  // true
```

### Checking Whether a Value Is in an Array
- **`.includes()`**: Check if a value exists in an array.

```js
const requestedToppings = ["mushrooms", "onions", "pineapple"];
console.log(requestedToppings.includes("mushrooms"));    // true
console.log(!requestedToppings.includes("pepperoni"));   // true
```

### The `if-else if-else` Chain
JavaScript executes only one block in an `if-else if-else` chain. It runs the first test that passes and skips the rest.

```js
const age = 12;
let price;
if (age < 4) {
  price = 0;
} else if (age < 18) {
  price = 25;
} else {
  price = 40;
}

console.log(`Your admission cost is $${price}.`);
```

- The `else if` blocks can be repeated as many times as needed.
- The `else` block is optional.

### Testing Multiple Conditions Individually
Sometimes you want to check all conditions. In this case, use multiple simple `if` statements instead of an `if-else if-else` chain.

```js
const requestedToppings = ["mushrooms", "extra cheese"];
if (requestedToppings.includes("mushrooms")) {
  console.log("Adding mushrooms.");
}
if (requestedToppings.includes("pepperoni")) {
  console.log("Adding pepperoni.");
}
if (requestedToppings.includes("extra cheese")) {
  console.log("Adding extra cheese.");
}
```

### Using `if` Statements with Arrays
- Check if an array is non-empty with `.length > 0` — **do not trust truthiness**: an empty array `[]` is *truthy* in JavaScript (unlike Python)!

```js
const requestedToppings = [];
if (requestedToppings.length > 0) {
  for (const topping of requestedToppings) {
    console.log(`Adding ${topping}.`);
  }
} else {
  console.log("Are you sure you want a plain pizza?");
}
```

## Common Pitfalls
- **Confusing `=` with `===`**: `=` is for assignment, `===` is for comparison
- **Using `==`**: type coercion makes `"0" == false` true — stick to `===`
- **Python-style truthiness**: `if (arr)` passes even when `arr` is empty — test `arr.length`
- **Logical flaws in chain order**: Place more specific conditions before general ones

## Try It Yourself
1. Create a conditional test for string equality, inequality, numbers, and multiple conditions using `&&`/`||`.
2. Write an `if-else if-else` chain that determines a person's stage of life based on their age variable.
3. Make an array of usernames, including "admin". Loop through the array and print greetings. If the username is "admin", print a special greeting. If the array is empty, print a message asking for users.
