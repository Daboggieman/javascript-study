# OOP 03: The `this` Parameter — A Manual Walkthrough

**Prerequisite:** Lessons 01–02.
**By the end you will be able to:** use `this` to read and write an object's data, call one method from another, work with two objects of the same class in a single method, and recognise the two `this`-related bugs that silently do nothing.

---

## Part 0 — What You Already Know, and What's Left

Lesson 01 Part 3.2 already answered *what* `this` is:

> **`this` is the object the method was called on** — an implicit first parameter set by the dot.

Nothing about that is going to change. This lesson is about *using* it, and about the specific ways people get it wrong. If the sentence above still feels shaky, re-read Lesson 01 Part 3.2–3.4 before continuing — everything here builds on it.

---

## Part 1 — `this` Is Set by the Call, Not Carried in the Reference

### 1.1 The equivalence, once more

```js
class Dog {
  constructor(name) {
    this.name = name;
  }
  bark() {
    console.log(`${this.name} says Woof!`);
  }
}

const rex = new Dog("Rex");

rex.bark();                         // Rex says Woof!
Dog.prototype.bark.call(rex);       // Rex says Woof!   -- identical
```

`rex.bark()` is shorthand for `Dog.prototype.bark.call(rex)`.

### 1.2 Proof: look at what the dot actually produces

Print the method **without calling it** — leave the parentheses off:

```js
console.log(Dog.prototype.bark);    // [Function: bark]
console.log(rex.bark);              // [Function: bark]  -- SAME function
console.log(Dog.prototype.bark === rex.bark);   // true
```

This is the critical difference from Python. In Python, `Dog.bark` and `rex.bark` are **different objects** — the second is a new bound-method wrapper. In JS, they are the *same function*. What the dot does is remember that when *this function* runs, `this` should be `rex`.

So you can grab the method and carry it around — but unlike Python, the binding *stays* as long as you call through the object:

```js
const f = rex.bark;    // no call yet -- just grabbing the reference
f();                    // TypeError: Cannot read properties of undefined (reading 'name')
                        // `this` is now undefined -- the binding was in the CALL, not the reference
```

Python's bound method carries the object *inside the wrapper*, so `f()` still has `this = rex`. JS's method is just a function; `this` is set by *how you call it*. Calling `f()` bare gives `this = undefined`.

**That** is what `this` is: not a thing stored in the method, but a thing supplied by the call site. The dot remembers the binding only for the next immediate call.

---

## Part 2 — Reading and Writing Attributes Through `this`

### 2.1 Reading

```js
class Account {
  constructor(owner, balance = 0) {
    this.owner = owner;
    this.balance = balance;
  }

  show() {
    console.log(`${this.owner}'s balance: ${this.balance}`);
  }
}
```

Any method needing this object's data goes through `this.`.

### 2.2 Writing

```js
deposit(amount) {
  this.balance = this.balance + amount;
}
```

Both halves matter, and they do different jobs:

| Part | Direction | Meaning |
|---|---|---|
| `this.balance` on the right | **read** | fetch the current stored value |
| `this.balance` on the left | **write** | store the new value back onto the object |

Drop either `this.` and it breaks. Which brings us to the two bugs.

### 2.3 Bug 1 — the loud one: `ReferenceError`

```js
deposit(amount) {
  balance = balance + amount;      // both `this.` omitted
}
```

In strict mode (`'use strict'` or a class body), this throws `ReferenceError: balance is not defined` — because you assigned to a bare name, and JS doesn't know what `balance` is. (In sloppy mode it would silently create a global — even worse.) The fix: use `this.balance` on both sides.

### 2.4 Bug 2 — the silent one, and the nastier of the two

```js
deposit(amount) {
  balance = this.balance + amount;     // reads correctly, stores nowhere
}
```

```js
const a = new Account("Alice", 100);
a.deposit(50);
console.log(a.balance);      // 100   <-- the deposit vanished
```

**No error at all.** The right-hand side read `this.balance` correctly and computed `150`. But the result went into a local variable named `balance`, which is discarded the instant `deposit` returns. The object was never touched.

This is the bug to fear. It doesn't crash, it doesn't warn, and the money quietly disappears.

> **The rule:** to change an object, the thing on the **left of the `=`** must start with `this.`. A bare name on the left either creates a throwaway local or — in strict mode — throws.

---

## Part 3 — Calling One Method From Another

`this` is your handle on this object, so it's also how a method calls the object's *other* methods:

```js
class Account {
  constructor(owner, balance = 0) {
    this.owner = owner;
    this.balance = balance;
  }

  deposit(amount) {
    this.balance += amount;
    this.show();              // call another method on the same object
  }

  show() {
    console.log(`${this.owner}'s balance: ${this.balance}`);
  }
}
```

Note it's `this.show()`, not `show()`. A bare `show()` looks for a plain function `show` at module level (or throws a `ReferenceError` if none exists). Methods are not automatically in scope inside other methods — you always reach them through `this`.

| You write | JS looks for |
|---|---|
| `this.show()` | a method `show` on this object's class ✔ |
| `show()` | a plain function `show` at module level ✘ `ReferenceError` |

---

## Part 4 — `this` Is Not Optional in JS — But Named however you like

In Python, `self` is just a convention: the first parameter receives the object, whatever you call it. JavaScript also has no reserved word — you can name the parameter anything:

```js
class Dog {
  bark(banana) {                   // perfectly legal
    console.log(`${banana.name} says Woof!`);
  }
}
```

Both run. But every JS codebase, tutorial, error message, and colleague on Earth says `this` — so deviating buys nothing and costs readability.

> **JS callout:** unlike Python, you can't "forget to declare `this` as a parameter" in JS — it's not a parameter at all. `this` is a *keyword* (well, a reserved binding) that is always available inside a class body. You write `this`, not `this(banana)`. Forgetting `this.` on an attribute is the direct JS twin of Python's "forgot self.".

---

## Part 5 — Two Objects of the Same Class, One Method

Here's where `this` stops being obvious. A method can take **another object of its own class** as a normal parameter:

```js
class Account {
  constructor(owner, balance = 0) {
    this.owner = owner;
    this.balance = balance;
  }

  deposit(amount) {
    this.balance += amount;
  }

  withdraw(amount) {
    if (amount > this.balance) {
      return "Insufficient funds";
    }
    this.balance -= amount;
  }

  transfer(other, amount) {
    if (this.withdraw(amount) === "Insufficient funds") {
      return "Insufficient funds";
    }
    other.deposit(amount);          // `other` is a whole separate Account
  }

  show() {
    console.log(`${this.owner}: ${this.balance}`);
  }
}
```

```js
const alice = new Account("Alice", 100);
const bob   = new Account("Bob", 50);

alice.transfer(bob, 30);
alice.show();      // Alice: 70
bob.show();        // Bob: 80
```

Inside that one `transfer` call:

| Name | Refers to | How it got there |
|---|---|---|
| `this` | the `alice` object | supplied by the dot in `alice.transfer(...)` |
| `other` | the `bob` object | passed explicitly as an argument |

Both are `Account` objects. Both have `.balance`. The *only* difference is how they arrived. `this` isn't special because of what it holds — it's special because of **where it comes from**.

This is also why `transfer` can call `this.withdraw(amount)` and `other.deposit(amount)` in the same breath: two objects, same class, same methods available on each.

---

## Part 6 — When There Is No `this`

Every method so far has used `this`, because every method so far needed *one specific object's* data. But some methods genuinely don't:

```js
class Dog {
  isValidAge(age) {     // doesn't need any dog at all -- just checks a number
    return age >= 0 && age <= 30;
  }
}
```

Written like that it still works when called as `someDog.isValidAge(5)` — JS is lenient: the method runs with `this` set and unpolluted arguments. But it's a smell: a method that never uses `this` is really a function living on the wrong shelf.

JS offers proper tools for methods that need no instance (`static` methods), which is **Lesson 05**. For now, the takeaway: `this` is used in every method that touches one object's data, which is the vast majority — and there's a documented mechanism for the exceptions.

---

## Part 7 — Predict, Then Run

Write your predicted output next to each one *before* running it.

1. ```js
   'use strict';
   class Counter {
     constructor() { this.n = 0; }
     bump() { n = this.n + 1; }
   }
   const c = new Counter();
   c.bump();
   console.log(c.n);
   ```

2. ```js
   class Dog {
     constructor(name) { this.name = name; }
     rename(newName) { this.name = newName; }
     shout() { console.log(this.name.toUpperCase()); }
   }
   const a = new Dog("Rex");
   const b = a;                 // no second new Dog()
   b.rename("Fido");
   a.shout();
   ```

3. ```js
   class Dog {
     constructor(name) { this.name = name; }
     bark() { console.log(`${this.name}!`); }
   }
   const rex = new Dog("Rex");
   Dog.prototype.bark.call("not a dog");
   ```

4. ```js
   class Greeter {
     hello() { console.log("hi"); }
     twice() { hello(); hello(); }
   }
   new Greeter().twice();
   ```

<details>
<summary>Answers (predict first)</summary>

1. `ReferenceError: n is not defined`. In strict mode, the bare `n = ...` has no declaration to fall back on — it can't be a local (nothing declares it) and strict mode forbids inventing a global. Needed `this.n = this.n + 1` (that's Part 2.3).
2. `FIDO`. `const b = a` copied the reference, not the object (Lesson 01 Part 6.1) — `a` and `b` are one dog, so renaming via `b` is visible via `a`.
3. `TypeError: Cannot read properties of undefined (reading 'name')`. `Dog.prototype.bark` is a plain function (Part 1.2), and `.call("not a dog")` sets `this` to a string; a string has no... actually a primitive `this` gets boxed — but either way, when the body reaches `this.name` there's nothing object-like with a `name`. The call itself succeeds; it only fails inside the body.
4. `ReferenceError: hello is not defined` — Part 3. Methods aren't in scope inside other methods; the fix is `this.hello()`.

</details>

---

## Part 8 — Cheat Sheet Summary

```js
class Account {
  constructor(owner, balance = 0) {
    this.owner = owner;                     // write via this.
    this.balance = balance;
  }

  deposit(amount) {
    this.balance = this.balance + amount;   // read AND write via this.
    this.show();                            // call sibling method via this.
  }

  transfer(other, amount) {                 // `other` = another Account
    this.withdraw(amount);
    other.deposit(amount);
  }

  show() {
    console.log(`${this.owner}: ${this.balance}`);
  }
}
```

| Idea | One-line version |
|---|---|
| What `this` is | The object the method was called on |
| Who supplies it | The call: `rex.bark()` → `this` = `rex` |
| `Dog.prototype.bark` vs `rex.bark` | The *same* function; `this` is decided at call time |
| Read an attribute | `this.balance` |
| Write an attribute | `this.balance = ...` — **left side must have `this.`** |
| Bare name on the left | Throwaway local, or `ReferenceError` under strict mode |
| Call a sibling method | `this.show()`, never `show()` |
| Is `this` a keyword? | Yes in effect — it's the reserved object reference; always write `this.` |
| Another object of the same class | Just a normal parameter; `this` is only special in *how it arrives* |
| Methods needing no object | `static` — Lesson 05 |

---

## Self-Check

- [ ] What's the difference between `Dog.prototype.bark` and `rex.bark`, and how does that differ from Python's bound methods?
- [ ] Why does `const f = rex.bark; f()` throw, while Python's `f = rex.bark; f()` works — what's bound to the *call* rather than the *reference*?
- [ ] Give the two bugs from omitting `this.`, and which one is more dangerous.
- [ ] Why is `show()` inside a method a `ReferenceError` when `this.show()` works?
- [ ] In `transfer(other, amount)`, what actually distinguishes `this` from `other`?
- [ ] Is `this` a parameter you can forget to declare, like Python's `self`?

---

## 📚 Resources

- **MDN:** [Object-oriented JavaScript — `this`](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_programming)
- **MDN:** [The `this` keyword](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this) — pairs directly with Part 1.2
- **Net Ninja:** [Modern JavaScript Tutorial — classes and `this`](https://www.youtube.com/playlist?list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU)
- **Eloquent JavaScript:** [Chapter 6 — The Secret Life of Objects](https://eloquentjavascript.net/06_object.html)

---

## 🧠 Try It Yourself

Open `exercises.js` in this folder:

1. Implement `deposit`, `withdraw`, and `printBalance` on `BankAccount`, using `this` to read and write `this.balance` (Part 2).
2. Deliberately write `balance = this.balance + amount` in `deposit`, run it, and confirm the balance doesn't change. Then fix it and note in a comment why nothing errored (Part 2.4).
3. Make `deposit` call `this.printBalance()` at the end. Then try it as bare `printBalance()` and read the `ReferenceError` (Part 3).
4. Implement `transfer(otherAccount, amount)` that withdraws from `this` and deposits into `otherAccount` — note that both are `BankAccount` objects in the same method (Part 5).
5. Print `BankAccount.prototype.deposit` and `acc1.deposit` without calling them, and confirm they're the same function (Part 1.2).
