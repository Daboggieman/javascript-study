# Match Command Parser

Source: match_command_parser

Files to submit
- solution.js

Allowed functions
- --allow-builtin

Instructions
Using a `switch` statement (JS has no `match`/pattern matching — switch on the command's first element and inspect the rest), write a function that interprets simple text-adventure commands given as arrays of strings: `["go", direction]` -> `` `Moving ${direction}` ``, `["take", item]` -> `` `Taking ${item}` ``, `["look"]` -> `"Looking around"`, anything else -> `"I don't understand"`.

Expected function
```js
function handleCommand(command) {}
```


Here is a possible program to test your function :
```js
console.log(handleCommand(["go", "north"]));
console.log(handleCommand(["take", "sword"]));
console.log(handleCommand(["look"]));
console.log(handleCommand(["dance"]));
```

And its output :
```text
Moving north
Taking sword
Looking around
I don't understand
```
