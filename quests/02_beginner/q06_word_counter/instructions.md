# Word Counter

Write a function named `countWords(text)` that counts how many times each word appears in a string.

## Requirements
- Ignore punctuation such as `. , ! ? : ;`.
- Treat uppercase and lowercase as the same.
- Return an object where the keys are lowercase words and the values are counts.

## Example
```js
countWords("JavaScript is fun, fun for everyone!");
// -> { "javascript": 1, "is": 1, "fun": 2, "for": 1, "everyone": 1 }
```

## Hint
Split the text into words, clean each word, and update an object.
