# OOP 06: Polymorphism — A Manual Walkthrough

**Prerequisite:** Lessons 01–05.
**By the end you will be able to:** use inheritance to share behaviour, override methods, explain the method lookup rule, use `super` to extend rather than replace, and choose between inheritance-based polymorphism and duck typing.

---

## Part 0 — The Problem: The `if/else` Chain That Never Stops Growing

You have three kinds of animal and you want each to make its noise. With what you know so far:

```js
function makeNoise(animal) {
  if (animal.kind === "dog") {
    console.log(`${animal.name} says Woof!`);
  } else if (animal.kind === "cat") {
    console.log(`${animal.name} says Meow!`);
  } else if (animal.kind === "bird") {
    console.log(`${animal.name} says Tweet!`);
  } else {
    console.log("???");
  }
}
```

This works. Now look at what it costs you:

- **Adding a fourth animal means editing this function.** And every other function shaped like it — `feed()`, `describe()`, `house()`. One new animal, a dozen edits scattered across the codebase.
- **The knowledge is in the wrong place.** "Dogs say Woof" is a fact about dogs, but it's stored in a function about noises. To learn what a dog does you must read every `if/else` chain in the project.
- **Forgetting a branch fails silently.** Add `"fish"` and you print `???` rather than getting an error.

> **The core insight:** instead of one function that asks *"what kind of thing is this?"*, let each thing answer for itself. The caller stops choosing behaviour — it just asks, and each object responds in its own way.

**Polymorphism** ("many forms") is that idea: **one method name, many behaviours, selected automatically by the object.**

---

## Part 1 — Inheritance: The Usual Setup

### 1.1 A subclass gets the parent's behaviour for free

```js
class Animal {
  constructor(name) {
    this.name = name;
  }

  describe() {
    return `I am ${this.name}`;
  }
}

class Dog extends Animal {}   // Dog inherits from Animal
```

`class Dog extends Animal` means *"a Dog is an Animal, plus whatever I add."* Even with an empty body, `Dog` already has everything `Animal` has:

```js
const rex = new Dog("Rex");     // Animal's constructor ran
console.log(rex.describe());    // I am Rex   -- Animal's describe ran
```

Vocabulary: `Animal` is the **parent** / **base** / **superclass**; `Dog` is the **child** / **subclass**. All three words for each are in common use.

### 1.2 Overriding: replacing a parent's method

```js
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {                                // throw a clear error for the "contract"
    throw new Error("Subclasses must implement speak()");
  }
}

class Dog extends Animal {
  speak() {                         // overrides Animal.speak
    return `${this.name} says Woof!`;
  }
}

class Cat extends Animal {
  speak() {
    return `${this.name} says Meow!`;
  }
}
```

`Dog` and `Cat` both **inherit** the constructor (neither rewrites it) and both **override** `speak`. Defining a method with the same name as the parent's replaces it for that subclass.

### 1.3 The method lookup rule — you already know this one

When you call `rex.speak()`, JS searches in a fixed order:

1. Does **`Dog`** define `speak`? Use it.
2. Otherwise, does **`Animal.prototype`**? Use it.
3. Otherwise, keep going up the prototype chain, then → `TypeError`.

This is the **same rule as Lesson 04 Part 2.2**, extended one step. There, reads fell through from object → class. Here they keep falling: object → class → parent → grandparent. One mechanism explains property shadowing *and* method overriding. Overriding a method is shadowing, done deliberately.

JS will show you the exact chain it searches:

```js
console.log(Object.getPrototypeOf(Dog.prototype));            // Animal.prototype
console.log(Object.getPrototypeOf(Animal.prototype).constructor.name); // "Object"
```

Python's `__mro__` is a formal list; JS's equivalent is simply the **prototype chain**: each class's `prototype` points at its parent's `prototype`, ending at `Object.prototype` (from which every object inherits — which is why every object already has methods you never wrote, like `hasOwnProperty` and `toString`).

### 1.4 Throwing as a contract

Why did `Animal.speak` throw instead of returning something?

```js
speak() {
  throw new Error("Subclasses must implement speak()");
}
```

Because "animal in general" has no noise — only specific animals do. Throwing states a **requirement**: *any subclass must provide this.* If someone forgets:

```js
class Fish extends Animal {}

new Fish().speak();
```
```text
Error: Subclasses must implement speak()
```

A loud, specific error naming exactly what's missing. Compare with returning `null` instead, which would quietly print `null` and leave you hunting. Compare also with Part 0's `else: print("???")` — same silent failure.

(JS has no built-in abstract classes like Python's `abc.ABC` — there is no way to refuse to *create* an incomplete subclass at construction time. Throwing in the base method, as here, is the lightweight JS idiom and is plenty for this lesson.)

---

## Part 2 — Polymorphism in Action

### 2.1 The loop

```js
const animals = [new Dog("Rex"), new Cat("Whiskers"), new Dog("Fido")];

for (const animal of animals) {
  console.log(animal.speak());
}
```
```text
Rex says Woof!
Whiskers says Meow!
Fido says Woof!
```

One call site, `animal.speak()`, produced three different behaviours. At each iteration JS applies Part 1.3's lookup to whatever object `animal` currently is, and runs what it finds.

### 2.2 Compare against Part 0 directly

| | `if/else` chain | Polymorphism |
|---|---|---|
| Who picks the behaviour | the caller, by inspecting a tag | the object, by being itself |
| Where "dogs say Woof" lives | inside a noise function | inside `Dog` |
| Adding a new animal | edit every chain | add one class |
| Forgetting a case | silent `???` | loud `Error` |

The calling code no longer contains a single `if` about animal types. It doesn't know how many kinds exist, and doesn't need to.

### 2.3 The real payoff: extension without modification

Add a `Bird` — and change **nothing** else:

```js
class Bird extends Animal {
  speak() {
    return `${this.name} says Tweet!`;
  }
}

const animals = [new Dog("Rex"), new Cat("Whiskers"), new Bird("Tweety")];
for (const animal of animals) {
  console.log(animal.speak());   // the loop is untouched
}
```
```text
Rex says Woof!
Whiskers says Meow!
Tweety says Tweet!
```

The loop was written before `Bird` existed and works with it anyway. That's the practical value: **code that works with the general interface automatically works with subclasses written later** — including ones written by other people, after your code shipped.

---

## Part 3 — Duck Typing: JS's Looser Version

### 3.1 No shared parent required

Here's the part that surprises people coming from other languages: JS never checked that `animal` was an `Animal`. It only tried to call `.speak()`. So a completely unrelated class works too:

```js
class Robot {                // no parent, no relation to Animal at all
  speak() {
    return "BEEP BOOP I AM SPEAKING";
  }
}

for (const thing of [new Dog("Fido"), new Robot()]) {
  console.log(thing.speak());
}
```
```text
Fido says Woof!
BEEP BOOP I AM SPEAKING
```

This is **duck typing**: *"if it walks like a duck and quacks like a duck, treat it as a duck."* JS cares about **what an object can do**, not what it *is*. Having a `speak` method is the entire qualification.

### 3.2 What it costs — the failure is deferred

Flexibility has a price. Nothing verifies the method exists until the instant you call it:

```js
class Rock {}               // no speak method

for (const thing of [new Duck(), new Rock()]) {
  console.log(thing.speak());
}
```
```text
Quack!
TypeError: thing.speak is not a function
```

Note it printed `Quack!` **first**. Half the loop ran, then it died partway through — leaving whatever it had already done in place. With a shared base class throwing `Error`, you get a clearer message naming the contract. Duck typing pushes the check as late as possible.

### 3.3 Which should you use?

| Use **inheritance** when | Use **duck typing** when |
|---|---|
| The classes genuinely are a kind of the same thing | They're unrelated but happen to share an ability |
| You want shared code in a base class (constructor, `describe`) | Each implementation is entirely its own |
| You want a written contract via a throwing base method | You're accepting objects from code you don't control |

In practice both appear together constantly: a base class for your own family of types, and duck typing at the boundary so other people's objects can join in. The `people` loop in the `oop_super_extend_duck_typing` quest does exactly this — `Manager` inherits, `Contractor` ducks.

**A note on `instanceof`:** you *can* check types explicitly:

```js
console.log(new Dog("Rex") instanceof Animal);   // true -- a Dog is an Animal
```

It's occasionally necessary, but reaching for it inside a loop over mixed types usually means you've rebuilt Part 0's `if/else` chain with fancier syntax. Prefer calling the method.

---

## Part 4 — `super`: Extending Instead of Replacing

### 4.1 The problem with a plain override

Overriding **replaces** the parent's method entirely. Often you want the parent's work *plus* something extra:

```js
class Animal {
  describe() {
    return `I am ${this.name}`;
  }
}

class Dog extends Animal {
  describe() {
    return `I am ${this.name}, a good dog`;   // duplicates the parent's wording
  }
}
```

That literal `"I am ..."` is now written twice. Change the format in `Animal` and `Dog` silently disagrees with it.

### 4.2 `super` calls the parent's version

```js
class Dog extends Animal {
  describe() {
    const base = super.describe();   // run Animal's version, keep its return value
    return `${base}, a good dog`;
  }
}

console.log(new Dog("Rex").describe());   // I am Rex, a good dog
```

`super.describe()` gives you the *parent's* implementation. No `this` is passed — `super` already knows which object it's working with.

The parent's wording now exists in exactly one place. Change `Animal.describe` and `Dog` follows automatically.

### 4.3 `super` in the constructor

This is where you'll use it most. A subclass that adds data still wants the parent's setup:

```js
class Animal {
  constructor(name) {
    this.name = name;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);          // parent's setup — pass the args, NOT `this`
    this.breed = breed;  // then add what's new to Dog
  }
}

const rex = new Dog("Rex", "Labrador");
console.log(rex.name, rex.breed);   // Rex Labrador
```

Two rules that catch people:

- **No `this` in the call.** `super(name)`, not `super(this, name)` — `this` is the object, already supplied by `new`.
- **Don't re-do the parent's work.** Writing `this.name = name` yourself instead of delegating defeats the point; if `Animal`'s constructor later starts validating the name, your subclass would skip the validation.

### 4.4 Why `super` and not `Animal.prototype.describe.call(this)`?

You *can* name the parent explicitly, and in a simple two-level chain it behaves identically:

```js
describe() {
  return Animal.prototype.describe.call(this) + ", a good dog";   // works, but don't
}
```

Two reasons not to. The mundane one: it repeats the parent's name, so renaming `Animal` or inserting a class in between means editing every subclass.

The real one: with more than one parent, hardcoding **silently skips classes**. Given `Both extends Left, Right` where both inherit from `Base`:

```js
class Base {}
class Left extends Base {}
class Right extends Base {}
class Both extends Left, Right {}
```

The resolution order for `Both` is `Both → Left → Right → Base → Object`. Using `super` walks that chain correctly — calling `Left`'s method, which itself uses `super` to walk to `Right`, and so on. Hardcoding `Right.prototype.method.call(this)` would jump straight to `Right` and skip whatever `Left` contributed.

You won't write diamond hierarchies soon, but the habit costs nothing.

---

## Part 5 — Built-In Polymorphism You've Used All Along

You have been relying on this since your first lesson:

```js
console.log([1, 2, 3].length);          // 3 -- Array's length property
console.log("hello".length);             // 5 -- String's length property
console.log({ a: 1, b: 2 }.length);   // undefined -- plain objects have no length

console.log(1 + 2);                   // 3
console.log("a" + "b");               // "ab"
console.log([1, 2].concat([3, 4]));  // [1, 2, 3, 4]
```

One property name, `length`, works on strings and arrays. One operator, `+`, has different meanings for numbers vs strings.

The mechanism is exactly Part 1.2's overriding. JS's built-in types (`String`, `Array`, `Object`) each provide their own implementations, and operator behaviour is dispatched by type.

You can join in with your own classes — and the closest JS equivalent to `__len__` / `__str__` is implementing certain well-known methods that JS's own constructs look for:

```js
class Pack {
  #dogs;

  constructor(dogs = []) {
    this.#dogs = dogs;
  }

  get length() {
    return this.#dogs.length;
  }

  [Symbol.iterator]() {
    return this.#dogs[Symbol.iterator]();
  }
}

const pack = new Pack(["Rex", "Fido"]);
console.log(pack.length);   // 2
for (const dog of pack) {
  console.log(dog);
}
```

Implementing `get length()` gives your class a `length` property. Implementing `[Symbol.iterator]` makes it `for...of`-compatible. These are JS's equivalent of Python's dunder protocol.

---

## Part 6 — Predict, Then Run

Write your predicted output next to each one *before* running it.

1. ```js
   class A {
     hi() { return "A"; }
   }
   class B extends A {}
   class C extends B {
     hi() { return "C"; }
   }
   console.log(new A().hi(), new B().hi(), new C().hi());
   ```

2. ```js
   class Animal {
     constructor(name) { this.name = name; }
   }
   class Dog extends Animal {
     constructor(name, breed) {
       this.breed = breed;   // forgot super(name)
     }
   }
   const d = new Dog("Rex", "Lab");
   console.log(d.name);
   ```

3. ```js
   class A {
     greet() { return "hello"; }
   }
   class B extends A {
     greet() { return super.greet().toUpperCase(); }
   }
   console.log(new B().greet());
   ```

4. ```js
   class Box {
     #items;
     constructor(items) { this.#items = items; }
     get length() { return this.#items.length; }
   }
   console.log(new Box([1, 2, 3]).length);
   ```

<details>
<summary>Answers (predict first)</summary>

1. `A A C`. `B` defines no `hi`, so lookup falls through to `A` (Part 1.3). `C` overrides it, so `C` wins for `C`.
2. `undefined`. The constructor replaced `Animal`'s entirely, so `this.name` was never set — the Part 4.3 mistake. Fix: `super(name)`.
3. `HELLO`. `super.greet()` returns the parent's string, then `.toUpperCase()` transforms it — extending rather than replacing (Part 4.2).
4. `3`. The `get length()` accessor makes `Box` expose a `length` property, just like `Array` does.

</details>

---

## Part 7 — Cheat Sheet Summary

```js
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {                              // the contract
    throw new Error("Subclasses must implement speak()");
  }

  describe() {
    return `I am ${this.name}`;
  }
}


class Dog extends Animal {                      // inherits
  constructor(name, breed) {
    super(name);                              // parent's setup, no `this` passed
    this.breed = breed;
  }

  speak() {                                  // overrides
    return `${this.name} says Woof!`;
  }

  describe() {                               // extends via super
    return `${super.describe()}, a good dog`;
  }
}


class Robot {                                 // unrelated -- duck typing
  speak() {
    return "BEEP BOOP";
  }
}


for (const thing of [new Dog("Rex", "Lab"), new Robot()]) {   // one call, many behaviours
  console.log(thing.speak());
}
```

| Idea | One-line version |
|---|---|
| Polymorphism | One method name, many behaviours, chosen by the object |
| `class Dog extends Animal` | Dog is an Animal plus extras; inherits everything |
| Overriding | Redefining a parent's method replaces it for that subclass |
| **Method lookup** | subclass → parent → grandparent → `Object`; same rule as Lesson 04 |
| `Object.getPrototypeOf` | Walk the prototype chain in JS (Python's `__mro__` analog) |
| `throw new Error` | States a contract: subclasses must supply this |
| Duck typing | Any object with the right method works; no shared parent needed |
| Duck typing's cost | Missing method → `TypeError`, only when called, mid-loop |
| `super.method()` | Run the parent's version; extend instead of replace |
| `super(...)` in constructor | Parent's setup — pass the args, **not** `this` |
| Override constructor without `super(...)` | Parent's attributes are never set → `undefined` |
| Why not `Parent.prototype.m.call(this)` | Repeats the name, and with multiple inheritance **skips classes** |
| `length` / `[Symbol.iterator]` | JS's equivalents of Python's `__len__` / `__iter__` dunders |

---

## Self-Check

- [ ] What three costs does the `if/else` chain in Part 0 have?
- [ ] State the method lookup order, and say how it relates to Lesson 04's attribute lookup.
- [ ] Why does `Animal.speak` throw instead of returning `null`?
- [ ] What must an object have to work in a duck-typed loop, and when do you find out it doesn't?
- [ ] What breaks if a subclass overrides the constructor and never calls `super(...)`?
- [ ] Give a case where `Animal.prototype.describe.call(this)` and `super.describe()` genuinely differ.

---

## 📚 Resources

- **MDN:** [Inheritance](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#inheritance) and [extends](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends)
- **MDN:** [super](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super)
- **MDN:** [Symbol.iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator) — the JS `[Symbol.iterator]` protocol
- **Eloquent JavaScript:** [Chapter 6 — The Secret Life of Objects](https://eloquentjavascript.net/06_object.html)

---

## 🧠 Try It Yourself

Open `exercises.js` in this folder:

1. Implement `Dog.speak()` and `Cat.speak()` overriding `Animal.speak`, put several in one list, and loop calling `.speak()` (Parts 1.2, 2.1).
2. Implement `Bird.speak()` and add a bird to the same list **without touching the loop** (Part 2.3).
3. Before implementing them, run the file once and read the `Error` from the base class (Part 1.4).
4. Implement `Robot.speak()` — note `Robot` has no parent — and confirm it works in the same loop via duck typing (Part 3.1).
5. Implement `DescriptiveDog.describe()` using `super.describe()` to extend rather than replace (Part 4.2).
6. Walk the prototype chain with `Object.getPrototypeOf(Dog.prototype)` and confirm it points to `Animal.prototype` (Part 1.3).
7. Add a class with no `speak` method to the duck-typed list, run it, and note both the error **and** how much of the loop ran first (Part 3.2).
