# Advancedsort Word Arr

Source: advancedsort_word_arr

Files to submit
- solution.js

Allowed functions
- --allow-builtin

Instructions
Write a function that sorts a list of strings using a custom comparison function.

Expected function
```js
function advancedSortWordArr() {}
```


Here is a possible program to test your function :
```js
const words = ["banana", "apple", "cherry"];
console.log(advancedSortWordArr(words, (a, b) => (a > b) - (a < b)));
```

And its output :
```text
[ 'apple', 'banana', 'cherry' ]
```
