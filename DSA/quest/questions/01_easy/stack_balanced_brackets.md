# Stack Balanced Brackets

Source: stack_balanced_brackets

Files to submit
- solution.js

Allowed functions
- --allow-builtin

Instructions
Write a function that uses a stack (a plain array used as a stack -- only `push()` and `pop()`) to check whether the brackets `()`, `[]`, `{}` in a string are balanced and correctly nested.

Expected function
```js
function isBalanced(expression) {}
```


Here is a possible program to test your function :
```js
console.log(isBalanced("{[()()]}"));
console.log(isBalanced("{[(])}"));
console.log(isBalanced("((("));
```

And its output :
```text
true
false
false
```
