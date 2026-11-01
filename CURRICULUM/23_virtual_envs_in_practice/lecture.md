# 23: npm in Practice

Lesson 13 introduced npm at a basic level (init a project, install packages). This lesson focuses on the *practical, day-to-day* workflow: managing dependencies with `package.json` and `package-lock.json`, avoiding common mistakes, and understanding what `node_modules` is actually doing.

---

## 1. Quick Recap: Projects and Dependencies

```bash
npm init -y                    # create a package.json in the current folder (the "project" marker)

npm install axios              # install a package into node_modules/ and record it in package.json

npm install                    # reinstall everything listed in package.json (e.g. after cloning)
```

There is no activate/deactivate step in JavaScript: any `node` process run inside a project folder resolves `require()` calls against that project's `node_modules/` automatically. Your terminal prompt won't change — the project folder itself *is* the isolated environment.

---

## 2. Why Isolation Actually Matters (a Concrete Scenario)

Imagine two projects on your machine:
- **Project A** needs `axios@0.25.0` (an older version, for compatibility reasons)
- **Project B** needs `axios@1.6.0` (the latest, for a security fix)

Without per-project dependencies, installing one version globally breaks the other project. Each project gets its **own** `node_modules/` folder with its **own** installed packages, completely isolated from every other project and from any global installs.

```bash
cd project-a && npm init -y && npm install axios@0.25.0
cd ../project-b && npm init -y && npm install axios@1.6.0
# both installations coexist peacefully, because they live in separate node_modules folders
```

---

## 3. `package-lock.json` — Recording and Restoring Dependencies

Once you've installed the packages your project needs, npm "freezes" the exact versions for you:

```bash
npm install axios
```

This updates two files. `package.json` records the *allowed* range:
```json
"dependencies": { "axios": "^1.6.0" }
```
and **`package-lock.json`** records the *exact* resolved tree, including all sub-dependencies:
```json
"node_modules/axios": { "version": "1.6.2", ... }
```

Anyone else (including future you, on a new machine) can recreate the exact same environment with one command:

```bash
npm ci        # install *exactly* what package-lock.json pins (clean, deterministic)
# or: npm install (honours package.json ranges, may pick newer patch versions)
```

**This is why `package.json` and `package-lock.json` belong in version control, but `node_modules/` itself should NOT** — the node_modules folder can be huge, is platform-specific (native binaries), and is trivially regenerated from the lockfile. Add this to your `.gitignore`:

```
node_modules/
npm-debug.log*
```

---

## 4. Checking What's Installed

```bash
npm ls                        # everything installed in the CURRENT project
npm ls --all                  # the full dependency tree, including sub-dependencies
npm view axios version        # the latest version published to the registry
which node                    # (macOS/Linux) confirms which Node binary is active
where node                    # (Windows) same idea
```

If `require()` fails with `Error: Cannot find module 'axios'` for something you're sure you installed, the most common cause is **running `node` from a different directory** — module resolution walks up *from the script's folder*, not from wherever your terminal happens to be.

---

## 5. A Common Gotcha: Forgetting `npm install` After Cloning

`node_modules/` is never in version control. If you clone a project and immediately run it, you get `Cannot find module 'express'` — the fix is always `npm install` first. Related traps:

- Packages installed with `npm install -g <pkg>` are **global**: their CLI tools work everywhere, but they are *not* `require()`-able from your projects. Keep project dependencies local.
- Use `npx <tool>` to run a package's command-line tool (e.g. `npx create-react-app`) without installing it anywhere permanently.

---

## 6. Alternative Tools (What Else Is Out There)

| Tool | What it adds over plain `npm` |
|---|---|
| `npm` (bundled with Node.js) | Nothing extra — the baseline, always available |
| `yarn` | A faster, historically feature-rich alternative with its own lockfile format |
| `pnpm` | Strict, fast, and disk-efficient — one shared content-addressable store for all projects |
| `bun` | A combined runtime + package manager, much faster installs (a Node replacement, not just a tool) |

For most learning projects, the bundled `npm` + `package-lock.json` combo (what this lesson focuses on) is entirely sufficient, and it's the one workflow guaranteed to exist on any machine with Node.js installed.

---

## 📚 Resources

- **npm docs:** [npm install](https://docs.npmjs.com/cli/v10/commands/npm-install)
- **npm docs:** [package-lock.json — description](https://docs.npmjs.com/cli/v10/configuring-npm/package-lock-json)
- **Node docs:** [Modules: node_modules resolution](https://nodejs.org/api/modules.html#loading-from-node_modules-folders)

---

## 🧠 Try It Yourself

1. Create a new project folder, run `npm init -y`, and install any one package (e.g. `axios`). Open `package.json` and `package-lock.json` and look at the recorded versions.
2. Delete the `node_modules` folder entirely, then recreate it from scratch using only the lockfile with `npm ci` — confirm everything still works.
3. Create a `.gitignore` file that excludes `node_modules/` and `npm-debug.log*`.
4. Delete `node_modules` and run your script *before* reinstalling — observe the `Cannot find module` error and explain in a comment why it happens.
