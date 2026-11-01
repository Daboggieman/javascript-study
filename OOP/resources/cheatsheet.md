# 🧱 OOP Cheatsheet

A comprehensive quick-reference for Object-Oriented Programming in JavaScript. Pairs with `OOP/curriculum/` (theory) and `OOP/quest/` (practice problems).

---

## 1. Classes and Objects

```js
class Dog {}

const myDog = new Dog();          // an instance (object) of class Dog
console.log(typeof myDog);        // "object"
console.log(myDog instanceof Dog); // true
```
A **class** is a blueprint. An **object**/**instance** is a specific thing built from it. Every value in JS (number, string, array, even functions) is an object or primitive of some kind.

## 2. The `constructor` Method

```js
class Dog {
  constructor(name, age = 0) {
    this.name = name;
    this.age = age;
  }
}

const rex = new Dog("Rex", 3);    // constructor runs automatically at creation
```
- Runs automatically when you write `new ClassName(...)`.
- Supports default arguments like any function. In JS, defaults are evaluated **fresh per call** (no shared-mutable-default trap).
- Always write attributes with `this.` (the JS twin of Python's `self.`), or they silently do nothing.

## 3. The `this` Parameter

```js
class Dog {
  bark() {
    console.log(`${this.name} says Woof!`);
  }
}

rex.bark();                          // shorthand for...
Dog.prototype.bark.call(rex);       // ...this: `rex` is passed automatically as `this`
```

`this` = "the specific object this method was called on." It's supplied by *the call* — detach the method (`const f = rex.bark; f()`) and `this` becomes `undefined`.

## 4. Class Properties (Attributes)

```js
class Dog {
  static species = "Canis familiaris";   // CLASS attribute -- shared by all instances

  constructor(name) {
    this.name = name;                    // INSTANCE attribute -- unique per object
  }
}
```

| | Class attribute (`static`) | Instance attribute |
|---|---|---|
| Defined | In the class body, with `static` | Inside `constructor` via `this.x = ...` |
| Shared? | Yes, by all instances | No, unique per object |
| Update for everyone | `ClassName.attr = x` | n/a |
| Pitfall | `instance.attr = x` creates a NEW instance attribute, shadowing the class one | — |

**`get` / `set` — controlled attribute access:**
```js
class Circle {
  constructor(radius) {
    this.radius = radius;              // write through the setter, so validation applies
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

  get area() {                         // read-only, no setter
    return Math.PI * this._radius ** 2;
  }
}
```

## 5. Static Methods

```js
class Dog {
  static population = 0;

  constructor(name, age) {
    this.name = name;
    this.age = age;
    Dog.population += 1;
  }

  static fromBirthYear(name, birthYear, currentYear = 2026) {
    return new this(name, currentYear - birthYear);   // alternative constructor
  }

  static isValidAge(age) {
    return age >= 0 && age <= 30;                     // no object needed
  }
}
```

| Type | Called via | Sees instance data | Sees class data | Typical use |
|---|---|---|---|---|
| Instance method | `obj.method()` | Yes | Yes | Normal behavior |
| `static` method | `ClassName.method()` | No | Yes | Alternative constructors, class-wide counters |
| (static helper) | `ClassName.helper()` | No | No | Grouped utility functions |

> In JS, `static` methods are **not** callable on instances (unlike Python's `@classmethod`/`@staticmethod`, which are).

## 6. Polymorphism (and Inheritance)

```js
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    throw new Error("Subclasses must implement speak()");
  }
}

class Dog extends Animal {
  speak() {
    return `${this.name} says Woof!`;
  }
}

class Cat extends Animal {
  speak() {
    return `${this.name} says Meow!`;
  }
}

for (const a of [new Dog("Rex"), new Cat("Whiskers")]) {
  console.log(a.speak());    // same call, different behavior per object
}
```

**`super`** — call the parent's version of a method (extend, don't replace):
```js
class Dog extends Animal {
  describe() {
    return `${super.describe()}, a good dog`;
  }
}
```

**Duck typing** — no shared parent class required:
```js
class Robot {
  speak() {
    return "BEEP BOOP";
  }
}

for (const thing of [new Dog("Rex"), new Robot()]) {
  console.log(thing.speak());   // works fine, JS only cares that speak() exists
}
```

---

## JS "Dunder"-Style Method Quick Reference

JS has no `__dunder__` names, but the built-ins are hooks you can override the same way:

| JS hook | Triggered by | Example use |
|---|---|---|
| `constructor` | `new ClassName(...)` | Set up instance attributes |
| `toString()` | `String(obj)`, template literals | Human-readable string |
| `get length` / `valueOf()` | property reads, numeric coercion (`+obj`) | Custom length / value |
| custom `[Symbol.toPrimitive]` | `obj + x`, `obj < x` | Custom operator behavior |
| `[Symbol.iterator]` | `for (const x of obj)` | Make an object iterable |
| `get [Symbol.toStringTag]` | `Object.prototype.toString.call(obj)` | Custom tag |

```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return `Point(${this.x}, ${this.y})`;
  }

  equals(other) {
    return this.x === other.x && this.y === other.y;
  }
}

const p1 = new Point(1, 2);
const p2 = new Point(1, 2);
console.log(`${p1}`);        // Point(1, 2)  -- uses toString()
console.log(p1.equals(p2));  // true         -- custom "equality" method
```

> Note: JS has no built-in `==` equality-by-content for objects — write an `equals()` method (as above) or a `valueOf()`.

---

## Encapsulation Quick Reference (naming conventions)

| Prefix | Convention meaning |
|---|---|
| `name` | Public — freely accessible |
| `_name` | "Internal use" — please don't touch directly, but not enforced |
| `#name` | True private field, enforced by the language (JS-only, `#radius`) |

JS gives you `_name` (advisory convention, like Python) *and* `#name` (a real enforced private field that Python's `__name` mangling only approximates).

---

## 📚 More Resources

See `OOP/resources/links.md` for the full curated list of MDN pages, YouTube videos, and articles referenced throughout every `OOP/curriculum/` lesson.
