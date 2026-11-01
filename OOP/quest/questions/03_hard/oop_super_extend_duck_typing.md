# OOP — Super, Extend, and Duck Typing

**Tier:** 03_hard
**Write your answer in:** `OOP/quest/answers/oop_super_extend_duck_typing.js`
**Allowed:** builtins only — no imports needed.

---

## Goal

Build a small payroll model that shows the **two different ways** JavaScript lets unrelated
objects respond to the same method call:

| Route | How it works | Which classes here |
|---|---|---|
| **Inheritance polymorphism** | A subclass overrides a parent's method | `Employee` → `Manager` |
| **Duck typing** | An unrelated class just *has* the same method name | `Contractor` |

The payoff: one loop calls `p.paySummary()` on all three, and each responds correctly —
even though `Contractor` shares no parent with the other two.

**Concepts used:** inheritance, method overriding, `super`, duck typing
— see [`curriculum/06_polymorphism/lecture.md`](../../../curriculum/06_polymorphism/lecture.md).

---

## Build It In Steps

Do these in order and run after each one. Don't write all three classes at once.

### Step 1 — `Employee` (the base class)

```js
class Employee {
  constructor(name, baseSalary) { /* ... */ }
  paySummary() { /* ... */ }
}
```

- The constructor stores `name` and `baseSalary` on `this`.
- `paySummary()` **returns** (does not print) the string:
  `"Sam: base $50000"` for `new Employee("Sam", 50000)`

  Format: `` `${this.name}: base $${this.baseSalary}` ``

**Checkpoint:** `console.log(new Employee("Sam", 50000).paySummary())` → `Sam: base $50000`

### Step 2 — `Manager` (subclass, uses `super` twice)

```js
class Manager extends Employee {
  constructor(name, baseSalary, bonus) { /* ... */ }
  paySummary() { /* ... */ }
}
```

This is the heart of the exercise — `super` is used in **two separate places**:

1. In the constructor, call `super(name, baseSalary)` to let the parent store
   `name` and `baseSalary`, then store `bonus` yourself. Don't re-assign
   `this.name` by hand — the whole point of `super()` is to not repeat the parent's work.
2. In `paySummary`, call `super.paySummary()` to get the parent's string,
   then **append** to it:

   `` ` + bonus $${this.bonus}` ``

**Checkpoint:** `console.log(new Manager("Ada", 70000, 5000).paySummary())`
→ `Ada: base $70000 + bonus $5000`

Notice you never rewrote `"...: base $..."` in `Manager` — you reused it. That reuse
is what `super` buys you: change the format once in `Employee` and `Manager` follows.

### Step 3 — `Contractor` (no parent at all)

```js
class Contractor {            // <-- does NOT extend Employee
  constructor(name, hourlyRate) { /* ... */ }
  paySummary() { /* ... */ }
}
```

- The constructor stores `name` and `hourlyRate`.
- `paySummary()` returns:
  `` `${this.name}: contractor at $${this.hourlyRate}/hr` ``

`Contractor` has **no relationship** to `Employee` — no shared parent, no inheritance.
The only thing it shares is a method *name*. That is enough for the loop below to work,
and that is duck typing: *"if it has a `paySummary()`, I can call `paySummary()` on it."*

---

## Test Program

```js
const people = [
  new Employee("Sam", 50000),
  new Manager("Ada", 70000, 5000),
  new Contractor("Lee", 80),
];
for (const p of people) {
  console.log(p.paySummary());
}
```

## Expected Output

```text
Sam: base $50000
Ada: base $70000 + bonus $5000
Lee: contractor at $80/hr
```

---

## Hints

<details>
<summary>Hint 1 — `super` in the constructor</summary>

```js
class Manager extends Employee {
  constructor(name, baseSalary, bonus) {
    super(name, baseSalary);   // parent sets this.name, this.baseSalary
    this.bonus = bonus;        // then add what's new to Manager
  }
}
```
Note there's no `this` inside the `super(...)` call — `super()` already
knows which object it's working on.
</details>

<details>
<summary>Hint 2 — `super` in an overriding method</summary>

`super.paySummary()` runs `Employee`'s version and hands you back its **return value**.
Capture it, then build on it:

```js
paySummary() {
  const base = super.paySummary();      // "Ada: base $70000"
  return `${base} + bonus $${this.bonus}`;
}
```
</details>

<details>
<summary>Hint 3 — why the loop works at all</summary>

JS does not check types before calling `p.paySummary()`. At each iteration it looks
up `paySummary` on whatever object `p` currently is, and calls what it finds. Three
different classes, three different method bodies, one call site.
</details>

---

## Common Mistakes

- **Printing instead of returning.** Every `paySummary` must `return` a string. If it
  prints, the test loop's `console.log` will show `undefined` on each line.
- **Making `Contractor` extend `Employee`.** That defeats the entire point — the
  exercise exists to show a class with *no* shared parent still works.
- **Re-writing the base string inside `Manager.paySummary`.** If your `Manager` contains
  the literal text `": base $"`, you skipped `super`. Build on the parent's return value.
- **Calling `super(name, baseSalary)` wrong.** Pass the constructor args, **not**
  `this` — `this` isn't available to pass, and `super(...)` supplies the object itself.
- **Forgetting `extends Employee`:** `class Manager extends Employee`, not
  `class Manager`. Without it `super` has no parent to reach and `Manager` has no
  inherited `paySummary`.

---

## Stretch Goal (optional)

Add a fourth class `Intern` that duck-types `paySummary()` returning
`"<name>: unpaid intern"`, append one to the `people` array, and confirm the loop needs
**no changes at all** to handle it. That "no changes at all" is the practical value of
polymorphism: new types plug into existing loops.
