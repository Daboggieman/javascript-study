# 21: The `JSON` Object

**JSON** (JavaScript Object Notation) is the universal data format for web APIs, config files, and data interchange between different programming languages. JavaScript is JSON's home language — the global `JSON` object (no require needed) converts between JSON text and native JavaScript values (objects, arrays, strings, numbers).

---

## 1. The Two Directions

| Direction | Method | Memory device |
|---|---|---|
| JS object → JSON string | `JSON.stringify()` | string**ify** |
| JSON string → JS object | `JSON.parse()` | parse the text |

(Python splits "to/from string" and "to/from file" into four functions — `dumps`/`loads`/`dump`/`load`. JavaScript has just two; files are handled by combining with `fs`.)

```js
const data = { name: "Ada", age: 30, active: true, tags: ["dev", "admin"] };

const jsonString = JSON.stringify(data);
console.log(jsonString);
console.log(typeof jsonString);  // string

const parsed = JSON.parse(jsonString);
console.log(parsed.name);        // Ada
console.log(typeof parsed);      // object
```

---

## 2. Working with Files

```js
const fs = require("node:fs");

const data = { name: "Ada", age: 30 };

// Write to a JSON file (stringify first, then write the string)
fs.writeFileSync("person.json", JSON.stringify(data));

// Read from a JSON file (read the string, then parse it)
const loaded = JSON.parse(fs.readFileSync("person.json", "utf8"));
console.log(loaded);
```

---

## 3. Formatting Options

```js
const data = { b: 2, a: 1, c: [1, 2, 3] };

console.log(JSON.stringify(data, null, 2));  // pretty-printed, human-readable
```

`stringify` takes two extra arguments: a *replacer* (usually `null`) and the number of *indent spaces*. There is no `sort_keys` option — object keys keep their insertion order. To sort, build a sorted copy first:

```js
const sortedData = Object.fromEntries(Object.entries(data).sort(([a], [b]) => a.localeCompare(b)));
console.log(JSON.stringify(sortedData, null, 2));
```

---

## 4. Type Conversion Table

| JavaScript | JSON |
|---|---|
| object `{}` | object `{}` |
| array `[]` | array `[]` |
| string | string |
| `number` (int or decimal) | number |
| `true` / `false` | `true` / `false` |
| `null` | `null` |

**Important gotchas:**
- `undefined` is **not valid JSON** — `JSON.stringify({ a: undefined, b: 2 })` silently *drops* the key. Use `null` for "no value".
- `NaN` and `Infinity` become `null` in JSON.
- A `Date` object is stringified as an ISO text string (`"1990-01-01T00:00:00.000Z"`) and does **not** come back as a `Date` — you must re-wrap it with `new Date(str)`.
- JSON requires **double quotes** for strings and keys, and no trailing commas.

---

## 5. Handling Errors: Invalid JSON

```js
const badJson = "{name: 'Ada'}";   // invalid JSON -- unquoted key, single quotes for value

try {
  const data = JSON.parse(badJson);
} catch (err) {
  console.log(`Invalid JSON: ${err.message}`);
}
```

Always wrap `JSON.parse()` in a `try/catch` when the JSON comes from an external, untrusted, or unpredictable source (a network request, a user-uploaded file) — malformed JSON throws a `SyntaxError` and is extremely common in the real world.

---

## 6. Custom Objects: `toJSON` (and Manual Conversion)

`JSON.stringify()` doesn't know how to serialize class instances usefully — a `Person` would become `{}` (only its own enumerable fields, and a `Date` field becomes a plain string). Tell it how with a `toJSON` method:

```js
class Person {
  constructor(name, birthday) {
    this.name = name;
    this.birthday = birthday;   // a Date object
  }

  toJSON() {
    return { name: this.name, birthday: this.birthday.toISOString().slice(0, 10) };
  }
}

const p = new Person("Ada", new Date(1990, 0, 1));
console.log(JSON.stringify(p));  // {"name":"Ada","birthday":"1990-01-01"}
```

(`stringify` calls `toJSON` automatically if it exists.) Deserialization is always manual — write a `static fromJSON(obj)` method that reconstructs the class from the parsed object.

---

## 📚 Resources

- **MDN:** [JSON.stringify()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)
- **MDN:** [JSON.parse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)
- **MDN:** [Working with JSON](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON)

---

## 🧠 Try It Yourself

1. Convert a nested object (with arrays and booleans inside) to a JSON string with `indent 2`, then parse it back and confirm the round trip preserves the data.
2. Write a small config file to disk with `JSON.stringify` + `fs.writeFileSync`, then read it back with `JSON.parse` + `fs.readFileSync` in a separate run of your script.
3. Deliberately pass malformed JSON to `JSON.parse()` and catch the `SyntaxError`, printing a friendly error message instead of crashing.
4. Write a `toJSON` method for a custom `Person` class (with a `name` and a `Date` birthday) that serializes the date as `"YYYY-MM-DD"`.
