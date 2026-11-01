# Hash Group Anagrams

Source: hash_group_anagrams

Files to submit
- solution.js

Allowed functions
- --allow-builtin

Instructions
Write a function that groups an array of strings into anagram groups, using a `Map` keyed by each word's sorted-letters signature (e.g. "eat" and "tea" both map to the key "aet"). Return an array of arrays; the order of groups and order within groups should follow the first-seen order of the input.

Expected function
```js
function groupAnagrams(words) {}
```


Here is a possible program to test your function :
```js
console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
```

And its output :
```text
[ [ 'eat', 'tea', 'ate' ], [ 'tan', 'nat' ], [ 'bat' ] ]
```
