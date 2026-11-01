# Json Safe Parse

Source: json_safe_parse

Files to submit
- solution.js

Allowed functions
- --allow-builtin

Instructions
Write a function that attempts to parse a JSON string with `JSON.parse`, catching the `SyntaxError` and returning the string `"INVALID JSON"` instead of crashing if parsing fails. (JS parses JSON with the global `JSON` object — no require needed.)

Expected function
```js
function safeParse(jsonString) {}
```


Here is a possible program to test your function :
```js
console.log(safeParse('{"valid": true}'));
console.log(safeParse('{not valid json}'));
```

And its output :
```text
{ valid: true }
INVALID JSON
```
