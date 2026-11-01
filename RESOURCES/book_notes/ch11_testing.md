# Chapter 11: Testing Your Code

> Reading notes for the Node.js built-in test runner (`node:test`) — the standard-library analog of Python's `unittest`.

## Key Concepts

### Testing Functions
Node ships with a built-in testing framework: the `node:test` module, run with `node --test`. A **unit test** verifies that one specific aspect of a function's behavior is correct. A **test suite** is a collection of unit tests that together prove a function behaves as expected.

Let's assume we have a function in `name_function.js`:
```js
function getFormattedName(first, last) {
  const fullName = `${first} ${last}`;
  return fullName.toUpperCase();  // (no built-in title case in JS)
}

module.exports = { getFormattedName };
```

Here is a test suite in `test_name_function.js`:
```js
const { test } = require("node:test");
const assert = require("node:assert");
const { getFormattedName } = require("./name_function");

test("names like 'Janis Joplin' work", () => {
  const formattedName = getFormattedName("janis", "joplin");
  assert.strictEqual(formattedName, "JANIS JOPLIN");
});
```

Run it with:
```bash
node --test
```

- **`test()`**: Registers one unit test. Tests can also be grouped with `describe()` / `it()`.
- **`assert.strictEqual()`**: An assertion to check if the result matches the expected value (strict `===`).

### Common Assertion Methods
The `node:assert` module provides many assertions to verify conditions:
- `assert.strictEqual(a, b)` — Check if `a === b`
- `assert.notStrictEqual(a, b)` — Check if `a !== b`
- `assert.ok(x)` — Check if `x` is truthy
- `assert.deepStrictEqual(a, b)` — Check deep equality (arrays, objects)
- `assert.match(str, /regex/)` — Check a string against a regex
- `assert.throws(() => f(), Error)` — Verify that a block throws a specific error

### Testing Classes
Testing classes is similar to testing functions — you write tests to verify the behavior of class methods.

Assume we have a class `AnonymousSurvey` in `survey.js`:
```js
class AnonymousSurvey {
  constructor(question) {
    this.question = question;
    this.responses = [];
  }

  showQuestion() {
    console.log(this.question);
  }

  storeResponse(newResponse) {
    this.responses.push(newResponse);
  }
}

module.exports = { AnonymousSurvey };
```

Here is the test suite:
```js
const { describe, it } = require("node:test");
const assert = require("node:assert");
const { AnonymousSurvey } = require("./survey");

describe("AnonymousSurvey", () => {
  it("stores a single response properly", () => {
    const mySurvey = new AnonymousSurvey("What language did you first learn to speak?");
    mySurvey.storeResponse("English");
    assert.deepStrictEqual(mySurvey.responses, ["English"]);
  });
});
```

### Shared Setup Without a `setUp()` Method
There is no `setUp()` — each test creates its own data (or use a `beforeEach()` hook). Fresh objects per test keep tests independent:

```js
const { test, beforeEach } = require("node:test");

let mySurvey;
let responses;

beforeEach(() => {
  // Runs before every test — like Python's setUp()
  mySurvey = new AnonymousSurvey("What language did you first learn to speak?");
  responses = ["English", "Spanish", "Mandarin"];
});

test("stores a single response", () => {
  mySurvey.storeResponse(responses[0]);
  assert.ok(mySurvey.responses.includes(responses[0]));
});

test("stores three responses", () => {
  for (const response of responses) {
    mySurvey.storeResponse(response);
  }
  for (const response of responses) {
    assert.ok(mySurvey.responses.includes(response));
  }
});
```

## Common Pitfalls
- **Tests Not Discovered**: `node --test` only picks up files matching its naming pattern (`*.test.js`, `test.js`, files in a `test/` directory). Name your files accordingly.
- **Leaking State**: Tests should run independently. Avoid module-level mutable variables or persistent file modifications across tests without cleanup.
- **`deepStrictEqual` vs `strictEqual`**: `assert.strictEqual([1,2], [1,2])` fails — arrays compare by reference. Use `deepStrictEqual` for arrays and objects.
- **Overcomplicating Unit Tests**: Writing tests that check too many things at once. Keep tests focused and simple.

## Try It Yourself
1. Write a function that accepts a city and country and returns a single formatted string like `Santiago, Chile`. Write a test named `city country formatting` to verify it works.
2. Add a third optional parameter (e.g. population) and write a second test to verify it.
3. Write tests for an `Employee` class that initializes with first name, last name, and annual salary. Include a method `giveRaise()` and verify both default raises ($5000) and custom raises.
