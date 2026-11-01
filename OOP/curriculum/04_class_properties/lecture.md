# OOP 04: Class Properties — A Manual Walkthrough

**Prerequisite:** Lessons 01–03.
**By the end you will be able to:** tell instance attributes from class attributes and predict which one you're touching, explain JS's property lookup rule, avoid the three sharing traps, and use `get`/`set` accessors to validate data without changing how callers write their code.

---

## Part 0 — Two Different Questions

So far every attribute has belonged to **one object**: `rex.name` is Rex's and nobody else's. That covers most data, but not all of it. Two questions have different answers:

| Question | Example | Belongs to |
|---|---|---|
| "What's *this dog's* name?" | `"Rex"` | one object |
| "What species are dogs?" | `"Canis familiaris"` | every dog, equally |

Storing the species on every object would duplicate the same string thousands of times, and updating it would mean visiting every dog. It isn't per-dog data — it's a fact about dogs *in general*.

There's also a second, unrelated problem this lesson solves. Right now attributes are wide open:

```js
rex.age = -50;      // nothing stops this
```

An age of `-50` is nonsense, but a plain attribute accepts anything. We want validation — **without** forcing every caller to switch from `rex.age = 5` to `rex.setAge(5)`.

> **The core insight:** attributes come in two scopes — per-object and per-class — and JS lets a plain-looking attribute secretly run code via getters and setters, so you can add validation without changing how it's used.

---

## Part 1 — Instance Attributes (Per-Object)

You already know these. Set with `this.x = ...`, one independent copy per object:

```js
class Dog {
  constructor(name) {
    this.name = name;       // instance attribute
  }
}

const rex  = new Dog("Rex");
const fido = new Dog("Fido");
rex.name = "Rexy";

console.log(rex.name, fido.name);     // Rexy Fido -- changing one left the other alone
```

---

## Part 2 — Class Attributes (Shared)

### 2.1 Defined as `static` in the class body, not in `constructor`

```js
class Dog {
  static species = "Canis familiaris";   // class attribute -- in the class body

  constructor(name) {
    this.name = name;                     // instance attribute -- in constructor
  }
}
```

The **position in the file** is what decides which kind you get. Class body with `static` → one shared value. Inside `constructor` with `this.` → one per object.

```js
const rex = new Dog("Rex");
const fido = new Dog("Fido");

console.log(rex.species, fido.species);  // Canis familiaris Canis familiaris
console.log(Dog.species);                 // Canis familiaris -- readable on the class itself

Dog.species = "Updated";                  // change it once...
console.log(rex.species, fido.species);  // Updated Updated -- ...every dog sees it
```

Note `Dog.species` works with **no object at all**. The value lives on the class, so you don't need a dog to read it.

### 2.2 The lookup rule — the mechanism behind everything in this lesson

When you write `rex.species`, JS searches in a fixed order:

1. Does the **object** have a `species` property of its own? Use that.
2. Otherwise, does the **class** (and its prototype chain) have one? Use that.
3. Otherwise → `undefined`.

You can watch this directly. An object carries its own properties in its own "record," separate from class/static members:

```js
class Dog {
  static species = "canine";
}

const rex = new Dog();
console.log(rex.species, Object.keys(rex));  // canine []  -- object has nothing
```

`Object.keys(rex)` is **empty** — yet `rex.species` returned a value. Step 1 found nothing, step 2 found it on the class. Now assign to it:

```js
rex.species = "wolf";
console.log(rex.species, Object.keys(rex)); // wolf ["species"]
```

The assignment wrote into *the object's own* property map. Now step 1 succeeds and the class's value is never consulted. The class value is untouched — delete the instance one:

```js
delete rex.species;
console.log(rex.species, Object.keys(rex)); // canine []  <-- the class attribute reappears
```

Nothing was destroyed. The instance property was merely sitting *in front of* the class property. Reads fall through to the class; **writes always land on the object.** Hold onto that sentence — the next three traps are all the same sentence in different costumes.

### 2.3 Trap 1 — shadowing

```js
class Dog {
  static species = "Canis familiaris";
}

const rex = new Dog();
const fido = new Dog();
rex.species = "Rex only";   // creates an instance property that shadows the class one

console.log(rex.species);    // Rex only
console.log(fido.species);   // Canis familiaris  <-- unaffected
console.log(Dog.species);   // Canis familiaris  <-- unaffected
```

If you *intended* to change the species for all dogs, you failed silently. `rex.species = ...` can never modify a class attribute — writes always land on the object (Part 2.2). To change it for everyone you must name the class: `Dog.species = ...`.

### 2.4 Trap 2 — the counter that never counts

The natural way to count objects is a shared class attribute. Here's the version that looks right and does nothing:

```js
class Dog {
  static population = 0;

  constructor(name) {
    this.name = name;
    this.population += 1;   // BUG
  }
}

new Dog(); new Dog(); new Dog();
console.log(Dog.population);  // 0   <-- never moved
```

Unpack `this.population += 1`, which is really `this.population = this.population + 1`:

| Half | Which rule applies | Result |
|---|---|---|
| read `this.population` | falls through to the class | `0` |
| write `this.population` | lands on the **object** | creates an instance property `= 1` |

So every dog gets its own `population = 1`, and the class's counter sits at `0` forever. Confirm it:

```js
const d = new Dog();
console.log(Object.keys(d));   // ["name", "population"]   <-- the instance shadow
console.log(Dog.population);  // 0
```

**The fix — name the class explicitly:**

```js
constructor(name) {
  this.name = name;
  Dog.population += 1;       // writes to the class attribute
}
```

This is the one place where writing `Dog.` instead of `this.` is not just acceptable but required. `this.` cannot reach a class attribute for writing.

### 2.5 Trap 3 — a mutable class attribute is shared by everyone

Traps 1 and 2 relied on **assignment**. This one is worse because it involves no assignment at all:

```js
class Dog {
  static tricks = [];   // BUG: one array, on the class

  constructor(name) {
    this.name = name;
  }

  learn(t) {
    this.tricks.push(t);   // no `=` anywhere here
  }
}

const rex  = new Dog("Rex");
const fido = new Dog("Fido");
rex.learn("sit");

console.log(rex.tricks);   // ["sit"]
console.log(fido.tricks);  // ["sit"]   <-- Fido knows it too
console.log(Object.keys(rex).includes("tricks"));  // false -- no tricks here at all
```

`this.tricks.push(t)` **reads** `this.tricks` (falling through to the class array) and then mutates that array in place. There's no assignment, so the "writes land on the object" rule never fires — nothing shadows anything, and every dog is pushing to the same array.

This is the exact same shape as the mutable-default trap in Lesson 02 Part 4.2: one mutable object created once, shared by everything.

**The fix** — per-object data belongs in `constructor`:

```js
constructor(name) {
  this.name = name;
  this.tricks = [];   // a fresh array per dog
}
```

**The rule:** class attributes should be **immutable** (numbers, strings, `null`) or deliberately shared. If each object needs its own list or object, build it in `constructor`.

---

## Part 3 — When to Use Which

| Use a **class attribute** (`static`) for | Use an **instance attribute** for |
|---|---|
| Constants shared by every instance (`species`) | Data unique to each object (`name`, `age`) |
| A counter of how many objects exist | Anything set from a constructor parameter |
| Default configuration values | Any mutable per-object list or object |

Quick test: ask *"if I change this, should every existing object see the change?"* Yes → class attribute. No → instance attribute.

---

## Part 4 — Controlled Access with `get` / `set`

### 4.1 The problem

Back to Part 0's second question. You want validation:

```js
c.radius = -5;     // should be rejected
```

The classic fix is getter/setter methods — but that changes every call site to `c.getRadius()` / `c.setRadius(-5)`, which is noisy. JS's `get`/`set` accessors let a property **look** identical while secretly running a method.

### 4.2 The getter

```js
class Circle {
  constructor(radius) {
    this._radius = radius;
  }

  get radius() {
    return this._radius;
  }
}

const c = new Circle(5);
console.log(c.radius);     // 5   -- no parentheses, yet a method ran
```

`c.radius` has no `()` but `radius` is a method. That's what `get` does: it makes property *access* trigger a method call.

The leading underscore in `_radius` is a **convention**, not enforcement: *"internal, don't touch from outside."* Nothing stops `c._radius = -5`; the underscore just tells other programmers not to. (JS also has true `#private` fields, but they're a later topic — the underscore convention, like Python's, is what we use here.) The names must differ — a getter called `radius` that returns `this.radius` would call itself forever.

### 4.3 The setter

```js
class Circle {
  constructor(radius) {
    this._radius = radius;
  }

  get radius() {
    return this._radius;
  }

  set radius(value) {
    if (value < 0) {
      throw new Error("radius cannot be negative");
    }
    this._radius = value;
  }
}
```

The `set` block attaches to the getter, so **the getter must be defined first** and both must share the name.

```js
const c = new Circle(5);
c.radius = 10;        // runs the setter, passes validation
console.log(c.radius); // 10
c.radius = -3;        // Error: radius cannot be negative
```

### 4.4 The bug almost every tutorial ships

Look hard at `constructor` above:

```js
constructor(radius) {
  this._radius = radius;        // writes the internal property DIRECTLY
}
```

It assigns to `this._radius`, not `this.radius` — so it **bypasses the setter entirely**. The validation you just wrote doesn't apply at construction time:

```js
const c = new Circle(-5);
console.log(c.radius);     // -5    <-- accepted!
```

Your class rejects `c.radius = -5` but happily accepts `new Circle(-5)`. Validation with a hole in it.

**The fix — assign through the accessor in the constructor:**

```js
class Circle {
  constructor(radius) {
    this.radius = radius;      // note: NO underscore -- routes through the setter
  }

  get radius() {
    return this._radius;
  }

  set radius(value) {
    if (value < 0) {
      throw new Error("radius cannot be negative");
    }
    this._radius = value;
  }
}

new Circle(-5);   // Error: radius cannot be negative
```

`this.radius = radius` looks like it would recurse, but it doesn't: the *setter* runs and stores to `this._radius`, a different name. One validation rule, enforced everywhere.

> **The rule:** in the constructor, assign to `this.<property_name>`, not `this._<private_name>`, so construction obeys the same rules as later assignment.

### 4.5 Read-only computed properties

Omit the setter and the property becomes read-only — and it can be **computed** rather than stored:

```js
get area() {
  return Math.PI * this._radius ** 2;
}
```

```js
const c = new Circle(5);
console.log(Math.round(c.area * 100) / 100);   // 78.54
c.radius = 10;
console.log(Math.round(c.area * 100) / 100);   // 314.16  <-- recalculated, never stale
```

`area` isn't stored anywhere. It's derived on every access, so it can't drift out of sync with `radius` — a whole class of bug removed by not storing the value twice.

And because there's no setter, assigning is refused. In a class (strict mode), it throws:

```js
c.area = 100;
```

```text
TypeError: Cannot set property area of #<Circle> which has only a getter
```

That message is exactly what you want: the class is telling callers `area` is derived, not owned.

---

## Part 5 — Predict, Then Run

Write your predicted output next to each one *before* running it.

1. ```js
   class Dog {
     static legs = 4;
   }
   const a = new Dog();
   const b = new Dog();
   a.legs = 3;
   Dog.legs = 5;
   console.log(a.legs, b.legs);
   ```

2. ```js
   class Basket {
     static items = [];
     add(x) { this.items.push(x); }
   }
   const b1 = new Basket();
   const b2 = new Basket();
   b1.add("apple");
   console.log(b2.items.length);
   ```

3. ```js
   class Temp {
     #c;                              // private field, JS-only (see Part 6)
     constructor(c) { this.#c = c; }
     get f() { return (this.#c * 9) / 5 + 32; }
   }
   const t = new Temp(100);
   t.f = 50;
   ```

4. ```js
   class P {
     constructor(v) { this.v = v; }
     get v() { return this._v; }
     set v(val) { this._v = val * 2; }
   }
   console.log(new P(10).v);
   ```

<details>
<summary>Answers (predict first)</summary>

1. `3 5`. `a.legs = 3` created an instance property shadowing the class one, so `a` keeps `3`. `b` never got its own, so it falls through to the class and sees the updated `5`.
2. `1`. Trap 3 (Part 2.5) — `items` is one array on the class, shared by both baskets. `b2` sees the apple.
3. `TypeError: Cannot set property f of #<Temp> which has only a getter`. Getter only → read-only. (Python's `AttributeError` vs JS's `TypeError` — the message conveys the same meaning.)
4. `20`. `this.v = v` in the constructor routes through the setter (Part 4.4), which doubles the value before storing. This is the mechanism that makes the 4.4 fix work — and a reminder that a setter can transform, not just validate.

</details>

---

## Part 6 — Cheat Sheet Summary

```js
class Dog {
  static species = "Canis familiaris";   // class attribute: shared, immutable
  static population = 0;                 // class attribute used as a counter

  constructor(name) {
    this.name = name;                    // instance attribute: per object
    this.tricks = [];                    // mutable per-object data belongs HERE
    Dog.population += 1;                 // `Dog.`, not `this.`, to write the class attr
  }
}


class Circle {
  constructor(radius) {
    this.radius = radius;                // through the setter, so validation applies
  }

  get radius() {                         // getter -- defined first
    return this._radius;
  }

  set radius(value) {                    // setter -- same name as the getter
    if (value < 0) {
      throw new Error("radius cannot be negative");
    }
    this._radius = value;
  }

  get area() {                           // no setter => read-only, computed fresh
    return Math.PI * this._radius ** 2;
  }
}
```

| Idea | One-line version |
|---|---|
| Instance attribute | Set via `this.x` in the constructor; one per object |
| Class attribute | `static` in the class body; one shared by all |
| **Lookup rule** | Read: object first, then class. **Write: always the object** |
| `rex.species = x` | Creates an instance shadow; never changes the class value |
| `this.count += 1` | Silently makes a per-object shadow — counter stays at 0 |
| `Dog.count += 1` | Correct way to update a shared counter |
| Mutable class attribute | Shared by everyone, no assignment needed to leak. Put it in the constructor |
| `get` / `set` | Make property access run a method; caller syntax unchanged (`c.radius`) |
| Setter | Adds validation on write; getter must be defined first |
| Getter with no setter | Read-only: `TypeError: ... has only a getter` |
| **constructor gotcha** | Assign `this.radius`, not `this._radius`, or validation is bypassed |
| `_name` | Convention for "internal" — advisory, not enforced |

---

## Self-Check

- [ ] What decides whether an attribute is per-object or shared — a keyword, or where you wrote it?
- [ ] State the lookup rule for reads, and the rule for writes.
- [ ] Why does `this.population += 1` leave `Dog.population` at `0`?
- [ ] Why is a class-level `tricks = []` shared even though `learn()` contains no `=`?
- [ ] How can `new Circle(-5)` succeed when `c.radius = -5` throws? What's the fix?
- [ ] How do you make a property read-only, and what error does assigning give?

---

## 📚 Resources

- **MDN:** [Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- **MDN:** [static](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static)
- **MDN:** [getter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get) / [setter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set) — pairs with Part 4
- **Eloquent JavaScript:** [Chapter 6 — The Secret Life of Objects](https://eloquentjavascript.net/06_object.html)

---

## 🧠 Try It Yourself

Open `exercises.js` in this folder:

1. Add a class attribute `static species` to `Dog`, confirm two dogs share it, then override it on one and check the other and the class are untouched (Part 2.3).
2. Add a `static population` counter incremented in the constructor. Do it with `this.population += 1` first, print `Dog.population`, and see it stuck at `0` — then fix it with `Dog.population += 1` (Part 2.4).
3. Implement `Circle` with a validated `radius` accessor (getter + setter) and a read-only `area`. Confirm a negative radius throws (Part 4.3, 4.5).
4. Now try `new Circle(-5)`. If it succeeds, you have the Part 4.4 bug — fix the constructor to assign through the property, and confirm it now throws.
5. Try `c.area = 100` and record the exact error message in a comment (Part 4.5).
6. In a comment, explain the difference between `this.name = "X"` and `Dog.species = "X"` inside a method, and what each actually affects (Part 2.3).
