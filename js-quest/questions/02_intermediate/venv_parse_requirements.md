# Venv Parse Requirements

Source: venv_parse_requirements

Files to submit
- solution.js

Allowed functions
- --allow-builtin

Instructions
Write a function that parses the `dependencies` section of a `package.json`-style string (one `"package": "version"` pair per line, possibly with blank lines) into an object mapping package name to version string. Keep the version specifier exactly as written (npm uses `^` and `~` where pip used `==`).

Expected function
```js
function parseRequirements(text) {}
```


Here is a possible program to test your function :
```js
const reqs = '"requests": "^2.31.0"\n"numpy": "~1.26.4"\n\n"flask": "3.0.2"\n';
console.log(parseRequirements(reqs));
```

And its output :
```text
{ requests: '^2.31.0', numpy: '~1.26.4', flask: '3.0.2' }
```
