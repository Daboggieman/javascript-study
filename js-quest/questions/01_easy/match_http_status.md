### DONE

# Match Http Status

Source: match_http_status

Files to submit
- solution.js

Allowed functions
- --allow-builtin

Instructions
Using a `switch` statement (not if/else), write a function that returns a short description for common HTTP status codes: 200 -> "OK", 201 -> "Created", 404 -> "Not Found", 500 -> "Server Error", anything else -> "Unknown".

Expected function
```js
function describeStatus(code) {}
```


Here is a possible program to test your function :
```js
console.log(describeStatus(200));
console.log(describeStatus(404));
console.log(describeStatus(999));
```

And its output :
```text
OK
Not Found
Unknown
```
