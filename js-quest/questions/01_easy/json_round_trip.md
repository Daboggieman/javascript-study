### DONE

# Json Round Trip

Source: json_round_trip

Files to submit
- solution.js

Allowed functions
- --allow-builtin

Instructions
Write a function that converts a JavaScript object to a JSON string (using `JSON.stringify`) and back to a JavaScript object (using `JSON.parse`), and returns the final round-tripped object.

Expected function
```js
function roundTrip(data) {}
```


Here is a possible program to test your function :
```js
const data = { name: "Ada", tags: ["dev", "admin"], active: true };
console.log(roundTrip(data));
```

And its output :
```text
{ name: 'Ada', tags: [ 'dev', 'admin' ], active: true }
```
