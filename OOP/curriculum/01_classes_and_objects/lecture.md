# OOP 01: Classes and Objects — A Manual Walkthrough

**Prerequisite:** functions, loops, arrays, and objects.
**By the end you will be able to:** explain what a class and an object actually *are*, create objects, give them data and behaviour, and say precisely what `this` means — no loose ends left for later lessons.

> **How to read this lesson.** Every code block is runnable. When you see a **State** table, it shows what actually exists in memory at that moment. When you see a **Predict** box, cover the output with your hand and guess before reading on. That guessing step is where the learning happens.

---

## Part 0 — The One Problem OOP Exists To Solve

Don't start with the definition. Start with the pain, because the definition only makes sense once you've felt it.

### 0.1 One dog is easy

You want to track a dog's name and age:

```js
let dogName = "Rex";
let dogAge = 3;
```

Fine. Nothing wrong here.

### 0.2 Three dogs start to hurt

```js
let dog1Name = "Rex";
let dog1Age = 3;
let dog2Name = "Fido";
let dog2Age = 5;
let dog3Name = "Buddy";
let dog3Age = 2;
```

Six variables for three dogs. For thirty dogs you'd need sixty. And notice the real damage: **nothing in the code says `dog1Name` and `dog1Age` belong together.** That pairing exists only in your head and in the naming convention. The computer sees six unrelated variables.

Now write a function that describes a dog:

```js
function describe(name, age) {
  console.log(`${name} is ${age} years old`);
}

describe(dog1Name, dog1Age);   // Rex is 3 years old
describe(dog2Age, dog2Name);   // 5 is Fido years old   <-- oops
```

That second call is a real bug, and JS raises no error at all. It happily prints nonsense, because as far as JS is concerned you passed two values in the order the function asked for. **The data has no glue.**

### 0.3 The object attempt gets you halfway

You already know a fix for the glue problem:

```js
const dog1 = { name: "Rex", age: 3 };
const dog2 = { name: "Fido", age: 5 };

function describe(dog) {
  console.log(`${dog.name} is ${dog.age} years old`);
}

describe(dog1);   // Rex is 3 years old
```

This is genuinely better, and for small scripts it is often the right answer. Name and age now travel together as one value, and `describe` takes one argument instead of two-in-the-right-order.

### 0.4 Where the object still fails

Three cracks show up as the program grows.

**Crack 1 — nothing guarantees the shape.** Any object at all can be passed in:

```js
describe({ nmae: "Rex", age: 3 });   // typo in the key
```

```text
undefined is 3 years old
```

No error, nothing crashes. A missing property just reads as `undefined`, so the typo silently produces nonsense. In Python this fails loudly with a `KeyError`; in JS it is *even quieter* — you only notice because the output is wrong.

**Crack 2 — the behaviour lives somewhere else.** `describe` is a loose function at module level. Six months later, `describe`, `feed`, `bark`, and `vaccinate` are scattered across three files, and nothing connects them to the thing they operate on. To find everything a dog can *do*, you have to grep.

**Crack 3 — every dog re-declares its own structure.** The knowledge "a dog has a name and an age" is repeated in every object literal you write, instead of stated once.

### 0.5 The insight

> **The core insight:** you want to say *once* what a dog is — what data it holds and what it can do — and then stamp out as many dogs as you like from that single description.

That single description is a **class**. Each stamped-out dog is an **object**. That is the whole idea. Everything else in this module is mechanics.

---

## Part 1 — Class = The Description, Object = The Thing

### 1.1 The two words, precisely

| Term | What it is | How many exist |
|---|---|---|
| **Class** | The description: what data this kind of thing holds, what it can do | One, written once |
| **Object** (or **instance**) | One actual thing built from that description, with its own data | As many as you create |

The cookie analogy: the class is the **cookie cutter**, each object is a **cookie**. You own one cutter and it makes any number of cookies. Crucially, the cutter is not a cookie — you can't eat it. In the same way, the class `Dog` is not a dog; it's the description of what dogs are.

### 1.2 Your first class

```js
class Dog {}          // empty class = "deliberately empty for now"

const rex = new Dog();   // <-- `new` BUILDS an object
```

Two things to notice about that last line:

- `Dog` (no `new`) is the class itself — the cutter.
- `new Dog()` **runs** the class and hands back a brand new object — a cookie. In JS you must say `new`; plain `Dog()` won't build anything.

```js
console.log(Dog);      // [class Dog]      the description
console.log(rex);      // Dog {}           an actual thing
```

In Python, `print(rex)` shows a memory address (`<__main__.Dog object at 0x7f...>`). Node doesn't show one — it just prints `Dog {}` to confirm the instance. Yours will look the same every run, but that's formatting, not identity (see Part 1.3).

### 1.3 Each object is genuinely separate

This is the point people most often take on faith without checking. Check it.

```js
class Dog {}

const rex  = new Dog();
const fido = new Dog();

console.log(rex === fido);   // false
console.log(rex == fido);    // false   (loose equality: still identity for objects)
console.log(rex === rex);    // true
```

**Predict first, then read:** why is `rex == fido` `false` when both objects are completely empty and therefore look identical?

Because for objects you write yourself, JS's answer to "are these equal?" is *"only if they are literally the same object."* There is no built-in content-equality operator in JS — `===` and `==` both compare identity here (loose `==` only coerces when the types differ, and two objects are never the same type). Two separate empty dogs are two different things, the same way two blank sheets of paper are two sheets, not one. (If you want to compare by content you have to write it yourself — an `equals()` method, or a custom `valueOf`. That's a cheatsheet note, not a freebie.)

`===` asks **"same object?"**. There is no `==`-for-values question for your own classes until you teach them one. For the built-ins, content equality is built into their methods (`Array.prototype.equals` doesn't exist, but `String` has `.length`-compare hacks) — which is exactly why the distinction is easy to miss here and painful to miss later. (Python's `is`/`==` pair maps onto JS's `===`/`Object.is()` for identity, and onto "whatever you implement" for value.)

---

## Part 2 — Attributes: Giving an Object Data

An **attribute** is a piece of data stored on an object. You reach it with a dot: `rex.name`.

### 2.1 Attaching attributes directly

```js
class Dog {}

const rex = new Dog();
rex.name = "Rex";
rex.age = 3;

console.log(rex.name, rex.age);    // Rex 3
```

Read `rex.name = "Rex"` as: *"on the object `rex`, create a slot called `name` and put `"Rex"` in it."*

### 2.2 State trace, line by line

Here is what actually exists after each line:

| After line | `rex` holds |
|---|---|
| `const rex = new Dog();` | *(nothing — an empty object)* |
| `rex.name = "Rex"` | `name → "Rex"` |
| `rex.age = 3` | `name → "Rex"`, `age → 3` |

The object starts empty and you bolt data onto it as you go. Nothing pre-declared the slots.

### 2.3 Objects really don't share data

```js
const rex  = new Dog();
const fido = new Dog();

rex.name = "Rex";
fido.name = "Fido";

console.log(rex.name);    // Rex
console.log(fido.name);   // Fido      <-- setting one did not touch the other
```

| Object | its own `name` |
|---|---|
| `rex` | `"Rex"` |
| `fido` | `"Fido"` |

Each object carries its own private set of attributes. This is exactly the "glue" that Part 0.2 was missing: `name` and `age` are now welded to a specific dog rather than floating in the module.

### 2.4 But this approach is fragile — here's the proof

Attaching attributes by hand means **nothing guarantees you did it**:

```js
class Dog {}

const rex = new Dog();
rex.name = "Rex";
// ...forgot rex.age entirely

console.log(rex.age);
```

```text
undefined
```

In Python this crashes with `AttributeError: 'Dog' object has no attribute 'age'`. In JS there is **no error at all** — a missing property reads as `undefined`, silently. That is the same **Crack 1** from Part 0.4, wearing a different hat. Python swapped `KeyError` for `AttributeError`; JS just prints `undefined` and moves on.

This is a real, unsolved limitation of what you've learned so far — not hand-waving. **Lesson 02 (the `constructor`) fixes it properly** by making JS expect a name and an age at the moment the object is built, so an incomplete `Dog` becomes rarer by construction. For now, know that attaching attributes by hand works and is what you'll do in this lesson's exercises, but it is not how real code does it.

---

## Part 3 — Methods: Giving an Object Behaviour

A **method** is a function defined inside a class. It is the "what it can do" half of the description.

### 3.1 Your first method

```js
class Dog {
  bark() {
    console.log("Woof!");
  }
}

const rex = new Dog();
rex.bark();      // Woof!
```

`bark` is written once, on the class, and every `Dog` object can call it.

### 3.2 What `this` is — answered now, not later

Most tutorials tell you to accept `this` on faith here. You don't have to. Here is the entire answer:

> **`this` is the object the method was called on.**

That's it. When you write `rex.bark()`, JS makes `rex` the `this` inside `bark` automatically. You never pass it yourself — it's filled in for you by the dot.

Why is it needed at all? Because `bark` is defined **once on the class**, but shared by **every** object. So when the method body needs the data of one specific dog, it needs some way to say "whichever dog I was called on":

```js
class Dog {
  bark() {
    console.log(`${this.name} says Woof!`);
  }
}

const rex  = new Dog();
rex.name = "Rex";
const fido = new Dog();
fido.name = "Fido";

rex.bark();    // Rex says Woof!
fido.bark();   // Fido says Woof!
```

One method definition, two different outputs. The difference is entirely *which object arrived as `this`*:

| Call | `this` is bound to | `this.name` reads |
|---|---|---|
| `rex.bark()` | the `rex` object | `"Rex"` |
| `fido.bark()` | the `fido` object | `"Fido"` |

### 3.3 The equivalence that makes it click

In Python these two lines do exactly the same thing (`Dog.bark(rex)`). In JS the method lives on the class's **prototype**, so the explicit form looks slightly different — but it's the same idea, and worth running once:

```js
rex.bark();                          // the normal way
Dog.prototype.bark.call(rex);        // what JS actually does under the hood
```

Run both. Identical output. `object.method()` is shorthand for `Class.prototype.method.call(object)` — the dot's job is to grab the thing on its left and slide it in as `this`.

Once you see that, `this` stops being magic: **it is just determined by the dot** (well — by *how the function is called*; the dot is the usual way).

### 3.4 What happens if `this` is lost

Python has a whole error for this ("takes 0 positional arguments but 1 was given" — you forgot `self`). JS has no `self` parameter to forget: `this` is implicit. But `this` is only *bound* while you call the method through an object. Detach the method and you get the JS version of that same bug:

```js
class Dog {
  bark() {
    console.log(`${this.name} says Woof!`);
  }
}

const rex = new Dog();
rex.name = "Rex";

const bark = rex.bark;   // grab the method, detached from the object
bark();                  // TypeError: Cannot read properties of undefined (reading 'name')
```

What happened? `bark` is just a function; `this` is set by *how you call it*. Calling it bare has no object in front of it, so `this` is `undefined` (in strict mode / modules), and `this.name` blows up.

Whenever you see `Cannot read properties of undefined` on a method call, the fix is almost always that `this` got detached — call it through the object (`rex.bark()`) or re-bind it with `.bind(rex)`.

Lesson 03 goes further with `this` — using it to write attributes, and to call other methods on the same object — but there is no remaining mystery about what it *is*.

---

## Part 4 — The Payoff, Demonstrated Rather Than Asserted

Let's be honest about the trade-off instead of just claiming OOP wins.

**At this size, the object-literal version is genuinely fine:**

```js
const dog = { name: "Rex" };
function bark(d) { console.log(`${d.name} says Woof!`); }
```

Nobody should feel bad about that code. So what actually changes as things grow? Three concrete things.

**1. The description lives in one place.** Everything a dog is and does sits inside `class Dog {}`. To learn the full capability of a dog you read one block, rather than grepping for functions that happen to take a dog-shaped object.

**2. Behaviour is attached to the data, so it can't be mismatched.** `rex.bark()` cannot possibly run against the wrong thing — you got `bark` *from* `rex`. Compare with `bark(someObject)`, which will cheerfully accept an object describing a *cat*, then fail (or print nonsense) deep inside the function.

**3. The bug from Part 0.2 becomes structurally impossible.** There is no argument order left to get wrong:

```js
describe(dog2Age, dog2Name);   // the old bug: silently prints nonsense
rex.describe();                // no ordering to get wrong — nothing to swap
```

Those are the real wins. Not "OOP is better," but: *one home for the description, behaviour welded to its data, and fewer ways to hold it wrong.*

---

## Part 5 — You've Been Using Objects All Along

This isn't a paradigm you opt into. JS is already built this way:

```js
console.log(typeof 5);          // "number"
console.log(typeof "hi");       // "string"
console.log(typeof [1, 2]);     // "object"
console.log(typeof null);       // "object"   <-- famous JS quirk
console.log(typeof console.log);// "function"
```

Every value you have ever used is an object (or primitive) of some type — and even primitives give you methods. That's why the dot syntax already feels familiar — you've been calling methods for ages:

```js
"hi".toUpperCase();         // a method on a String value
[3, 1, 2].sort();           // a method on an Array object
(5).toFixed(2);             // "5.00" -- even numbers have methods
```

`"hi".toUpperCase()` is `String.prototype.toUpperCase.call("hi")` by the rule from Part 3.3. Same mechanism, no exceptions.

One last mind-bender, worth running once:

```js
class Dog {}
console.log(typeof Dog);    // "function"
```

In JS, classes *are* functions under the hood — `class` is sugar over a constructor function, and functions are objects too. You don't need this today, but it's why "everything is an object" is meant more literally than it sounds.

---

## Part 6 — Predict, Then Run

Write your predicted output next to each one *before* running it. Getting a prediction wrong is the fastest way to find the gap in your model.

1. ```js
   class Cat {}
   const a = new Cat();
   const b = a;                 // note: no second new Cat() call
   console.log(a === b);
   ```
   *(Think carefully — this one is not `false`. Why not?)*

2. ```js
   class Cat {}
   const a = new Cat();
   a.name = "Tom";
   const b = new Cat();
   console.log(b.name);
   ```
   *(In Python this errors. What does JS print — and why does it not error?)*

3. ```js
   class Cat {
     speak() {
       console.log("Meow");
     }
   }
   const c = new Cat();
   Cat.prototype.speak.call(c);
   ```

4. ```js
   class Cat {
     speak() {
       console.log(`${this.name} says Meow`);
     }
   }
   const c = new Cat();
   const speak = c.speak;   // detach the method from the object
   speak();
   ```
   *(Which step fails — the call, or the `console.log` inside the method? What exactly does the stack trace name?)*

<details>
<summary>Answers (open only after committing to a prediction)</summary>

1. `true`. `const b = a` copies the *reference*, not the object — both names point at one single cat. Only `new Cat()` creates a new object.
2. `undefined`. Setting `name` on `a` did nothing to `b`; attributes are per-object. JS doesn't even complain — a missing property reads as `undefined`. (Python raises `AttributeError` here.)
3. `Meow`. The explicit prototype form of `c.speak()`, exactly as in Part 3.3.
4. `TypeError: Cannot read properties of undefined (reading 'name')`, and the stack trace blames **both** — it shows the `speak()` call line *and* the `console.log` line inside `speak`, because the failure happened inside the method that the call reached. `speak` was detached, so `this` was `undefined`. Reading stack traces bottom-up tells you what broke; reading top-down tells you how you got there.

</details>

---

## Part 7 — Cheat Sheet Summary

```js
class Dog {                        // define the description (PascalCase by convention)
  bark() {                         // a method; `this` = the object it's called on
    console.log(`${this.name} says Woof!`);
  }
}

const rex = new Dog();             // build an object   <- `new` does the building
rex.name = "Rex";                  // attach an attribute (temporary; see Lesson 02)
rex.bark();                        // call the method   <- the dot passes `rex` in as `this`
```

| Idea | One-line version |
|---|---|
| **Class** | The single description of what a kind of thing holds and does |
| **Object / instance** | One actual thing built from that description, with its own data |
| `Dog` vs `new Dog()` | The description vs a new thing built from it |
| **Attribute** | Data on an object, reached with a dot: `rex.name` |
| **Method** | A function defined in the class, called on an object |
| `this` | The object the method was called on — set by *how* you call it (usually with a dot) |
| `obj.method()` | Shorthand for `Class.prototype.method.call(obj)` |
| `===` vs content | `===` asks "same object?"; there's no built-in "equal value?" for your classes — write `equals()` |
| Attributes are | **per-object**; setting one object's attribute never touches another's |

**Still open after this lesson** — nothing about `this`, and one real gap: attaching attributes by hand doesn't guarantee an object is complete (Part 2.4, and JS reads missing attributes as `undefined` without an error). That is precisely what Lesson 02 solves.

---

## Self-Check

You've got this lesson if you can answer these without scrolling up:

- [ ] What's the difference between `Dog` and `new Dog()`?
- [ ] Why is `rex === fido` `false` for two empty objects?
- [ ] What exactly is `this`, and who supplies it?
- [ ] Rewrite `rex.bark()` without calling it through `rex`.
- [ ] You see `Cannot read properties of undefined` on a method call. What's the usual cause?
- [ ] Why is attaching attributes by hand fragile — and why is it *especially* silent in JS?

---

## 📚 Resources

- **MDN:** [Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) — the definitive reference
- **YouTube:** [Net Ninja — JavaScript Tutorial #57: Classes](https://www.youtube.com/playlist?list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU) — the most time-tested JS OOP explainer (this module's source)
- **MDN:** [The `this` keyword](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this) — pairs directly with Part 3
- **Eloquent JavaScript:** [Chapter 6 — The Secret Life of Objects](https://eloquentjavascript.net/06_object.html)

---

## 🧠 Try It Yourself

Now open `exercises.js` in this folder and work through it. It follows the parts above in order:

1. Define an empty `Car` class, create two `Car` objects, and confirm `car1 === car2` is `false` (Part 1.3).
2. Attach `make`, `model`, and `year` to one car, then print a sentence describing it (Part 2.1).
3. Add a `honk` method that prints `"Beep beep!"`, and call it (Part 3.1).
4. Add a `describe` method that uses `this` to print `"<year> <make> <model>"` — then call it as both `car1.describe()` and `Car.prototype.describe.call(car1)` and confirm they match (Part 3.3).
5. Deliberately create a third car and call `describe()` on it *without* attaching attributes. Read the `undefined` output and write a one-line comment explaining what Lesson 02 will do about it (Part 2.4).
6. Run `typeof` on `3.14`, `true`, `null`, `console.log`, and note that even functions are objects (Part 5).
