# Final Project: Bar Tab & Order Tracker

Build a Command Line Interface (CLI) application to manage customer tabs and orders at a bar or restaurant.

---

## Requirements

### 1. Data Models
Create a `Tab` class to represent a single table or customer's bar tab:
- **Properties**:
  - `tableName` (string)
  - `orders` (object where keys are items and values are objects of quantity and price: `{item: {"quantity": int, "price": float}}`)
  - `taxRate` (float, default `0.10` or 10%)
  - `serviceCharge` (float, default `0.05` or 5%)
- **Methods**:
  - `addItem(item, price, quantity = 1)`: Adds items to the tab. If the item already exists, increment the quantity.
  - `calculateSubtotal()`: Returns sum of item prices * quantity.
  - `calculateTax()`: Returns subtotal * taxRate.
  - `calculateServiceCharge()`: Returns subtotal * serviceCharge.
  - `calculateTotal()`: Returns subtotal + tax + serviceCharge.
  - `printBill()`: Returns a formatted string representing the bill receipt.

### 2. File Persistence
- When a bill is printed or when the user exits, save the tab information as a JSON file in a `tabs/` folder so it can be reloaded later (use `fs.writeFileSync` + `JSON.stringify`).
- Create a function to load existing tabs from JSON files (use `fs.readFileSync` + `JSON.parse`).

### 3. User Interface (CLI Menu)
Create an interactive CLI loop (`node:readline/promises`):
- Option 1: Create a new tab.
- Option 2: Add items to an existing tab.
- Option 3: View current status of a tab.
- Option 4: Print/Close a tab (calculates totals, prints bill, and saves to file).
- Option 5: Exit.

### 4. Code Modularity
- Split your code into modules (CommonJS):
  - `tab.js`: Contains the `Tab` class (`module.exports`).
  - `menu.js`: Main CLI script.
  - `test_tab.js`: Unit tests for the `Tab` class (node:test + node:assert).

---

## Starter Code Hints

### `tab.js`
```js
class Tab {
  constructor(tableName, tax = 0.10, service = 0.05) {
    this.tableName = tableName;
    this.orders = {};
    this.taxRate = tax;
    this.serviceCharge = service;
  }

  addItem(item, price, quantity = 1) {
    if (item in this.orders) {
      this.orders[item].quantity += quantity;
    } else {
      this.orders[item] = { price, quantity };
    }
  }

  // Implement calculations and printBill methods...
}

module.exports = Tab;
```

### `test_tab.js`
Write unit tests using `node:test` to ensure that adding items and calculating subtotals/totals works correctly (run with `node --test`).

---

## 🚀 How to Complete
1. Build `tab.js` and write the test suite in `test_tab.js`.
2. Ensure all tests pass.
3. Build the interactive CLI loop in `menu.js`.
4. Validate user inputs (e.g. handle non-numeric values when entering quantity).
