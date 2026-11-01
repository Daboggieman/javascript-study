# OOP 02: The `constructor` Method — A Manual Walkthrough

**Prerequisite:** Lesson 01 (classes, objects, attributes, `this`).
**By the end you will be able to:** guarantee every object is born complete, use default parameter values safely, and explain exactly what `new ClassName(...)` does step by step.

---

## Part 0 — The Problem Left Over From Lesson 01

Lesson 01 ended on an unsolved gap (Part 2.4 of that lecture). Here it is again:

```js
class Dog {}

const rex = new Dog();
rex.name = "Rex";
// ...and we forgot rex.age
```

Nothing stops this. The `Dog` exists, it's just **half-built**, and you won't find out until something reaches for the missing piece:

```text
undefined
```

In Python this crashes with `AttributeError`, but — as Lesson 01 Part 2.4 showed — JS reads a missing property as `undefined` with no error at all. So the failure is even quieter here: the half-built dog sits around, silently, until a value goes missing where you least expect it.

Also notice the busywork — three lines to make one dog, every single time:

```js
const rex = new Dog();
rex.name = "Rex";
rex.age = 3;
```

> **The core insight:** object creation and attribute setup should be **one single step** that cannot be half-done. If setting up the data is part of building the object, there is no window in which an incomplete object can exist.

The `constructor` method is how JS does exactly that.

---

## Part 1 — The `constructor` Runs Automatically

### 1.1 The mechanics

```js
class Dog {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

const rex = new Dog("Rex", 3);   // one line, fully built
console.log(rex.name, rex.age);  // Rex 3
```

Three things changed from Lesson 01:

1. `new Dog()` became `new Dog("Rex", 3)` — the values now go in at creation.
2. A method named `constructor` receives them.
3. `constructor` copies them onto the object with `this.`.

The name is special: `constructor` is the built-in hook for **"a new object was just made."** When you use `new`, this method runs automatically. You write it once, per class, and it sets the object up.

### 1.2 The line that confuses everyone

```js
this.name = name;
```

Left and right are **not** the same thing, despite looking almost identical:

| Side | What it is | Lives where |
|---|---|---|
| `this.name` | an **attribute** on the object | survives after the constructor ends |
| `name` | the **parameter** that was passed in | a local variable, discarded when the constructor ends |

So the line means: *"take the value that arrived in the parameter `name`, and store it permanently on this object under the attribute `name`."* You are copying from a temporary local into permanent storage.

They don't have to share a name — this is identical in behaviour, just uglier:

```js
constructor(n, a) {
  this.name = n;         // attribute `name` from parameter `n`
  this.age = a;
}
```

Same-naming is the universal convention, but understanding that they're two different things is what stops `this.` from feeling arbitrary.

### 1.3 State trace

For `new Dog("Rex", 3)`:

| Step | What happens | `rex` holds |
|---|---|---|
| 1 | A blank `Dog` object is created | *(nothing)* |
| 2 | `constructor` is called with `this`=that object, `name`="Rex", `age`=3 | *(nothing yet)* |
| 3 | `this.name = name` runs | `name → "Rex"` |
| 4 | `this.age = age` runs | `name → "Rex"`, `age → 3` |
| 5 | the constructor finishes; the object is handed to you | `name → "Rex"`, `age → 3` |

At no point does a caller ever see a half-built dog. That's the whole win.

---

## Part 2 — What `new Dog("Rex", 3)` Actually Does

Written out in full, `new Dog("Rex", 3)` is three steps:

1. **Create** a new blank `Dog` object.
2. **Call** `Dog`'s constructor with that object as `this` and `("Rex", 3)` as the arguments — the new object arrives as `this`, exactly the mechanism from Lesson 01 Part 3.3.
3. **Return** the now-initialised object to you.

```js
const rex = new Dog("Rex", 3);
// roughly equivalent to:
//   rex = <a new blank Dog>
//   Dog's constructor runs with this = rex and (name="Rex", age=3)
//   (hand rex back)
```

Two consequences worth internalising:

- **You never call the constructor yourself.** `new Dog(...)` calls it for you. Writing `rex.constructor()` later is either an error (see Part 7, question 4) or re-initialises something you didn't mean to touch.
- **The constructor's job is to *modify* `this`, not to produce a value.** In JS a `return` is technically allowed, but: returning a *primitive* (`return 42`) is silently ignored, and returning an *object* replaces the object you were building. Both are things real code doesn't do. Just don't `return` from a constructor.

---

## Part 3 — Incomplete Objects Are Now (Mostly) Impossible

This is the payoff — with an honest JS caveat. Try to make a half-built dog now:

```js
class Dog {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

const rex = new Dog("Rex");   // forgot the age
console.log(rex.age);         // undefined
```

Where Python raises `TypeError: Dog.__init__() missing 1 required positional argument: 'age'` right at the creation line, JS **does not complain**. Missing arguments just arrive as `undefined`, so `age = undefined` and `rex.age` is `undefined` — silent again.

To get Python's guarantee back, you give the constructor either a **default** or an explicit **check**:

```js
class Dog {
  constructor(name, age = 0) {      // default: age is now optional safely
    this.name = name;
    this.age = age;
  }
}

const rex = new Dog("Rex");
console.log(rex.age);               // 0 -- not undefined
```

…or, if "every dog must have an age" is the rule, make the constructor throw:

```js
class Dog {
  constructor(name, age) {
    if (age === undefined) {
      throw new Error("Dog needs an age");
    }
    this.name = name;
    this.age = age;
  }
}

const rex = new Dog("Rex");   // Error: Dog needs an age -- fails at creation
```

Compare the two approaches to Lesson 01:

| | Lesson 01 approach | With a checked constructor |
|---|---|---|
| **When you find out** | Later, whenever something reads `.age` | Immediately, at the creation line |
| **What you hear** | silent `undefined` | an `Error` right at the line that built it wrong |
| **Can a broken object exist?** | Yes, and it circulates | No — creation fails outright |

That third row is the real prize. The error now points at the line you need to fix.

---

## Part 4 — Default Parameter Values

### 4.1 The basics

The constructor is an ordinary function, so it takes defaults like any other:

```js
class Dog {
  constructor(name, age = 0, breed = "Unknown") {
    this.name = name;
    this.age = age;
    this.breed = breed;
  }
}

const d1 = new Dog("Rex");                       // age=0,  breed="Unknown"
const d2 = new Dog("Fido", 2, "Labrador");       // all three given
const d3 = new Dog("Buddy", 0, "Poodle");        // must plug 0 for `age`...
```

| Call | `name` | `age` | `breed` |
|---|---|---|---|
| `new Dog("Rex")` | `"Rex"` | `0` | `"Unknown"` |
| `new Dog("Fido", 2, "Labrador")` | `"Fido"` | `2` | `"Labrador"` |
| `new Dog("Buddy", 0, "Poodle")` | `"Buddy"` | `0` | `"Poodle"` |

> **JS callout — there are no keyword arguments in JS.** Python lets you write `Dog("Buddy", breed="Poodle")` and skip `age` by name. JS has no such syntax: arguments are matched purely by position, so to skip a middle parameter you must pass a placeholder (`0` here) — or switch to an options object:

```js
class Dog {
  constructor(name, { age = 0, breed = "Unknown" } = {}) {
    this.name = name;
    this.age = age;
    this.breed = breed;
  }
}

const d3 = new Dog("Buddy", { breed: "Poodle" });   // age defaults, breed set
```

This options-object pattern is the closest JS idiom to keyword arguments, and you'll see it everywhere in real code.

Ordering: keep parameters **with** defaults after parameters **without** them. Unlike Python (which errors), JS *will* accept `constructor(age = 0, name)`, but the call-site stays unreadable — so follow the same rule by convention.

### 4.2 The mutable default trap — a Python classic that CANNOT bite you in JS

This is the single most notorious bug in Python, and it bites hardest in `__init__`. It looks completely reasonable:

```python
class Dog:
    def __init__(self, name, tricks=[]):     # <-- BUG in Python
        self.name = name
        self.tricks = tricks
```

In Python, `[]` is evaluated **once** when the `def` line runs, so every `Dog` shares the *same* list — teach one dog to sit and every dog knows it.

**In JS this cannot happen.** Default parameter expressions are evaluated **fresh, on every single call**:

```js
class Dog {
  constructor(name, tricks = []) {   // perfectly safe in JS
    this.name = name;
    this.tricks = tricks;
  }
}

const rex  = new Dog("Rex");
const fido = new Dog("Fido");

rex.tricks.push("sit");

console.log(rex.tricks);   // ["sit"]
console.log(fido.tricks);  // []        <-- Fido did NOT learn it
console.log(rex.tricks === fido.tricks);   // false -- separate arrays
```

Each call builds a brand-new array. That's the whole trap, defused.

**The JS version of the bug** appears only when the default refers to a *shared* object rather than a fresh expression:

```js
const SHARED_TRICKS = [];      // one array, created at module load

class Dog {
  constructor(name, tricks = SHARED_TRICKS) {   // <-- BUG: shared reference
    this.name = name;
    this.tricks = tricks;
  }
}

const rex  = new Dog("Rex");
const fido = new Dog("Fido");
rex.tricks.push("sit");
console.log(fido.tricks);      // ["sit"] -- shared again!
```

**The rule:** a default must be a *fresh expression* (`= []`, `= {}`, `= new Map()`), never a reference to a shared mutable value. Defaults to primitives (`0`, `""`, `null`, `true`) are always safe.

---

## Part 5 — The Constructor Is the Whole Story

Python splits object setup into two methods: `__new__` (creates the blank object) and `__init__` (initialises the one that already exists) — which is why Python's method is named `__init__`, and why it mustn't return anything: it never made the object.

JS has **no such split**. `new` both creates the blank object *and* runs your `constructor` on it. There is no second lifecycle hook to know about, and no reason for the constructor to return anything (Part 2).

| | Python | JS |
|---|---|---|
| Creates the blank object | `__new__` (rarely written) | `new` does it |
| Initialises it | `__init__` (always written) | `constructor` (always written) |

That's why the JS method is called `constructor` — it genuinely does the constructing.

---

## Part 6 — The `this.`-Forgetting Pitfall, Done Properly

Forgetting `self` is the most common `__init__` error in Python, with **two** failure modes: a loud `TypeError` when the argument count doesn't line up, and — worse — silent corruption when it does. JS has no `self` parameter to forget, and no argument-count errors at all. But the *silent* failure has a direct JS twin: forgetting the `this.`.

```js
class Dog {
  constructor(name, age) {
    name = name;     // assigns the *parameter* to itself -- nothing stored!
    age = age;
  }
}

const rex = new Dog("Rex", 3);
console.log(rex.name);   // undefined -- no error, silently empty object
```

Every line "works" and nothing is stored. `name = name` just throws the value away. Storage *requires* `this.`.

**The rule:** every attribute a constructor wants to keep must be written as `this.something = ...`. No exceptions in this whole module.

---

## Part 7 — Predict, Then Run

Write your predicted output next to each one *before* running it.

1. ```js
   class Dog {
     constructor(name) {
       this.name = name;
       return 42;            // <-- primitive return: ignored or not?
     }
   }
   const d = new Dog("Rex");
   console.log(d.name);
   ```

2. ```js
   const SHARED = {};
   class Counter {
     constructor(items = SHARED) {
       this.items = items;
     }
   }
   const a = new Counter();
   const b = new Counter();
   a.items.x = 1;
   console.log(b.items);
   ```

3. ```js
   class Dog {
     constructor({ name, age = 0 }) {   // options-object pattern
       this.name = name;
       this.age = age;
     }
   }
   const d = new Dog({ age: 5, name: "Rex" });   // property order irrelevant
   console.log(d.name, d.age);
   ```

4. ```js
   class Dog {
     constructor(name) {
       this.name = name;
     }
   }
   const d = new Dog("Rex");
   d.constructor("Fido");   // <-- call the constructor "by hand"?
   console.log(d.name);
   ```

<details>
<summary>Answers (predict first)</summary>

1. `Rex`. Returning a *primitive* from a constructor is ignored — the freshly built object is used. (Returning an *object* would replace it; both are things real code doesn't do.)
2. `{ x: 1 }`. The shared-reference trap from Part 4.2: the default is a module-level object, so every `Counter` shares it.
3. `Rex 5`. The options-object pattern is JS's version of keyword arguments — properties are matched by name, so order is irrelevant.
4. `TypeError: Class constructor Dog cannot be invoked without 'new'`. JS forbids calling a class constructor as a plain function. There is no "re-run the setup on an existing object" move like Python's `d.__init__("Fido")`.

</details>

---

## Part 8 — Cheat Sheet Summary

```js
class Dog {
  constructor(name, age = 0, tricks = []) {   // this is `self`; defaults last
    this.name = name;                          // attribute <- parameter
    this.age = age;
    this.tricks = tricks;                      // fresh default per call
  }
}

const rex = new Dog("Rex", 3);   // constructor runs automatically; never call it yourself
```

| Idea | One-line version |
|---|---|
| What the constructor is for | Setting up an object's starting attributes, automatically |
| When it runs | Automatically, as part of `new ClassName(...)` |
| `this.name = name` | Copy the temporary parameter into permanent object storage |
| `new ClassName(...)` does | create blank object → run constructor on it → return it |
| Must it return? | No — a primitive return is ignored, an object return replaces the instance |
| Missing an argument | JS keeps quiet (`undefined`). Default it, or throw in the constructor |
| Defaults | Fresh per call — `= []` is safe in JS; watch out for shared references instead |
| No keyword args | Use an options object: `new Dog("Rex", { breed: "Poodle" })` |
| Forgetting `this.` | Silent: the value is thrown away and the object stays empty |

---

## Self-Check

- [ ] Why does the constructor help with the silent-`undefined` problem from Lesson 01?
- [ ] In `this.name = name`, what is each side, and which one survives the constructor call?
- [ ] Name the three steps `new Dog("Rex", 3)` performs.
- [ ] Is `constructor(name, tricks = [])` a bug in JS? What's the JS-only twist that makes shared state happen anyway?
- [ ] What does JS do (or not do) when you forget to pass an argument the constructor wants?
- [ ] Why are there no keyword arguments in JS, and what's the idiomatic replacement?

---

## 📚 Resources

- **MDN:** [Classes — the `constructor`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor)
- **MDN:** [Default parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters) — pairs with Part 4
- **MDN:** [The `new` operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new) — what Part 2 describes, formally
- **Eloquent JavaScript:** [Chapter 6 — The Secret Life of Objects](https://eloquentjavascript.net/06_object.html)

---

## 🧠 Try It Yourself

Open `exercises.js` in this folder:

1. Rewrite `Car` with `constructor(make, model, year = 2024, mileage = 0)` and build two cars in one line each (Part 1.1, 4.1).
2. Create a car without a year to confirm the default applies (Part 4.1).
3. Add `drive(miles)` that adds to `this.mileage`; call it twice and print the running total (Part 1.2).
4. Try `new Car("Toyota")` and note the *silent* `undefined` — then rewrite the constructor to throw when a required arg is missing (Part 3).
5. Give `Car` a `repairs` parameter that defaults to a fresh empty array per car. Prove two cars don't share it with `car1.repairs === car2.repairs` → `false`. Then uncomment a module-level `SHARED` array and use it as the default — and watch the bug appear (Part 4.2).
