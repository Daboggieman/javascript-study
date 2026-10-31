# Lecture 11: Testing

Testing is the process of verifying that your code performs as expected under different conditions. Node.js ships with a built-in test runner, the `node:test` module, to facilitate unit testing.

---

## 1. Why Test Code?
- **Prevents regressions**: Ensures new changes don't break existing functionality.
- **Validates assumptions**: Confirms the code handles edge cases, bad inputs, and normal cases correctly.
- **Improves design**: Writing tests forces you to design modular, clean functions.

---

## 2. Writing a Simple Unit Test
A unit test verifies that a single, specific aspect of a function's behavior is correct.

Let's say you have a function in `nameFormatter.js`:
```js
// nameFormatter.js
function getFormattedName(first, last) {
  const full = `${first} ${last}`;
  return full
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

module.exports = { getFormattedName };
```

You can write a test for this function with the `test` function from `node:test` and the `assert` module:
```js
// nameFormatter.test.js
const test = require("node:test");
const assert = require("node:assert");
const { getFormattedName } = require("./nameFormatter");

test("first and last name", () => {
  // Do names like 'Janis Joplin' work?
  const formattedName = getFormattedName("janis", "joplin");
  assert.strictEqual(formattedName, "Janis Joplin");
});
```

- **Running the Test**: Run the test runner: `node --test`. It automatically discovers files named `*.test.js` (or files that use `node:test`). You can also run a single file directly: `node nameFormatter.test.js`.
- **Test Functions**: Every `test(...)` call is run automatically, in order.

---

## 3. Common Assertion Methods
Assertions verify that a condition evaluates to the expected result.

| Python (unittest) | JavaScript (node:assert) | Checks |
|-------------------|--------------------------|--------|
| `assertEqual(a, b)` | `assert.strictEqual(a, b)` | `a === b` |
| `assertNotEqual(a, b)` | `assert.notStrictEqual(a, b)` | `a !== b` |
| `assertTrue(x)` | `assert.ok(x)` | `x` is truthy |
| `assertFalse(x)` | `assert.ok(!x)` | `x` is falsy |
| `assertIn(item, list)` | `assert.ok(list.includes(item))` | `item` is in the array |
| `assertNotIn(item, list)` | `assert.ok(!list.includes(item))` | `item` is not in the array |
| `assertRaises(Error)` | `assert.throws(() => code(), Error)` | Code throws `Error` |

---

## 4. Shared Setup with `beforeEach`
When testing a class, you often create the same instances and resources in every test. The `beforeEach` hook runs **before each test**, allowing you to create resources once and access them via a shared variable.

```js
let survey;
let responses;

test.beforeEach(() => {
  // Create survey and responses once for all tests.
  survey = new AnonymousSurvey("What is your favorite language?");
  responses = ["JavaScript", "Go", "Python"];
});

test("single response", () => {
  survey.storeResponse(responses[0]);
  assert.ok(survey.responses.includes(responses[0]));
});
```

---

## 🧠 Try It Yourself
1. Write a function that accepts city and country, returning a formatted string. Write a test using `node:test` to verify it.
2. Introduce a bug deliberately in the function (e.g., skip capitalizing the name) and run `node --test` to observe the failure.
