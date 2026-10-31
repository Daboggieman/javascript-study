# Lecture 03: Strings

Strings are collections of characters. They are one of the most commonly used data types in JavaScript.

---

## 1. Creating Strings
In JavaScript, strings can be enclosed in single quotes (`'`), double quotes (`"`), or backticks (`` ` ``):

```js
const simpleString = 'Hello';
const anotherString = "JavaScript";
const templateString = `Hello again`;
```

This flexibility allows you to include quotes inside strings easily:
```js
const quote = "He said, 'JavaScript is amazing!'";
const contraction = 'It is not a problem.';
```

---

## 2. String Concatenation and Repetition
You can combine strings using the `+` operator, and repeat them using the `.repeat()` method:

```js
// Concatenation
const greeting = "Hello" + " " + "World!";  // "Hello World!"

// Repetition
const echo = "Hello! ".repeat(3);  // "Hello! Hello! Hello! "
```

---

## 3. String Methods
JavaScript provides many built-in methods to perform operations on strings. Note that strings in JavaScript are **immutable** (they cannot be changed in place), so string methods always return a *new* string.

```js
const name = "ada lovelace";

// Upper and Lower Case
console.log(name.toUpperCase());  // Output: ADA LOVELACE
console.log(name.toLowerCase());  // Output: ada lovelace
```

**Callout**: JavaScript has no built-in "title case" method like Python's `.title()`. You can build one with `.split(" ")`, `.map()`, and `.toUpperCase()` — a good exercise once you have learned arrays and loops.

### Removing Whitespace
```js
const favoriteLanguage = " javascript ";

console.log(favoriteLanguage.trim());      // "javascript" (removes from both ends)
console.log(favoriteLanguage.trimStart()); // "javascript " (removes from left)
console.log(favoriteLanguage.trimEnd());   // " javascript" (removes from right)
```

---

## 4. Template Literals (f-strings of JavaScript)
Template literals are the cleanest and most readable way to insert variables into strings.

To create a template literal, wrap the string in backticks and place variables or expressions inside `${...}`:

```js
const firstName = "ada";
const lastName = "lovelace";
const fullName = `${firstName} ${lastName}`;

console.log(`Hello, ${fullName.replace(/\b\w/g, (c) => c.toUpperCase())}!`);
// Output: Hello, Ada Lovelace!
```

You can also run code inside the curly braces:
```js
console.log(`2 + 2 = ${2 + 2}`);  // Output: 2 + 2 = 4
```

---

## 5. String Slicing and Indexing
You can access individual characters in a string using square brackets `[]` and indices (starting at 0).

```js
const s = "JavaScript";

console.log(s[0]);                  // "J" (first character)
console.log(s[s.length - 1]);       // "t" (last character)
```

**Callout**: JavaScript has no negative indexing — `s[-1]` is `undefined`, not the last character! Use `s[s.length - 1]` instead.

You can extract a substring using the **`.slice()`** method:
```js
console.log(s.slice(0, 3));  // "Jav" (indices 0, 1, 2. Stop index 3 is not included)
console.log(s.slice(2));     // "vaScript" (from index 2 to the end)
console.log(s.split("").reverse().join(""));  // "tpircSavaJ" (reverses the string!)
```

---

## 🧠 Try It Yourself
1. Store a person's name in a variable, and include some whitespace characters at the beginning and end of their name (e.g., using `\t` and `\n`).
2. Print the name once, so the whitespace around the name is displayed. Then print the name using each of the three stripping methods: `.trimStart()`, `.trimEnd()`, and `.trim()`.
