# Radix Sort Strings Fixed Length

Source: radix_sort_strings_fixed_length

Files to submit
- solution.js

Allowed functions
- --allow-builtin

Instructions
Adapt radix sort to sort an array of strings that are all the SAME fixed length (e.g. product codes like "B12", "A99"), sorting character-position by character-position from the rightmost character to the leftmost, using a stable counting sort keyed on character ordinal value (`charCodeAt`) at each position.

Expected function
```js
function radixSortStrings(words) {}
```


Here is a possible program to test your function :
```js
console.log(radixSortStrings(["dda", "aac", "bcb", "aad"]));
```

And its output :
```text
[ 'aac', 'aad', 'bcb', 'dda' ]
```
