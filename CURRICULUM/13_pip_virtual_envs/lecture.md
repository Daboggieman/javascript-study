# Lecture 13: npm & Dependencies

When building Node.js applications, you will often need to use third-party packages that are not part of the built-in modules. To manage these libraries, we use **npm** (Node Package Manager) and **`package.json`**.

---

## 1. Third-Party Packages and the npm Registry
The **npm registry** (npmjs.com) is a repository of software for the JavaScript ecosystem. Developers publish libraries here, and you can download them using **npm** (Node's package installer).

---

## 2. Why Per-Project Dependencies?
npm isolates dependencies **per project automatically** — the analog of Python's virtual environments, but with no activation step.

### The Problem:
If you install all packages globally, different projects might require different versions of the same package (e.g., Project A needs Express 4, Project B needs Express 5). This leads to dependency conflicts.

### The Solution:
Each project keeps its dependencies in a local `node_modules/` folder, recorded in a `package.json` file. Two projects can use different versions of the same package side by side.

**Callout**: Python needs you to create and *activate* a virtual environment. JavaScript does not: `npm install` always installs into the current project's `node_modules`, and `require()` always resolves from there. (You may still see `npx <package>` for running a package's command-line tool without installing it globally.)

---

## 3. Starting a Project

### Creating `package.json`
Run this command in your project directory:
```bash
npm init
```
This asks you a few questions and creates a `package.json` — the project manifest listing its name, version, and dependencies. Use `npm init -y` to accept all defaults.

A minimal `package.json` looks like:
```json
{
  "name": "my-project",
  "version": "1.0.0",
  "dependencies": {}
}
```

---

## 4. Using npm to Manage Packages

With your `package.json` in place, you can install packages:

```bash
# Install a package (adds it to package.json automatically)
npm install axios

# Install a specific version
npm install axios@1.6.0

# Update a package (or all packages) to the latest allowed version
npm update axios

# Uninstall a package
npm uninstall axios
```

Each install downloads the package into `node_modules/` and records the version in `package.json`. The exact dependency tree (including sub-dependencies) is pinned in **`package-lock.json`** — commit that file so everyone gets identical versions.

---

## 5. Sharing Dependencies (the requirements.txt analog)
To share projects, you document the dependencies — npm does this for you in `package.json` and `package-lock.json`.

```bash
# Install dependencies from package.json (e.g., after cloning a project)
npm install

# Install dependencies *exactly* as pinned in package-lock.json (for CI/production)
npm ci

# List installed packages and versions (the analog of pip freeze)
npm ls
```

---

## 🧠 Try It Yourself
1. Create a new folder and run `npm init -y` inside it. Open `package.json` and inspect it.
2. Install the `axios` library and check its entry in `package.json` and `node_modules/axios/package.json`.
3. Run `npm ls` to see the installed dependency tree.
