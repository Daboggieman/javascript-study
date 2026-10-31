# Lecture 10b: File Access, Reading, and Writing

This lesson focuses on working with files in Node.js: opening them, reading data, writing data, and using the operating system to manage files.

---

## 1. File Paths and Access
A file path tells Node.js where to find a file. It can be:
- **relative**: `data/sample.txt`
- **absolute**: `/home/user/data/sample.txt`

Use the built-in `fs` module to access files.

```js
const fs = require("node:fs");
const content = fs.readFileSync("notes.txt", "utf8");
```

Common flags (the analog of Python's file modes):
- `r` — read (default)
- `w` — write (creates or overwrites)
- `a` — append (add to end)
- `x` — create (fails if file exists — `wx`)
- `r+` — read and write (`r+`)

```js
fs.readFileSync("notes.txt", { encoding: "utf8", flag: "r" });
```

**Callout**: Relative paths in Node resolve against the directory you *ran* `node` from, not the script's location. To anchor to the script, build paths with `__dirname`:
```js
const path = require("node:path");
fs.readFileSync(path.join(__dirname, "notes.txt"), "utf8");
```

---

## 2. Reading from Files
Use `readFileSync` for the whole file, or split into lines.

```js
const content = fs.readFileSync("notes.txt", "utf8");
console.log(content);
```

Read line by line:

```js
const lines = fs.readFileSync("notes.txt", "utf8").split("\n");
for (const line of lines) {
  console.log(line.trim());
}
```

---

## 3. Writing to Files
Write text with `writeFileSync`, or `appendFileSync` to add to the end.

```js
fs.writeFileSync("output.txt", "Hello, file world!\n");
```

Append instead of overwrite:

```js
fs.appendFileSync("output.txt", "More text\n");
```

---

## 4. File System Helpers
The `fs` module (plus `path` and `os`) helps inspect files and folders.

```js
const fs = require("node:fs");
console.log(fs.existsSync("notes.txt"));
console.log(fs.statSync("notes.txt").isFile());
console.log(fs.statSync("data").isDirectory());
```

Create a folder (including missing parents, like `exist_ok=True`):

```js
fs.mkdirSync("data", { recursive: true });
```

Delete a file:

```js
fs.unlinkSync("old.txt");
```

**Callout**: Node has no `os.path` — the `path` module (`path.join`, `path.resolve`, `path.extname`) is its equivalent. The `os` module is different: it gives OS-level info like `os.homedir()` and `os.platform()`.

---

## 5. Practical Notes
- With `*Sync` functions you don't need to close anything — each call opens and closes the file itself.
- Use `'w'` carefully: it erases existing content.
- Convert input strings to the right type before writing if needed.

---

## 🧠 Try It Yourself
1. Create or overwrite a file named `log.txt` and write two lines of text.
2. Read the file back and print each line.
3. Check whether `log.txt` exists using `fs.existsSync()`.
