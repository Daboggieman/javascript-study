# 22: Exception Handling, Advanced

Lesson 16 covered basic `try`/`catch`. This lesson goes deeper: the full `try`/`catch`/`finally` structure, the error class hierarchy, catching multiple specific error types, and defining your own custom errors.

---

## 1. The Full Structure: `try` / `catch` / `finally`

JavaScript has **no `else` clause** — code that should run only on success simply goes at the end of the `try` block. `finally` behaves exactly like Python's:

```js
function divide(a, b) {
  let result;
  try {
    if (b === 0) throw new Error("Division by zero");  // JS never throws for 10 / 0 -- we must check!
    result = a / b;
    console.log("Division succeeded");   // "else": runs ONLY if no exception was thrown
    return result;
  } catch (err) {
    console.log("Cannot divide by zero!");
    return null;
  } finally {
    console.log("This always runs");       // runs no matter what -- exception or not
  }
}

console.log(divide(10, 2));
console.log(divide(10, 0));
```
```text
Division succeeded
This always runs
5
Cannot divide by zero!
This always runs
null
```

- Success-only code lives at the end of the `try` block (JavaScript's replacement for `else`).
- **`finally`** always runs, exception or not — the standard place for cleanup (closing files, releasing locks, disconnecting from a database).

---

## 2. Catching Multiple Error Types

A `try` block has **one** `catch`, so Python's separate `except ValueError:` / `except TypeError:` clauses become `instanceof` checks inside the catch:

```js
function safeConvert(value) {
  try {
    if (value === null || value === undefined) {
      throw new TypeError("Can't convert null/undefined to number");
    }
    const n = Number(value);
    if (Number.isNaN(n)) {
      throw new TypeError(`'${value}' isn't a valid number`);
    }
    return n;
  } catch (err) {
    if (err instanceof TypeError) {
      console.log(err.message);
    } else {
      throw err;  // not ours -- rethrow it
    }
  }
}

safeConvert("abc");     // 'abc' isn't a valid number
safeConvert(null);      // Can't convert null/undefined to number
```

**Important:** unlike Python's ordered `except` clauses, `instanceof` checks are just `if` chains — order still matters (check more *specific* types before more *general* ones), and rethrow anything you can't handle.

---

## 3. The Error Hierarchy

All built-in errors inherit from `Error`, the ancestor of almost everything you'll actually want to catch:

```
Error
 ├── TypeError            (e.g. calling something that isn't a function, null.foo)
 ├── RangeError           (e.g. bad array length, index out of range)
 ├── ReferenceError       (e.g. using an undeclared variable)
 ├── SyntaxError          (e.g. invalid JSON.parse input, bad syntax in eval)
 ├── EvalError, URIError  (rare)
 └── ...custom subclasses you define
```

**Callout**: This differs from Python's hierarchy — there's no `ZeroDivisionError` (JS returns `Infinity`), no `KeyError` (missing object keys give `undefined`), and no `FileNotFoundError` (missing files throw an `Error` whose `err.code` is `'ENOENT'`).

A bare `catch (err)` catches *everything*, including `Error` subclasses and even `null` thrown by hand. Catch narrowly (by `instanceof`) and rethrow what you can't handle — a catch-all that swallows every error is almost always a mistake, because it makes real bugs invisible.

---

## 4. Throwing Your Own Errors

```js
function withdraw(balance, amount) {
  if (amount > balance) {
    throw new Error(`Cannot withdraw ${amount}, balance is only ${balance}`);
  }
  return balance - amount;
}

try {
  withdraw(100, 500);
} catch (err) {
  console.log(err.message);   // Cannot withdraw 500, balance is only 100
}
```

**Callout**: Always `throw new Error(...)`, never `throw "some string"` — only real `Error` objects carry a stack trace.

---

## 5. Custom Error Classes

For larger programs, defining your own error types makes error handling much more precise and self-documenting:

```js
/** Raised when a withdrawal exceeds the available balance. */
class InsufficientFundsError extends Error {
  constructor(balance, amount) {
    super(`Cannot withdraw ${amount}, balance is only ${balance}`);
    this.name = "InsufficientFundsError";   // so err.name prints correctly
    this.balance = balance;
    this.amount = amount;
  }
}

function withdraw(balance, amount) {
  if (amount > balance) {
    throw new InsufficientFundsError(balance, amount);
  }
  return balance - amount;
}

try {
  withdraw(100, 500);
} catch (err) {
  if (err instanceof InsufficientFundsError) {
    console.log(`Error: ${err.message}`);
    console.log(`Shortfall: ${err.amount - err.balance}`);
  } else {
    throw err;
  }
}
```

Custom errors let calling code catch *your* specific error type separately from generic `Error`s elsewhere in a large program.

---

## 6. Re-throwing and Chaining Errors

```js
function processData(data) {
  try {
    const n = Number(data);
    if (Number.isNaN(n)) throw new TypeError("not a number");
    return n;
  } catch (err) {
    // The `cause` option preserves the original error -- the analog of `raise ... from e`
    throw new Error("Failed to process data", { cause: err });
  }
}

try {
  processData("abc");
} catch (err) {
  console.log(err.message);       // Failed to process data
  console.log(err.cause.message); // not a number
}
```

The `{ cause: err }` option keeps a clear "this error was caused by that earlier error" chain (`err.cause`), which is invaluable for debugging.

---

## 📚 Resources

- **MDN:** [Error handling — try...catch...finally](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)
- **MDN:** [Error — JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
- **Node docs:** [Error codes (e.g. ENOENT)](https://nodejs.org/api/errors.html)

---

## 🧠 Try It Yourself

1. Write `divide(a, b)` using the full `try`/`catch`/`finally` structure and confirm each block's behavior with both a successful and a failing call.
2. Write a function that catches `TypeError` and `RangeError` separately with different messages, then again using a single `catch` with `instanceof` checks.
3. Define a custom `InsufficientFundsError` error carrying `balance` and `amount` properties, and use it in a `withdraw()` function.
4. Use the `{ cause: err }` option to wrap a `TypeError` in a more general `Error` while preserving the original error chain, and print `err.cause` to see the chain.
