# OOP 05: Class Methods and Static Methods — A Manual Walkthrough

**Prerequisite:** Lessons 01–04 (especially class attributes, Lesson 04 Part 2).
**By the end you will be able to:** write alternative constructors with `static` methods, group helper functions with `static`, explain why calling through the class beats hardcoding the class name, and predict which of the three method types a given call needs.

---

## Part 0 — Two Things Instance Methods Can't Do

Every method so far used `this`, because every method so far needed one specific object's data. Two ordinary requirements break that pattern.

### 0.1 "Build me a Dog, but from a birth year"

The constructor takes an age. But your data source gives you birth years. You could make callers do the arithmetic:

```js
const rex = new Dog("Rex", 2026 - 2022);      // every caller repeats this
```

That's the conversion logic scattered across every call site. You want a **second way to build a Dog** that lives on the class:

```js
const rex = Dog.fromBirthYear("Rex", 2022);
```

Note what's being called: `Dog.fromBirthYear(...)`. There is **no dog yet** — the whole point is to make one. So there's no object to be `this`. An instance method is structurally the wrong tool.

### 0.2 "Is this a plausible age?"

```js
function isValidAge(age) {
  return age >= 0 && age <= 30;
}
```

This clearly belongs *with* `Dog` — it encodes a fact about dogs. But it needs no dog and no class data; it just checks a number. Putting it at module level works but scatters dog-related logic outside the class.

> **The core insight:** in Python, a method's first parameter tells you what it needs — `self` = one object, `cls` = the class, neither = a static method. JS collapses `cls` and `self`-less needs into the `static` keyword: a static method is called on the class itself, never on an instance.

---

## Part 1 — Instance Methods (Recap)

```js
class Dog {
  constructor(name) {
    this.name = name;
  }

  bark() {              // needs ONE dog
    console.log(`${this.name} says Woof!`);
  }
}
```

Instance methods need an object, and JS enforces it — but *differently* than Python. Calling `Dog.bark()` is a plain `TypeError: Dog.bark is not a function`:

```js
Dog.bark();
```
```text
TypeError: Dog.bark is not a function
```

Python says `missing 1 required positional argument: 'self'` because it treats `self` as a real parameter that the binding didn't supply. JS has no such message because a method's `this` is bound by *calling it on an object* — and `Dog.bark()` has no object in front, so there's no method to call, just an undefined property.

---

## Part 2 — `static` Methods: Called on the Class

### 2.1 Public static fields, and when to use `static`

```js
class Dog {
  static population = 0;

  constructor(name, age) {
    this.name = name;
    this.age = age;
    Dog.population += 1;
  }

  static getPopulation() {
    return Dog.population;
  }
}
```

| Parameter | Receives | Convention |
|---|---|---|
| `this` in an instance method | the **object** it was called on | instance methods |
| `this` in a `static` method | the **class** it was called on | class methods |

A `static` method is called *on the class* (`Dog.getPopulation()`), not on an object. Inside it, `Dog.population` is the same shared counter you built in Lesson 04 Part 2.4 — you could write `this.population` (inside a static method `this` is the class on the left of the dot) but `Dog.population` is the clearer habit.

### 2.2 The killer use case: alternative constructors

This solves Part 0.1:

```js
class Dog {
  static population = 0;

  constructor(name, age) {
    this.name = name;
    this.age = age;
    Dog.population += 1;
  }

  static fromBirthYear(name, birthYear, currentYear = 2026) {
    const age = currentYear - birthYear;
    return new Dog(name, age);           // builds a Dog via the constructor
  }
}

const rex = Dog.fromBirthYear("Rex", 2022);
console.log(rex.age);                  // 4
console.log(Dog.getPopulation());     // 1
```

Trace it: `fromBirthYear` computes `age` then calls `new Dog(name, age)` — which runs the constructor normally and returns a finished dog. The method **returns** the new object, unlike the constructor which must take and prepare `this`.

You now have two doors into the same class:

| Call | Takes | Use when |
|---|---|---|
| `new Dog("Rex", 4)` | an age | you already have an age |
| `Dog.fromBirthYear("Rex", 2022)` | a birth year | your data has birth years |

Both end up running the constructor, so there's exactly one place where a `Dog`'s attributes are actually set. The alternative constructor only converts its inputs and delegates.

> **A note on that `currentYear=2026` default:** it's a hardcoded value that will be wrong next year — a *rotting default*. It's fine for this exercise, but real code would compute `new Date().getFullYear()` **inside** the body (not as the default, which would freeze at class-creation time — the same evaluate-once trap as Lesson 02 Part 4.2, except JS evaluates defaults fresh per call so this is less of a trap — see the callout in 4.2 of Lesson 02).

### 2.3 Why call the class instead of hardcoding `Dog(...)`?

Inside `fromBirthYear`, `Dog.` is explicit. On the surface, `Dog(name, age)` no different from writing `new Dog(name, age)` — but there's a subtle inheritance thing happening.

**With the class deducible from the static context (`this` in the static method):**

```js
class Puppy extends Dog {}

const p = Puppy.fromBirthYear("Bit", 2025);   // if you used `this` inside...
console.log(p.constructor.name);              // Puppy  ✔ correct
```

**With `Dog(...)` hardcoded:**

```js
static fromBirthYear(name, birthYear, currentYear = 2026) {
  return new Dog(name, currentYear - birthYear);   // hardcoded (this version)
}
```

The static method is defined on `Dog`, so even calling `Puppy.fromBirthYear(...)` still runs the `Dog` version with `new Dog(...)` inside — you asked for a Puppy and got a Dog. Every `Puppy`-specific method is missing from the result, and nothing errored — it just silently handed back the wrong type.

> **JS callout — `this` inside a static method.** When a static method is called *through a subclass* (`Puppy.fromBirthYear(...)`), `this` inside it is that subclass (`Puppy`). So `return new this(name, age)` inside the static method builds the *right* subclass — the JS idiom that plays the role Python's `cls(...)` plays. It's the one place `this` and the class name genuinely differ.

So: `new Dog(...)` hardcoded = always a `Dog`. `new this(...)` = whatever class the call came through. Same lesson as Python's `cls(...)`.

### 2.4 Class-wide operations

The other use for `static` is anything that reads or writes shared class state:

```js
static getPopulation() {
  return Dog.population;
}

static resetPopulation() {
  Dog.population = 0;
}
```

These need the class, not an object — asking one dog "how many dogs exist?" is the wrong question to the wrong entity.

---

## Part 3 — Static Methods: No `this` at All

### 3.1 The mechanics

This solves Part 0.2:

```js
class Dog {
  static isValidAge(age) {
    return age >= 0 && age <= 30;
  }
}

console.log(Dog.isValidAge(5));    // true
console.log(Dog.isValidAge(-2));   // false
```

No `this`. `static` tells JS: *"'this' is the class when called, and you can call me without an instance at all."*

### 3.2 What `static` is actually doing for you

Unlike Python, JS *requires* you to mark a class-level helper `static` — and if you forget, the method simply isn't reachable from the class:

```js
class Dog {
  isValidAge(age) {        // no `static` keyword
    return age >= 0 && age <= 30;
  }
}

console.log(Dog.isValidAge(5));    // TypeError: Dog.isValidAge is not a function
```

An un-marked method is an *instance* method; it lives on the prototype, not the class. Calling it via the class fails — there's no instance to supply `this`. Mark it `static` and it behaves identically from both the class and (via the class) any instance's perspective: pure function, no binding.

### 3.3 Static method or plain module function?

Honest answer: a `static` method is a plain function that happens to live in the class namespace. The difference is organisational, not technical.

| Prefer `static` | Prefer a module-level function |
|---|---|
| Logic is meaningless without the class's context | Genuinely reusable elsewhere |
| You want `Dog.isValidAge(...)` to read as a fact about dogs | Nothing to do with any one class |
| Subclasses might want to override it | No inheritance story |

Where it pays off is using it *inside* the class to keep the constructor clean:

```js
class Dog {
  constructor(name, age) {
    if (!Dog.isValidAge(age)) {
      throw new Error(`invalid age: ${age}`);
    }
    this.name = name;
    this.age = age;
  }

  static isValidAge(age) {
    return age >= 0 && age <= 30;
  }
}

new Dog("Bad", -5);   // Error: invalid age: -5
```

The validation rule is stated once, named clearly, and reusable by callers *before* they attempt to build a dog.

---

## Part 4 — All Three, Side by Side

```js
class Example {
  instanceMethod() {
    return `instance method -- got the object`;
  }

  static classMethod() {
    return `static method -- this is the class`;
  }

  static staticMethod() {
    return "static method -- no instance involved";
  }
}
```

| Type | Keyword | Sees instance data | Sees class data | Typical use |
|---|---|---|---|---|
| Instance | *(none)* | ✔ | ✔ (via `ClassName`) | normal object behaviour |
| Static | `static` | ✘ | ✔ (via `ClassName`) | alternative constructors, shared state, helpers |

> **JS callout — unlike Python, static methods are NOT callable on instances.** `rex.getPopulation()` throws `TypeError: rex.getPopulation is not a function`, because static methods live on the class, not on the prototype. Python happily lets `rex.get_population()` work; JS insists you call through the class: `Dog.getPopulation()`. That's the clearer route anyway.

**How to choose,** in one question: *what does this method need in order to work?*

- One specific object's data → instance method (`this.name`).
- The class (to build one, or to touch shared state) → `static`.
- Only its own arguments → `static`, called on the class.
- Neither, and you want to be sloppy about it → a plain module function.

---

## Part 5 — Predict, Then Run

Write your predicted output next to each one *before* running it.

1. ```js
   class Counter {
     static total = 0;
     static bump() { Counter.total += 1; }
   }
   Counter.bump();
   Counter.bump();
   console.log(Counter.total);
   ```

2. ```js
   class A {
     static make() { return new this(); }
   }
   class B extends A {}
   console.log(B.make().constructor.name);
   ```

3. ```js
   class Tool {
     static double(x) { return x * 2; }
   }
   const t = new Tool();
   console.log(Tool.double(4), t.double ? "method exists" : "no method on instance");
   ```

4. ```js
   class Dog {
     speak() { return "woof"; }
   }
   console.log(Dog.speak ? "reachable" : Dog.speak);
   ```

<details>
<summary>Answers (predict first)</summary>

1. `2`. `Counter.total += 1` writes to the class, because a static method shares the class attribute — this is the correct counter idiom, and it's why `static` avoids the `this.total += 1` trap from Lesson 04 Part 2.4.
2. `B`. `this` inside `B.make()` is `B`, so `new this()` builds a `B` — the `cls(...)` idiom (Part 2.3).
3. `8` then `no method on instance`. `Tool.double(4)` is `8`. `t.double` is `undefined` — static methods aren't inherited to instances in JS, so the ternary prints `"no method on instance"`. (Python's `t.double(4)` would work; JS insists you call through the class.)
4. `undefined`. `Dog.speak` is `undefined` — an instance method lives on the prototype, not on the class. Calling `Dog.speak()` is `TypeError: Dog.speak is not a function`. Python's `Dog.speak()` produces a similar-sounding `TypeError`, but for a different reason (missing `self` argument).

</details>
---

## Part 6 — Cheat Sheet Summary

```js
class Dog {
  static population = 0;

  constructor(name, age) {
    if (!Dog.isValidAge(age)) {
      throw new Error(`invalid age: ${age}`);
    }
    this.name = name;
    this.age = age;
    Dog.population += 1;
  }

  bark() {                              // INSTANCE: needs one dog
    console.log(`${this.name} says Woof!`);
  }

  static fromBirthYear(name, birthYear, currentYear = 2026) {   // CLASS: builds one
    return new this(name, currentYear - birthYear);  // `this` = class called through
  }

  static getPopulation() {              // CLASS: touches shared state
    return Dog.population;
  }

  static isValidAge(age) {              // STATIC: needs nothing
    return age >= 0 && age <= 30;
  }
}
```

| Idea | One-line version |
|---|---|
| `static` method | Called on the class, never on an instance; the JS home for Python's `@classmethod` and `@staticmethod` |
| Alternative constructor | converts its inputs, then `return new this(...)` — delegates to the constructor |
| Why `new this(...)` | so subclasses build *themselves*; hardcoding `Dog(...)` silently returns the wrong type |
| Static methods and instances | **not callable on instances** in JS (Python allows this) |
| `Dog.bark()` | `TypeError: ... is not a function` — no instance on the left |
| Choosing | needs an object → instance; needs the class → static; needs neither → static or module fn |
| Rotting defaults | `currentYear = 2026` freezes; compute "now" inside the body instead |

---

## Self-Check

- [ ] Why can't `fromBirthYear` be an instance method?
- [ ] What does `this` receive inside a `static` method, and how does the `static` keyword differ from just writing the method?
- [ ] Show what goes wrong if an alternative constructor hardcodes `Dog(...)` instead of `new this(...)`.
- [ ] A helper without `static` — why is `Dog.f(5)` a `TypeError`?
- [ ] Can you call a `static` method on an instance in JS? Why not?
- [ ] Which kind of method needs nothing but its own arguments?

---

## 📚 Resources

- **MDN:** [static](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static)
- **MDN:** [Public class fields](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields)
- **Net Ninja:** [Modern JavaScript Tutorial — classes](https://www.youtube.com/playlist?list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU)
- **Eloquent JavaScript:** [Chapter 6 — The Secret Life of Objects](https://eloquentjavascript.net/06_object.html)

---

## 🧠 Try It Yourself

Open `exercises.js` in this folder. **Do Exercise 3 first** — the constructor calls `Dog.isValidAge`, so until that returns a real boolean every `new Dog(...)` will raise:

1. Implement `isValidAge(age)` as a `static` method returning `true` for `0 <= age <= 30` (Part 3.1).
2. Implement `fromBirthYear` as a `static` method that computes the age and returns `new Dog(name, age)` (Part 2.2).
3. Implement `getPopulation` as a `static` method returning `Dog.population` (Part 2.4).
4. Confirm `new Dog("Bad", -5)` raises (Part 3.3).
5. Add `class Puppy extends Dog {}` at the bottom, call `Puppy.fromBirthYear("Bit", 2025)`, and print `constructor.name`. Then try switching the body to `new Dog(...)` hardcoded and watch it return the wrong type (Part 2.3).
6. Try calling `getPopulation()` on an *instance* (`rex.getPopulation()`) and note the `TypeError` — worth seeing once (Part 4).
