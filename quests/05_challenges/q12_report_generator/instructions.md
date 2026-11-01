# Report Generator

Write a function named `buildReport(records)` that turns an array of records into a summary report.

## Requirements
- Each record is an object with at least `"name"` and `"score"` keys.
- Return an object with:
  - `"total"`: the sum of all scores
  - `"average"`: the average score
  - `"topStudent"`: the name with the highest score

## Example
```js
buildReport([
  { name: "Ana", score: 90 },
  { name: "Ben", score: 85 },
]);
// -> { total: 175, average: 87.5, topStudent: "Ana" }
```
