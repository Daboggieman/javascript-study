# Guessing Game Helper

Write a function named `evaluateGuess(secret, guess)` that compares a guessed number to a secret number.

## Requirements
- Return `"too low"` if the guess is smaller than the secret.
- Return `"too high"` if the guess is larger than the secret.
- Return `"correct"` if both values are equal.

## Example
```js
evaluateGuess(42, 20); // "too low"
evaluateGuess(42, 70); // "too high"
evaluateGuess(42, 42); // "correct"
```
