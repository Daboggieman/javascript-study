# File Organizer

Write a function named `organizeFiles(paths)` that groups file paths by their extension.

## Requirements
- Input is an array of strings representing file paths.
- Return an object where each key is an extension and each value is an array of matching file paths.
- If a file has no extension, group it under `"no_extension"`.

## Example
```js
organizeFiles(["notes.txt", "image.png", "README", "data.txt"]);
// -> { txt: ["notes.txt", "data.txt"], png: ["image.png"], no_extension: ["README"] }
```
