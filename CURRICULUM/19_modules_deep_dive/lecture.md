# 19: Modules Deep Dive

Lesson 16 introduced `require()` at a basic level. This lesson goes deeper: how modules actually work, what `require.main === module` really means, and how Node finds the modules you require.

---

## 1. Every `.js` File Is a Module

Any JavaScript file can be required by another. If you have `mathutils.js`:

```js
// mathutils.js
function square(x) {
  return x * x;
}

const PI = 3.14159;

module.exports = { square, PI };
```

```js
// main.js
const mathutils = require("./mathutils");
console.log(mathutils.square(5));    // 25
console.log(mathutils.PI);           // 3.14159
```

Require styles:
```js
const mathutils = require("./mathutils");        // access via mathutils.square(...)
const { square } = require("./mathutils");        // access via square(...) directly
const { square: sq } = require("./mathutils");    // rename on import
const mu = require("./mathutils");                // (rename by naming the variable -- trivial in JS)
```

**Callout**: Python's `from mathutils import *` has no analog — CommonJS only exposes what the file attaches to `module.exports`, so JS modules are *explicit by design*. Whatever you don't export stays private.

---

## 2. `require.main === module` — The Most Important Idiom in This Lesson

Every module has a built-in `module` object. When a file is **run directly**, Node sets `require.main` to that same module. When a file is **required** by another file, `require.main` points to the *entry* file instead.

```js
// mathutils.js
function square(x) {
  return x * x;
}

console.log(`mathutils module loaded, module.id is ${module.id}`);

if (require.main === module) {
  console.log("Running mathutils.js directly!");
  console.log(square(4));
}

module.exports = { square };
```

Run `node mathutils.js` directly → prints both lines (both the load message and the "Running directly" block).
Run `require("./mathutils")` from another file → only prints the load message; the `if` block is skipped.

**Why this matters:** it lets a file be both a reusable module AND a standalone script with its own test/demo code, without that demo code running every single time someone requires it elsewhere. This is the exact analog of Python's `if __name__ == "__main__":`.

---

## 3. Packages: Folders of Modules

A **package** is a folder with an `index.js` file (the analog of `__init__.py`) plus one or more modules:

```
mypackage/
    index.js
    shapes.js
    colors.js
```

```js
const shapes = require("./mypackage/shapes");    // or just require("./mypackage")
const { RED } = require("./mypackage/colors");
```

When you require a *folder*, Node automatically looks for `index.js` inside it. That makes `index.js` a natural place to control what's exposed, e.g.:

```js
// mypackage/index.js
module.exports = { ...require("./shapes") };    // so `require("./mypackage").Circle` works directly
```

---

## 4. Where Node Looks for Modules: The Resolution Algorithm

```js
console.log(module.paths);   // the list of directories Node searches, in order, when you require
```

Node checks (roughly, in order): is it a **core module** (`fs`, `path`, ...)? If not, does the path start with `./`, `../`, or `/` (a file of your own)? Otherwise it walks up the directory tree looking in each `node_modules/` folder (installed packages, the analog of Python's site-packages), also honoring the `NODE_PATH` environment variable. If `require("foo")` fails with `Error: Cannot find module 'foo'`, it usually means `foo` isn't in any of these locations — this is very often a `node_modules`/`package.json` issue (see Lesson 13!).

**Callout**: A classic gotcha — `require("mathutils")` (no `./`) does *not* mean "a file next to this one". Without `./` Node only looks for core modules and packages in `node_modules`.

---

## 5. Relative vs Absolute Paths

```js
// Relative require -- relative to the current module's file (generally preferred)
const { Circle } = require("./shapes");          // same directory
const thing = require("../otherpackage/thing");  // one directory up

// Absolute require -- built with path.join and __dirname
const path = require("node:path");
const { Circle: C2 } = require(path.join(__dirname, "shapes"));
```

The `.js` extension is optional: `require("./shapes")` and `require("./shapes.js")` both work.

---

## 6. Controlling What Gets Exported (the `__all__` analog)

Python uses `__all__` to control `import *`. CommonJS has no `import *` — exposure is controlled entirely by what you attach to `module.exports`:

```js
// mymodule.js
module.exports = { publicFunction };  // only this name is exported by require("./mymodule")

function publicFunction() {}

function _privateHelper() {}          // a leading underscore also signals "internal use"
// (classes can go further: a #field or #method is truly private to the class)
```

---

## 📚 Resources

- **Node docs:** [Modules: CommonJS](https://nodejs.org/api/modules.html)
- **MDN:** [JavaScript modules — introduction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- **Node docs:** [Modules resolution algorithm](https://nodejs.org/api/modules.html#all-together)

---

## 🧠 Try It Yourself

1. Create two files, `mathutils.js` (with a function and a demo `if (require.main === module)` block) and `main.js` that requires and uses it. Run both files directly and confirm the demo block only runs for `mathutils.js`.
2. Print `module.paths` on your machine and identify at least 2 directories in the list.
3. Create a small package folder with an `index.js` and two modules, then require something from it both via `require("./package/module")` and by re-exporting a name through `index.js`.
4. Change what one of your modules attaches to `module.exports` and test what `require("./mymodule")` exposes with each shape.
