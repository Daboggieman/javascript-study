# JavaScript OOP Practice — Beginner to Intermediate

A progression of 14 exercises. Do them roughly in order — each tier assumes you're comfortable with the previous one. For every exercise: write it with plain classes first, get it working, *then* go back and apply the "refactor notes" at the end of each exercise. That second pass is where OOP actually clicks.

---

## Tier 1 — Beginner (classes, methods, basic inheritance)

### 1. Bank Account

Build a `BankAccount` class that tracks a balance and a history of transactions.

**Requirements**
- `constructor(owner, balance = 0)`
- `deposit(amount)` — rejects amounts ≤ 0
- `withdraw(amount)` — throws on insufficient funds or amount ≤ 0
- `getBalance()`
- `getHistory()` — returns an array of strings like `"Deposited 50"`, `"Withdrew 20"`

**Starter skeleton**
```js
class BankAccount {
  constructor(owner, balance = 0) {
    this.owner = owner;
    this.balance = balance;
    this._history = [];
  }

  deposit(amount) {
    // Write your solution here
  }

  withdraw(amount) {
    // Write your solution here
  }
}
```

**Expected behavior**
```js
const acc = new BankAccount("Raph'el", 100);
acc.deposit(50);
acc.withdraw(30);
console.log(acc.getBalance());     // 120
console.log(acc.getHistory());     // ["Deposited 50", "Withdrew 30"]
acc.withdraw(1000);                // throws
```

**Edge cases to handle:** negative deposit, negative withdrawal, withdrawal exceeding balance, depositing/withdrawing 0.

**Refactor note:** once it works, make `balance` "private" (`_balance`) and expose it through a `get balance()` accessor (see Tier 2, Exercise 8) so it can't be set directly from outside.

---

### 2. Shape: Rectangle → Square

**Requirements**
- `Rectangle` class with `width`, `height`, `area()`, `perimeter()`
- `Square extends Rectangle` subclass — constructor only takes `side`, calls `super(side, side)`

**Starter skeleton**
```js
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  area() {
    // Write your solution here
  }

  perimeter() {
    // Write your solution here
  }
}

class Square extends Rectangle {
  constructor(side) {
    super(side, side);   // <-- the crucial bit
  }
}
```

**Expected behavior**
```js
const r = new Rectangle(4, 5);
console.log(r.area(), r.perimeter());   // 20 30

const s = new Square(4);
console.log(s.area(), s.perimeter());   // 16 16
console.log(s instanceof Rectangle);  // true
```

**Stretch:** add a `describe()` method on `Rectangle` that returns `"Rectangle 4x5, area=20"` — don't override it in `Square`, and notice it still works correctly because it reads `this.width`/`this.height`.

---

### 3. Library Book Tracker

**Requirements**
- `Book` class: `title`, `author`, `isbn`, `isCheckedOut` (default `false`)
- `Library` class: holds an array of `Book` objects
  - `addBook(book)`
  - `checkout(isbn)` — marks checked out, throws if already out or not found
  - `returnBook(isbn)`
  - `listAvailable()` — returns titles of books not checked out

**Expected behavior**
```js
const lib = new Library();
lib.addBook(new Book("Dune", "Frank Herbert", "111"));
lib.addBook(new Book("1984", "George Orwell", "222"));

lib.checkout("111");
console.log(lib.listAvailable());   // ["1984"]
lib.checkout("111");                // throws -- already checked out
lib.returnBook("111");
console.log(lib.listAvailable());   // ["Dune", "1984"]
```

**Edge cases:** checkout/return an ISBN that doesn't exist.

---

### 4. Employee Payroll

**Requirements**
- `Employee` base class: `name`, `calculatePay()` — throw in the base
- `HourlyEmployee extends Employee`: `hoursWorked`, `hourlyRate` → pay = hours × rate (1.5× rate for hours over 40)
- `SalariedEmployee extends Employee`: `annualSalary` → pay = salary / 12 (monthly)

**Expected behavior**
```js
const h = new HourlyEmployee("Ada", 45, 20);
console.log(h.calculatePay());   // 40*20 + 5*30 = 950

const s = new SalariedEmployee("Grace", 120000);
console.log(s.calculatePay());   // 10000

const employees = [h, s];
for (const e of employees) {
  console.log(e.name, e.calculatePay());   // polymorphism -- same call, different behavior
}
```

---

## Tier 2 — Intermediate: inheritance, polymorphism, encapsulation

### 5. Shape Hierarchy (no abstract classes in JS)

**Requirements**
- In Python, use `abc.ABC` and `@abstractmethod` to make `Shape` un-instantiable. **JS has no `abstract` keyword** — mimic the contract by throwing in the base method (see `curriculum/06_polymorphism/lecture.md` Part 1.4).
- Implement `Circle`, `Triangle` (by three sides, use Heron's formula), `Rectangle`.
- Write `totalArea(shapes)` that sums `.area()` over a mixed list.

**Starter skeleton**
```js
class Shape {
  area() {
    throw new Error("Subclasses must implement area()");
  }

  perimeter() {
    throw new Error("Subclasses must implement perimeter()");
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }
  // Write your solution here
}

class Triangle extends Shape {
  constructor(a, b, c) {
    super();
    this.a = a;
    this.b = b;
    this.c = c;
  }
  // Write your solution here: Heron's formula for area
}
```

**Expected behavior**
```js
const shapes = [new Circle(3), new Triangle(3, 4, 5), new Rectangle(4, 5)];
console.log(Math.round(totalArea(shapes) * 100) / 100);   // ~ 68.27
```

**Edge case:** Triangle with sides that don't form a valid triangle — throw in the constructor.

---

### 6. Vehicle Rental System

**Requirements**
- `Vehicle` base: `make`, `model`, `dailyRate`, `calculateCost(days)`
- `Car`, `Motorcycle`, `Truck` — `Truck` adds a flat $50/day surcharge; others just use `dailyRate * days`
- `Customer` class: `name`, `rentalHistory` (array)
- `Rental` class: composes a `Vehicle` + `Customer` + `days`; `totalCost()` delegates to the vehicle

**Expected behavior**
```js
const truck = new Truck("Ford", "F150", 80);
const cust = new Customer("Raph'el");
const rental = new Rental(truck, cust, 3);
console.log(rental.totalCost());   // 80*3 + 50*3 = 390
```

**This is the key exercise for practicing composition:** `Rental` doesn't inherit from `Vehicle` or `Customer` — it *has* them.

---

### 7. Zoo Simulation

**Requirements**
- `Animal` base: `name`, `makeSound()` (throw)
- `Dog`, `Cat`, `Snake` subclasses each override `makeSound()`
- `Zoo` class: list of animals, `makeAllSounds()` iterates and calls each `makeSound()`

**Expected behavior**
```js
const zoo = new Zoo([new Dog("Rex"), new Cat("Milo"), new Snake("Kaa")]);
zoo.makeAllSounds();
// Rex says Woof!
// Milo says Meow!
// Kaa says Hiss!
```

Simple, but it's the cleanest possible demo of polymorphism — the loop never checks `instanceof`, it just calls `.makeSound()`.

---

---

### 8. Temperature Converter with accessors

**Requirements**
- `Temperature` stores Celsius internally as `_celsius`
- `celsius` is an accessor pair (get/set)
- `fahrenheit` is also an accessor pair: getter converts C→F, **setter** converts the incoming F value back to C and stores it
- Setting either one should update the other consistently

**Starter skeleton**
```js
class Temperature {
  constructor(celsius = 0) {
    this._celsius = celsius;
  }

  get celsius() {
    return this._celsius;
  }

  set celsius(value) {
    // Write your solution here: maybe validate value > -273.15
  }

  get fahrenheit() {
    // Write your solution here
  }

  set fahrenheit(value) {
    // Write your solution here: convert F to C, store in this._celsius
  }
}
```

**Expected behavior**
```js
const t = new Temperature(25);
console.log(t.fahrenheit);        // 77
t.fahrenheit = 98.6;
console.log(Math.round(t.celsius * 10) / 10);  // 37
t.celsius = -300;   // should throw (below absolute zero)
```

---

### 9. Inventory Item with Validation

**Requirements**
- `InventoryItem`: `name`, `_price`, `_quantity` — both exposed via accessors
- Setters reject negative values (throw)
- `totalValue()` = price × quantity
- `restock(amount)` and `sell(amount)` — `sell` throws if amount > current quantity

**Expected behavior**
```js
const item = new InventoryItem("Widget", 9.99, 10);
item.sell(3);
console.log(item.quantity);        // 7
item.price = -5;                   // throws
item.sell(100);                    // throws -- not enough stock
```

---

## Tier 3 — Intermediate: "dunder"-style methods, operator behavior, design patterns

### 10. Vector2D

**Requirements** — implement so instances behave like numbers. Python uses `__add__` / `__sub__` / `__eq__` / `__lt__`; JS has no operator overloading, so these become explicit methods (plus a `valueOf` so `+` can do vector addition if you want a taste of the Python feel):
- `add`, `sub`, `scale` (scalar multiply)
- `equals` (content equality)
- `toString` → `"Vector2D(3, 4)"`
- `magnitude()` = `Math.sqrt(x**2 + y**2)`, and a `lessThan(other)` comparing by magnitude
- Bonus: `valueOf` returns magnitude (what Python's `__abs__`-ish feels like in JS)

**Expected behavior**
```js
const v1 = new Vector2D(1, 2);
const v2 = new Vector2D(3, 4);
console.log(v1.add(v2).toString());          // Vector2D(4, 6)
console.log(v2.sub(v1).toString());          // Vector2D(2, 2)
console.log(v1.scale(3).toString());         // Vector2D(3, 6)
console.log(v1.equals(new Vector2D(1, 2)));  // true
console.log([v2, v1].sort((a, b) => a.lessThan(b) ? -1 : 1)[0].toString());  // v1 first (by magnitude)
```

---

### 11. Custom Stack (JS style)

**Requirements** — implement `Stack` so it works naturally:
- `push(item)`, `pop()`, `peek()`
- `get size()` — so `stack.size` works (Python's `len(stack)`)
- `has(item)` — so `stack.has(2)` checks membership (Python's `2 in stack`)
- `[Symbol.iterator]()` — so `for (const x of stack)` works, iterating top to bottom
- `toString`

**Expected behavior**
```js
const s = new Stack();
s.push(1); s.push(2); s.push(3);
console.log(s.size);          // 3
console.log(s.has(2));        // true
for (const x of s) {
  console.log(x);            // 3, 2, 1
}
console.log(s.pop());         // 3
```

---

### 12. Restaurant Order System (composition-focused)

**Requirements**
- `MenuItem`: `name`, `price`
- `Order`: composes a list of `MenuItem`s, `addItem()`, `removeItem()`, `subtotal()`
- `Receipt`: takes an `Order`, applies a tax rate, produces a formatted string via `toString`

**Expected behavior**
```js
const order = new Order();
order.addItem(new MenuItem("Jollof Rice", 8.5));
order.addItem(new MenuItem("Suya", 5.0));
const receipt = new Receipt(order, 0.075);
console.log(receipt.toString());
// Jollof Rice        $8.50
// Suya                $5.00
// Subtotal:          $13.50
// Tax:                $1.01
// Total:              $14.51
```

**Why this one matters:** it's tempting to make `Receipt` extend `Order` — resist it. A receipt *has* an order, it isn't a kind of order. Composition over inheritance.

---

### 13. Observer Pattern — Notification System

**Requirements**
- `Subscriber` (interface-ish): `update(message)`
- `EmailSubscriber`, `SMSSubscriber` implement `update()` differently (just `console.log` differently)
- `Publisher`: `subscribe(sub)`, `unsubscribe(sub)`, `notifyAll(message)` — calls `update()` on every subscriber

**Expected behavior**
```js
const pub = new Publisher();
pub.subscribe(new EmailSubscriber("raphel@example.com"));
pub.subscribe(new SMSSubscriber("+234..."));
pub.notifyAll("Server is down!");
// [EMAIL to raphel@example.com]: Server is down!
// [SMS to +234...]: Server is down!
```

This is a real design pattern (Observer) — the same shape shows up in GUI event handling, pub/sub systems, and reactive programming.

---

### 14. State Machine — Order Status

**Requirements**
- Each state (`Pending`, `Shipped`, `Delivered`, `Cancelled`) is its own class implementing a common interface (e.g. `next(order)`, `cancel(order)`)
- `Order` holds a reference to its current state object and delegates transitions to it
- Invalid transitions (e.g. `Delivered` → `Shipped`) should throw or simply be no-ops — your call, but be consistent

**Expected behavior**
```js
const order = new Order();
console.log(order.status);     // "Pending"
order.next();                   // Pending -> Shipped
order.next();                   // Shipped -> Delivered
console.log(order.status);      // "Delivered"
order.cancel();                 // should fail/no-op -- can't cancel a delivered order
```

This one's harder to get "clean" — the point is that `Order` never has a big `if/else` chain checking its own status. All the transition logic lives inside the state classes.

---

## Suggested order of attack

1. Do 1–4 without looking at the starter skeletons if you can.
2. For 5–9, read the starter code, then implement — these introduce the JS "throw-in-the-base" contract, accessors, and composition, which are the concepts most devs get rusty on.
3. For 10–14, don't peek at the expected output until you've got something running — "dunder"-style methods and design patterns are best learned by getting the `TypeError`s and fixing them.

If you want, once you've done a few, send me your code for one and I'll review it like a PR — that's usually where the real learning happens.
