# Modules Sys Path Check

Source: modules_sys_path_check

Files to submit
- solution.js

Allowed functions
- --allow-builtin

Instructions
Write a function that checks whether a given directory string is present anywhere in Node's module search paths (`module.paths`).

Expected function
```js
function isInModulePaths(directory) {}
```


Here is a possible program to test your function :
```js
module.paths.push("/some/custom/dir");
console.log(isInModulePaths("/some/custom/dir"));
console.log(isInModulePaths("/not/added"));
```

And its output :
```text
true
false
```
