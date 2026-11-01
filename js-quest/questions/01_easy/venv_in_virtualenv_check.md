# Venv In Virtualenv Check

Source: venv_in_virtualenv_check

Files to submit
- solution.js

Allowed functions
- --allow-builtin

Instructions
Write a function that returns true if the current Node.js process appears to be running inside a project-local environment, false otherwise. Hint: compare `process.execPath` to the global install location — they differ when a project-local `node_modules` runtime is active, so check whether `process.execPath` contains "node_modules".

Expected function
```js
function inVirtualEnv() {}
```


Here is a possible program to test your function :
```js
console.log(typeof inVirtualEnv() === "boolean");
```

And its output :
```text
true
```
