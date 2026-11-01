# Modules Dynamic Import

Source: modules_dynamic_import

Files to submit
- solution.js

Allowed functions
- --allow-builtin

Instructions
Using CommonJS `require` dynamically (called with a name string instead of a literal), write a function that imports a Node built-in module by name (given as a string) and returns the value of a named property from it. Return `null` if the module or property doesn't exist.

Expected function
```js
function getModuleAttribute(moduleName, attributeName) {}
```


Here is a possible program to test your function :
```js
console.log(getModuleAttribute("path", "sep"));
console.log(getModuleAttribute("path", "does_not_exist"));
console.log(getModuleAttribute("not_a_real_module", "sep"));
```

And its output :
```text
/
null
null
```
